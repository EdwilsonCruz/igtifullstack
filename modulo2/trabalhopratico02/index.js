import { promises as fs } from "fs";
const arrTotal = [];    
const arrNomes = [];    
escreveEstados();
procuraUF("RJ");


async function escreveEstados() {
  
    const cidades = JSON.parse(await fs.readFile("cidades.json"));
    const estados = JSON.parse(await fs.readFile("estados.json"));

    const siglas = await estados.map((estado) => {
      return {
        id: estado.ID,
        sigla: estado.Sigla,
      };
    });
    //await criandoArquivo(siglas);
    //await populandoCidades(cidades, siglas);

    await procuraUFtotal(siglas).then(resposta => {resposta} )    
    await procuraNomes(siglas).then(resposta => {resposta} )    
    //console.log(arrTotal)
   // console.log(arrNomes)
    //console.log('--- Sort ---')
    
    arrTotal.sort((a,b) => {
      return a.tam - b.tam
    });
    //console.log(arrTotal)
    
    //console.log('--- CRESC ---')    
    //console.log(arrTotal[0],arrTotal[1],arrTotal[2],arrTotal[3],arrTotal[4])
    //console.log('--- DESC ---')    
    arrTotal.sort((a,b) => {
      return  b.tam - a.tam
    });

    arrNomes.sort((a,b) => {
      return  b.nome.length - a.nome.length 
    });
     console.log(arrNomes)
     arrNomes.sort((a,b) => {
      return  a.nome.length - b.nome.length 
    });
     console.log(arrNomes)
   // console.log(arrTotal[0],arrTotal[1],arrTotal[2],arrTotal[3],arrTotal[4])
    

}
// -> criando json para cada Estado que contem no arquivo principal Estado.json
async function criandoArquivo(siglas) {
  const jsonEstados = await siglas.forEach((sigla, i) =>
    fs.writeFile(`./json/${sigla.sigla}.json`, ``)
  );
}
// -> escrevendo as cidades em cada Estado de origem, de seu arquivo json
async function populandoCidades(cidadeArr, siglasArr) {
  const cidadeEstados = await siglasArr.forEach((sigla) =>
    fs.appendFile(
      `./json/${sigla.sigla}.json`,
      JSON.stringify(
        cidadeArr.filter((cidade) => {
          return cidade.Estado === sigla.id;
        })
      ),
      (err) => {
        err ? console.log(err) : console.log("sucesso");
      }
    )
  );
}

async function procuraUF(uf) {
  try {
    const resultadoUF = JSON.parse(await fs.readFile(`./json/${uf}.json`));
    const valor = `${uf}:${resultadoUF.length}`;
    console.log(valor);
  } catch (error) {
    console.log(error);
  }
}

async function procuraUFtotal(uf) { 
    for(var i=0;i<uf.length;i++){
      const resultadoUF = JSON.parse(await fs.readFile(`./json/${uf[i].sigla}.json`))   
      const valor = { uf: uf[i].sigla ,tam:resultadoUF.length };
      arrTotal.push(valor);
    }
    return arrTotal;
}

async function procuraNomes(uf) { 
  for(var i=0;i<uf.length;i++){
    const resultadoNome = JSON.parse(await fs.readFile(`./json/${uf[i].sigla}.json`))
    resultadoNome.forEach(result => {
      //const valor = `{ ${uf[i].sigla} - ${result.Nome}}`;
      const valor = { uf:uf[i].sigla , nome:result.Nome};
      arrNomes.push(valor);
    })
   
    //console.log(valor)
  }
  return arrNomes;
}