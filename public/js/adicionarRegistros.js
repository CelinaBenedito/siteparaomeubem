   div_alerta.style.display = 'none';

    function alerta(texto) {
        div_alerta.style.display = ""
        div_alerta.innerHTML =
            `
        ${texto}
        `
    }
    function gerarTipos() {
        select_tipo.innerHTML = "<option value='#'>Escolha um tipo</option>"
        fetch("/registros/gerarTipos", {
            method: "GET"
        }).then(res => {
            res.json().then(json => {
                for (let c = 0; json.length > c; c++) {

                    select_tipo.innerHTML +=
                        `
                            <option value="${json[c].id}">${json[c].titulo}</option>
                        `
                }
            })
        })
    }

    function gerarInstituicao() {
        select_instituicao.innerHTML = "<option value='#'> Escolha uma instituição</option>"
        fetch("/registros/gerarInstituicoes", {
            method: "GET"
        }).then(res => {
            res.json().then(json => {
                for (let c = 0; json.length > c; c++) {
                    select_instituicao.innerHTML +=
                        `
                            <option value="${json[c].id}">${json[c].nome}</option>
                        `
                }
            })
        })
    }

    function registrar() {
        var data = ipt_data.value;
        var valor = Number(ipt_valor.value);
        var titulo = ipt_nome.value;
        var tipo = select_tipo.value;
        var Desc = ipt_desc.value;
        var instituicao = select_instituicao.value

        console.log('Cliquei em registrar')

        if (Desc == "" || Desc == false) {
            Desc = "Nenhuma descrição fornecida"
        }
        if (data == false || data == 0) {
            return alert("Data inválida");
        }
        if (valor <= 0) {
            return alert("Valor inválido");
        }
        if (titulo == "") {
            return alert("Titulo inválido");
        }
        if (tipo == '#') {
            return alert("Escolha um tipo");
        }
        if (instituicao == '#') {
            return alert("Escolha uma instituição");
        }

        setTimeout(alerta(`Registrando...
        <div class="glaceonCorrendoDiv">
    <img class="glaceon correndo" src="/assets/gif/glaceon-correndo-unscreen.gif" alt="">
    </div>
        `), 2000)

        fetch("/registros/registrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                valorServer: valor,
                descServer: Desc,
                tipoServer: tipo,
                tituloServer: titulo,
                dataServer: data,
                instituicaoServer: instituicao
            }),
        }).then((response) => {
            console.log("Resposta:", response);
            if (response.ok) {
                atualizarSaldo(valor, instituicao);
                return setTimeout(() => alerta(
                    `  
                        Registro realizado com sucesso! <br>
                        <a href="registros.html">
                            <button>Ver registros</button>
                        </a>

                        <button onclick='window.location.reload()'>Continuar a registrar</button>
                    `
                ), 3000);

            }
            else {
                alert("Houve um erro ao registrar", response)
            }
        });

    }

    function atualizarSaldo(valor, instituicao) {
        console.log("chamou atualizar saldo")
        fetch(`/registros/atualizarSaldo`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                valorServer: valor,
                instituicaoServer: instituicao
            }),
        }).then((resposta) => {
            console.log("Resposta:", resposta);
            if (resposta.ok) {
                return console.log("Saldo atualizado")
            }
            else {
                console.error("Houver um erro ao atualizar o saldo", resposta)
            }
        });
    }

    function adicioarTipos() {
        var titulo = ipt_tituloTipo.value
        fetch("/registros/adicionarTipo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                tituloServer: titulo
            }),
        }).then(function (resposta) {
            console.log("Resposta: ", resposta);
            if (resposta.ok) {
                gerarTipos();
                adicioarTipo.close();
                return alerta(`Tipo adicionado com sucesso!<br>
                <button onclick="div_alerta.style.display='none'">OK</button>`)
            }
            else {
                return alerta(`Houver um erro ao adicionar tipo`, resposta)
            }
        })
    }

    /*-------------- Calendário --------------*/

const btnAbrir = document.getElementById("calendario");
const modal = document.getElementById("modal");
const fechar = document.getElementById("fechar");
const dias = document.getElementById("dias");
const mesAno = document.getElementById("mesAno");
const gastosDoDia = document.getElementById("gastosDoDia");
const confirmar = document.getElementById("confirmar");

let dataSelecionada = null;

let hoje = new Date();
let mesAtual = hoje.getMonth();  
let anoAtual = hoje.getFullYear();


btnAbrir.onclick = () => modal.style.display = "flex";
fechar.onclick = () => modal.style.display = "none";

function buscarGastosDia(){
    const gastos = {
    "2025-01-05": ["R$ 25,00 - Café", "R$ 80,00 - Mercado"],
    "2025-01-10": ["R$ 14,00 - Transporte"],
};
    return gastos;
}

function gerarCalendario(){
    
}