const Sequelize = require("sequelize");
const connection = require("../Connection");
const table = "perguntas";

const Pergunta = connection.define(table, {
  titulo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descricao: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

Pergunta.sync({ force: false }).then(() => {
  
});

module.exports = Pergunta;