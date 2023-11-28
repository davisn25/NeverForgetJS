const tarefas = document.getElementById("tarefas");
const adicionar = document.getElementById("adicionar");
const input = document.getElementById("input");

if (!localStorage.getItem("lista")) {
    localStorage.setItem("lista", "[]")
}

mostrarLista();

adicionar.addEventListener("submit", (e) => {
    e.preventDefault();
    if(input.value) {
        adicionarTarefa();
        mostrarLista();
    }
})


tarefas.addEventListener("click", (e) => {
    if(e.target.innerHTML == "X") {
        const parsedLista = JSON.parse(localStorage.getItem("lista"));
        parsedLista.splice(e.target.parentElement.id - 1, 1);
        localStorage.setItem("lista", JSON.stringify(parsedLista));
        mostrarLista();
    }
})

function adicionarTarefa() {
    const parsedLista = JSON.parse(localStorage.getItem("lista"));
    parsedLista.push(input.value);
    localStorage.setItem("lista", JSON.stringify(parsedLista));
}

function mostrarLista() {
    if(!JSON.parse(localStorage.getItem("lista")).length) {
        tarefas.innerHTML = "Não há elementos"
    } else {
        tarefas.innerHTML = ""
        let index = 1;
        JSON.parse(localStorage.getItem("lista")).forEach(e => {
            const tarefa = document.createElement("li");
            tarefa.innerHTML = `<span class="material-symbols-outlined">done</span><div>${e}</div><div class="editar-excluir"><img src="./img/edit.png" alt="edit" class="editar"><div class="excluir-btn">X</div></div>`;
            tarefa.id = index;
            tarefa.className = "tarefa";
            tarefas.appendChild(tarefa);
            index++;
        });
    }
}

const comecar = document.getElementById("comecar");
const cronometro = document.getElementById("cronometro");
let minuto = 25;
let segundo = 0; 
cronometro.textContent = minuto + ":" + segundo; 

let cond = false

function time() {
    segundo = segundo - 1;
    if(segundo < 0) {
        segundo = 59
        minuto = minuto - 1;
    }
    cronometro.textContent =  minuto + ":" + segundo; 
}

comecar.addEventListener('click', () => {
    cond = !cond;
    if (cond) {
        comecar.innerHTML = "Parar"
    } else {
        comecar.innerHTML = "Começar"
    }
    if(cond) {
        tempo = setInterval(time, 1000);
    } else {
        clearInterval(tempo);
    }
});