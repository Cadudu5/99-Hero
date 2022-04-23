// config inicial 

const express = require("express");
const mongoose = require("mongoose");
const app = express();



// leitor de json 
app.use(
    express.urlencoded({
        extended: true
    }),
)
app.use(express.json())


//rotas da api
const userRouts = require("./controllers/authControllers")

app.use("/heroes", userRouts)

// rota teste 
app.get("/", (req, res) => {
    res.json("Deu certo!");
})

// mongodb+srv://xbx5ZLgMapv8sFwS:xbx5ZLgMapv8sFwS@cluster0.wirna.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose
.connect( "mongodb+srv://xbx5ZLgMapv8sFwS:xbx5ZLgMapv8sFwS@cluster0.wirna.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
)
    .then(() => {
        console.log("Conectamos ao MongoDB")
        app.listen(3000);
    })
    .catch((err) => console.log(err))



