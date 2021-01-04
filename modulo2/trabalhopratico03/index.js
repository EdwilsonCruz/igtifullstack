import express from "express";
import routerAluno from "./controleAluno.js";
import { promises as fs } from "fs";

const { readFile, writeFile } = fs;
const app = express();

app.use(express.json());
app.use("/grades", routerAluno);

app.get("/", (req, res) => {
  res.send("teste");
});

app.listen(3000, async () => {
  await readFile("./JSON/grades.json")
    .then(() => {
      console.log("API online");
    })
    .catch((err) => {
      const initAlunos = {
        nextId: 1,
        grades: [],
      };
      writeFile("./JSON/grades.json", JSON.stringify(initAlunos))
        .then(() => {
          console.log("API online e Arquivo criado");
        })
        .catch((err) => {
          console.log(err);
        });
    });
});
