const express = require("express");
const transactionRouter = express.Router();
const TransactionModel = require("../models/TransactionModel.js");
const TransactionService = require("../services/transactionService");

//delete transaction
transactionRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    //TransactionService.ObjectId = id;
    const removeAccount = await TransactionModel.findOneAndDelete({
      _id: id,
    });

    !removeAccount
      ? res.status(404).send("Item não encontrado")
      : res.status(200).send({ msg: "Item removido com sucesso!" });
  } catch (err) {
    res.status(500).send({ Error: err });
  }
});
//List all transactions
transactionRouter.get("/all", async (req, res) => {
  try {
    const alldata = await TransactionModel.find({});
    res.send(alldata);
  } catch (error) {
    res.status(500).send({ Error: "Não foi possivel fazer a consulta." });
  }
});

transactionRouter.get("/", async (req, res) => {
  const period = req.query.period;

  if (!period) {
    return res.status(404).send({
      error:
        'É necessário informar o parâmetro "period",cujo valor deve estar no formato yyyy-mm. Exemplo.: url?period=2020-11',
    });
  } else if (period.length <= 6 || period.length > 7) {
    return res.status(404).send({
      error:
        'É necessário informar o parâmetro "period",cujo valor deve estar no formato yyyy-mm. Exemplo.: url?period=2020-11',
    });
  }

  try {
    const transaction = await TransactionModel.find({ yearMonth: period });
    const filterReceita = transaction
      .filter((receita) => {
        return receita.type === "+";
      })
      .reduce((acc, curr) => acc + curr.value, 0);
     const filterDespesa = transaction
      .filter((receita) => {
        return receita.type === "-";
      })
      .reduce((acc, curr) => acc + curr.value, 0);
    const resultado = filterReceita - filterDespesa;
    // const teste1 = transaction
    //   .filter((teste) => {
    //     return teste.description.indexOf("pra") !== -1;
    //   })
      //.reduce((acc, curr) => acc + curr.value, 0);

    
    res.send(`Receita: ${filterReceita} , Despesa: ${filterDespesa} Resultado: ${resultado}`);
    //res.send(teste1.toString());
  } catch (error) {
    res.sendStatus(500).send({ Error: error.message });
  }
});

//create
transactionRouter.post("/", async (req, res) => {
  try {
    const transaction = new TransactionModel(req.body);
    await transaction.save();
    res.send(transaction);
  } catch (error) {
    res.status(500).send({ Error: error.message });
  }
});
//Update
transactionRouter.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    //const transaction = await TransactionModel.updateMany(
    const transaction = await TransactionModel.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );
    res.send(transaction);
  } catch (error) {
    res.status(500).send({ Error: error.message });
  }
});

module.exports = transactionRouter;
