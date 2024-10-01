import express from 'express';
import router from "./router.js";



const app = express();

const PORT = 11000;

app.use(express.json());

app.use('/api', [router]);

app.listen(PORT, () => {
    console.log(PORT, `포트로 서버가 열렸어요`);
})

