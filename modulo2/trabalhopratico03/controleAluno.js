import { throws } from "assert";
import express from "express";
import { promises as fs } from "fs";
const router = express.Router();

const { readFile, writeFile } = fs;

router.post("/", async (req, res) => {
  try {
    let aluno = req.body;
    const data = JSON.parse(await readFile("./json/grades.json"));
    aluno = { id: data.nextId++, ...aluno, timestamp: new Date() };
    console.log(aluno);

    data.grades.push(aluno);
    await writeFile("./json/grades.json", JSON.stringify(data));
    res.send(aluno);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get("/alunos", async (req, res) => {
  try {
    const data = JSON.parse(await readFile("./json/grades.json"));
    res.send(data.grades);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get("/aluno/:id", async (req, res) => {
  try {
    console.log("ID:", req.params.id);
    const data = JSON.parse(await readFile("./json/grades.json"));

    const alunoId = data.grades.filter((aluno) => {
      return aluno.id == req.params.id;
    });

    res.send(alunoId);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get("/total", async (req, res) => {
  try {
    let aluno = req.body;
    const data = JSON.parse(await readFile("./json/grades.json"));
    const total = data.grades
      .filter((grade) => {
        return grade.student == aluno.student && grade.subject == aluno.subject;
      })
      .reduce((acc, curr) => acc + curr.value, 0);

    res.send(JSON.stringify(total));
  } catch (error) {
    res
      .status(400)
      .send({ error: "Não foi possivel RETORNAR a soma dos dados!" });
  }
});

router.get("/media", async (req, res) => {
  try {
    let aluno = req.body;
    const data = JSON.parse(await readFile("./json/grades.json"));
    const total = data.grades
      .filter((grade) => {
        return grade.subject == aluno.subject && grade.type == aluno.type;
      })

    const media = total.reduce((acc, curr) => acc + curr.value , 0) / total.length;
    console.log(media); 
      res.send(JSON.stringify(media));
  } catch (error) {
    res
      .status(400)
      .send({ error: "Não foi possivel RETORNAR a media dos dados!" });
  }
});
router.get("/top3", async (req, res) => {
  try {
    let aluno = req.body;
    const data = JSON.parse(await readFile("./json/grades.json"));
    const total = data.grades
      .filter((grade) => {
        return grade.subject == aluno.subject && grade.type == aluno.type;
      }).sort((a,b) => b.value - a.value)

    //const media = total.reduce((acc, curr) => acc + curr.value , 0) / total.length;
      
      res.send(JSON.stringify(total.slice(0,3)));
  } catch (error) {
    res
      .status(400)
      .send({ error: "Não foi possivel RETORNAR a media dos dados!" });
  }
});

router.put("/", async (req, res) => {
  try {
    let aluno = req.body;
    const data = JSON.parse(await readFile("./json/grades.json"));
    const index = data.grades.findIndex((a) => a.id == aluno.id);

    aluno = { ...aluno, timestamp: new Date() };
    data.grades[index] = aluno;
    console.log(data.grades[index]);

    await writeFile("./json/grades.json", JSON.stringify(data));

    res.send(aluno);
  } catch (error) {
    res.status(400).send({ error: "Usuario nao EXISTE na base de dados!" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = JSON.parse(await readFile("./json/grades.json"));
    data.grades = data.grades.filter((aluno) => {
      return aluno.id != parseInt(req.params.id);
    });

    await writeFile("./json/grades.json", JSON.stringify(data));
    res.end();
  } catch (error) {
    res.status(400).send({ error: "Não foi possivel apagar os dados!" });
  }
});

export default router;
