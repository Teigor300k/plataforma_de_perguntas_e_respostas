const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
const connection = require("./database/Connection");
const ModelPergunta = require("./database/models/Pergunta");
const ModelResposta = require("./database/models/Resposta");

//Database
connection
  .authenticate()
  .then(() => {
    console.log("Conexão feita com sucesso!");
  })
  .catch(error => {
    console.log(error);
  });

// engine com ejs
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Rotas
app.get("/", (req, res) => {
  ModelPergunta.findAll({
    raw:true,order:[
      ['id','DESC']
    ]
  }).then((perguntas) => {
    res.render("index",{
      perguntas:perguntas
    });

  })
  
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;
  ModelPergunta.create({
    titulo:titulo,
    descricao:descricao

  }).then(()=>{

    console.log("Dados recebidos e guardados com sucesso!");
    res.redirect("/");

  }).catch((error)=>{

    console.log(error);

  });
  
});

app.get("/pergunta/:id",(req, res)=>{
  var id = req.params.id;
  ModelPergunta.findOne({
    where:{
      id:id
    }
  }).then((pergunta)=>{
    if(pergunta != undefined){

      ModelResposta.findAll({
        where:{pergunta_id:pergunta.id},order:[
          ['id','DESC'] ]
      }).then((resposta)=>{

        res.render("pergunta",{
          pergunta:pergunta,
          resposta:resposta
        });

      });

      

    }else{
      res.redirect("index");
    }

  })

});


app.post("/responder", (req, res)=>{
  var corpo = req.body.corpo;
  var pergunta_id = req.body.pergunta;
  ModelResposta.create({
    corpo:corpo,
    pergunta_id:pergunta_id

  }).then(()=>{

    console.log("Dados recebidos e guardados com sucesso!");
    res.redirect("/pergunta/"+pergunta_id);

  });

});

app.listen(port, error => {
  if (error) {
    console.log("Aconteceu um erro ao iniciar o servidor!");
  } else {
    console.log(`Servidor rodando na porta ${port}`);
  }
});
