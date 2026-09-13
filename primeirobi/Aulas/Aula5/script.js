const divUm = document.querySelector(".container");

// divUm.firstElementChild.textContent = "Alterado via JS";

divUm.firstElementChild.textContent = "Alter";

//divUm.firstElementChild.style = "color: red";

function ativar(){
    const container = document.querySelectorAll(".container")

    containers.forEach(div => {
        div.firstElementChild.classLis.toggle("ativo")
    })
}