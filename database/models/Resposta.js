const Sequelize = require("sequelize");
const connection = require("../Connection");
const table = "respostas";

const Resposta = connection.define(table, {
  corpo: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  pergunta_id:{
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

Resposta.sync({ force: false }).then(() => {
  
});

module.exports = Resposta;