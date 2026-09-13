
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


function pergunta(texto) {
  return new Promise((resolve) => rl.question(texto, resolve));
}


const conta = {
  nome: "Raquel Novelli",
  agencia: "0001",
  numero: "123456-7",
};


let saldo = 1000;

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function mostrarMenu() {
  console.log("\n===== BANCO DIGITAL =====");
  console.log("1 - Consultar dados da conta");
  console.log("2 - Consultar saldo");
  console.log("3 - Realizar débito");
  console.log("4 - Realizar crédito");
  console.log("0 - Sair");
  console.log("==========================");
}

function consultarDados() {
  console.log("\n--- Dados da Conta ---");
  console.log(`Nome: ${conta.nome}`);
  console.log(`Agência: ${conta.agencia}`);
  console.log(`Número da conta: ${conta.numero}`);
}

function consultarSaldo() {
  console.log(`\nSaldo atual: ${formatarMoeda(saldo)}`);
}

async function realizarDebito() {
  const resposta = await pergunta("\nValor para débito/saque: R$ ");
  const valor = Number(resposta.replace(",", "."));

  if (isNaN(valor) || valor <= 0) {
    console.log("Valor inválido. Digite um número maior que zero.");
    return;
  }

  if (valor > saldo) {
    console.log(
      `Saldo insuficiente. Saldo atual: ${formatarMoeda(saldo)}`
    );
    return;
  }

  saldo -= valor;
  console.log(
    `Débito de ${formatarMoeda(valor)} realizado. Novo saldo: ${formatarMoeda(
      saldo
    )}`
  );
}

async function realizarCredito() {
  const resposta = await pergunta("\nValor para depósito/crédito: R$ ");
  const valor = Number(resposta.replace(",", "."));

  if (isNaN(valor) || valor <= 0) {
    console.log("Valor inválido. Digite um número maior que zero.");
    return;
  }

  saldo += valor;
  console.log(
    `Crédito de ${formatarMoeda(valor)} realizado. Novo saldo: ${formatarMoeda(
      saldo
    )}`
  );
}

async function main() {
  let rodando = true;

  while (rodando) {
    mostrarMenu();
    const opcao = await pergunta("Escolha uma opção: ");

    switch (opcao.trim()) {
      case "1":
        consultarDados();
        break;
      case "2":
        consultarSaldo();
        break;
      case "3":
        await realizarDebito();
        break;
      case "4":
        await realizarCredito();
        break;
      case "0":
        console.log("\nEncerrando o sistema. Até logo!");
        rodando = false;
        break;
      default:
        console.log("\nOpção inválida. Tente novamente.");
    }
  }

  rl.close();
}

main();
