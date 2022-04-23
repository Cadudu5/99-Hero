// controle de rotas // 

const express = require("express");

const User = require("../models/heroes");

const router = express.Router();



// cadastro de heróis
router.post("/", async (req, res) =>{

        const {codeName, realName, disasters, city, teamWork} = req.body

        const hero = {
            codeName,
            realName,
            disasters,
            city,
            teamWork,
        }
    try {
        
        // codinome unico, erro caso tenha mais de um igual
        if( await User.findOne({ codeName })){
            return res.send(400).send({ message: "Hero already registered" })
        }

        // verifica se o local eh coberto pela associacao
        if(city != "New York" && city != "Tokyo" && city != "Rio de Janeiro" && city != null){
            return res.status(400).send({message: "Our services are unavailable for this location :("})
            
        }
        // verifica se a area de atuacao eh coberta pela associacao
        if(disasters != "bank robs" && disasters != "giant monsters" && disasters != "natural disasters" && disasters != null){
            return res.status(400).send({message: "This area is not couvered by our association! :("})
        }

        if(city == null ){
            return res.status(400).send({message: "Location necessary to register!"})
        }

        if(disasters == null ){
            return res.status(400).send({message: "You must be at least in one  of our actuation areas"})
        }

        if(realName == null){
            return res.status(400).send({message: "We need to know your real identity for this job!"})
        }
        // criando o cadastro no banco
        const user = await User.create(hero)
        res.status(201).json({message: "Hero sucesffuly registered!"})

        } catch (error) {
        return res.status(400).send({ error: "Registration failed." })
        
    }

})

//  recuperar todos os dados
router.get("/", async(req, res) =>{

    try {
        
        const heroes = await User.find()

        res.status(200).json(heroes)

    } catch (error) {
        res.status(404).json({error: error})
    }
})

// Query pelo codinome
router.get("/:codiNome", async(req, res) =>{

    const codiNome = req.params.codiNome

    try {
        
        const QueryHero = await User.findOne({codeName: codiNome})

        if(QueryHero.matchedCount === 0){
            res.status(422).json({message: "Hero not found!"})
            return
        }

        res.status(200).json(QueryHero)

    } catch (error) {
        res.status(400).json({error: error})
    }
})

// Query pelo tipo de desastre

router.get("/disasters/:Disaster", async(req, res) =>{

    const Disaster = req.params.Disaster

    try {
        
        const QueryDis = await User.find({disasters: Disaster})

        if(QueryDis.matchedCount === 0){
            res.status(422).json({message: "Disaster not found!"})
            return
        }

            res.status(200).json(QueryDis)

    } catch (error) {
            res.status(400).json({error: error})
    }
})

// Query pela area de atuacao

router.get("/cities/:Cities", async(req, res) =>{

    const Cities = req.params.Cities

    try {
        
        const QueryCit = await User.find({city: Cities})

        if(QueryCit.matchedCount === 0){
            res.status(422).json({message: "Disaster not found!"})
            return
        }

            res.status(200).json(QueryCit)

    } catch (error) {
            res.status(400).json({error: error})
    }
})

// atualizacao dos dados

router.put("/:id", async(req, res) =>{

    const id = req.params.id

    const {codeName, realName, disasters, city, teamWork} = req.body

    const hero = {
        codeName,
        realName,
        disasters,
        city,
        teamWork,
    }

    try {

        const updatedHero = await User.updateOne({_id: id}, hero)

        // verifica se o heroi esta cadastrado
        if(updatedHero.matchedCount === 0){
            res.status(422).json({message: "Hero not found!"})
            return
        }

        res.status(200).json(hero)
        
    } catch (error) {
        res.status(404).json({error: error})
    }
})

// deletar dados

router.delete("/:id", async(req, res) =>{

    const id = req.params.id

    const hero = await User.findOne({_id: id})

    if(!hero){
        res.status(422).json({message: "Hero not found!"})
        return
    }

    try {
        await User.deleteOne({_id: id})
        res.status(200).json({message: "Hero sucessfully removed!"})

    } catch (error) {
        res.status(400).json({error: error})
    }

})

module.exports = router