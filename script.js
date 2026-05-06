let historico = [];

const vermelhos = [
  1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36
];

function corNumero(n) {
  if (n === 0) return "zero";
  return vermelhos.includes(n) ? "vermelho" : "preto";
}

// Criar botões
function criarRoleta() {
  const roletaDiv = document.getElementById("roleta");

  for (let i = 0; i <= 36; i++) {
    let btn = document.createElement("button");
    btn.innerText = i;
    btn.className = corNumero(i);
    btn.onclick = () => addNumero(i);
    roletaDiv.appendChild(btn);
  }
}

function addNumero(n) {
  historico.push(n);

  if (historico.length > 100) {
    historico.shift();
  }

  atualizarTela();
}

function ultimos30() {
  return historico.slice(-30);
}

// Camuflado
function somaDigitos(n) {
  if (n < 10) return n;
  return Math.floor(n / 10) + (n % 10);
}

function diferencaDigitos(n) {
  if (n < 10) return 0;
  let a = Math.floor(n / 10);
  let b = n % 10;
  return Math.abs(a - b);
}

// Análise
function atualizarTela() {
  document.getElementById("historico").innerText =
    historico.join(" - ");

  let dados = ultimos30();

  let terminais = {};
  let camuflados = {};

  dados.forEach(n => {
    let t = n % 10;
    terminais[t] = (terminais[t] || 0) + 1;

    let s = somaDigitos(n);
    let d = diferencaDigitos(n);

    camuflados[s] = (camuflados[s] || 0) + 1;
    camuflados[d] = (camuflados[d] || 0) + 1;
  });

  document.getElementById("analise").innerText =
    "Terminais:\n" + JSON.stringify(terminais, null, 2) +
    "\n\nCamuflados:\n" + JSON.stringify(camuflados, null, 2);
}

criarRoleta();
