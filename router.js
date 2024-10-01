import express from 'express';
import Joi from "joi";

const router = express.Router();

const userInfo = [];

const schema = Joi.object({
    id : Joi.string().min(6).max(20).required(),
    password : Joi.string().min(6).max(20).required(),
    name : Joi.string().max(20).required()
})

const duplicate = function (userInfo, id) {
    return userInfo.find(user => user.id === id)
};

router.post('/signup', (req, res) => {
    const  {id, name ,password} = req.body;
    const validation = schema.validate({id, name, password});
    if(validation.error){
        return res.status(404).json({message : validation.error.message});
    }
    const user = duplicate(userInfo, id);
    if(user){
        return res.status(401).json({message : '이미 사용중인 아이디입니다.'});
    }
    userInfo.push({id, name, password});
    return res.status(201).json({message : "회원가입 성공!"});
});

router.post('/signin', (req, res) => {
    const {id, password} = req.body
    const user = duplicate(userInfo, id);
    if(!user){
        return res.status(404).json({message : '존재하지 않는 아이디입니다.'});
    }
    if(user.password !== password){
        return res.status(404).json({message : "비밀번호 불일치!"});
    }
    return res.status(200).json({data: user});
});

router.put('/changeName', (req, res) => {
    const {id, newName, password} = req.body;
    const user = duplicate(userInfo, id);
    if(!user){
        return res.status(404).json({message : '존재하지 않는 아이디입니다.'});
    }
    if(user.password !== password){
        return res.status(404).json({message : "비밀번호 불일치!"});
    }
    user.name = newName;

    return res.status(200).json({data: user});
});

router.delete('/withdraw', (req, res) => {
    const {id, password} = req.body;
    const user = duplicate(userInfo, id);
    if(!user){
        return res.status(404).json({message : '존재하지 않는 아이디입니다.'});
    }
    if(user.password !== password){
        return res.status(404).json({message : "비밀번호 불일치!"});
    }
    const isUserExists = (element) => element === user;
    const index = userInfo.findIndex(isUserExists);
    userInfo.splice(index, 1);
    return res.status(200).json({data: userInfo});
});



export default router;