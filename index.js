const express =require("express")

const  PORT = 5000

const app =express()

app.use(express.json())

app.post('/', (req , res) => {
    console.log(req.body);
    res.status(200).json("Сервер работает УРА1 !!!");
})

app.listen(PORT, () => console.log("Server started on PORT " + PORT ))