function tempo() {
  console.log("Entrei na função tempo")
  valorSelect = document.getElementById('select_tempo').value
  console.log(valorSelect)
  const hoje = new Date();

  if (valorSelect == "ano") {
    gastosMes(hoje.getFullYear())
    buscarGastoTotal(hoje.getFullYear())
  }
  else if (valorSelect == "mes") {
    const hoje = new Date();
    ano = hoje.getFullYear();
    mes = hoje.getMonth() + 1;
    tempoAnalisado = { ano, mes }

    gastosMes(tempoAnalisado);
    buscarGastoTotal(tempoAnalisado);
  }

}

function periodo() {
  console.log("Entrei na função periodo")
  valorSelect = document.getElementById('select_periodo').value
  console.log(valorSelect)

  const hoje = new Date();
  ano = hoje.getFullYear();
  mes = valorSelect;
  tempoAnalisado = { ano, mes }
  gastosMes(tempoAnalisado);
  buscarGastoTotal(tempoAnalisado);

}

function gerarInformações() {

  const hoje = new Date();
  ano = hoje.getFullYear();
  mes = hoje.getMonth() + 1
  tempoAnalisado = { ano, mes }
  console.log("gerando informações para o mês", mes)
  gerarKPIS(tempoAnalisado).then(gerarGraficos(tempoAnalisado))
}
async function gerarKPIS(periodo) {
  console.log("Gerando KPIS para o mês: ", periodo)
  buscarMaiorGasto(periodo);
  buscarGastoTotal(periodo);
}

function gerarGraficos(periodo) {
  console.log("Iniciando geração de gráficos")

  const hoje = new Date();

  gastosMes({
    ano: hoje.getFullYear(),
    mes: hoje.getMonth() + 1
  });
  gerarTipos(periodo);
  percentualTipo(periodo)
  graficoComparacao([10, 20, 356, 13, 121], [50, 90, 246, 113, 1221], ["jan", "fev", "mar", "abr", "mai"]);
}

function buscarMaiorGasto(dataInicial, dataFinal) {
  fetch(`/registros/maiorGasto`)
    .then(res => res.json())
    .then(json => {
      let categoria = document.getElementById('categoria');
      let valorCategoria = document.getElementById('valorCategoria');
      let tituloGasto = document.getElementById('tituloGasto')

      categoria.innerHTML = json[0].tituloGasto;
      valorCategoria.innerHTML = `R$ ${json[0].valor}`
      tituloGasto.innerHTML = `Categoria: ${json[0].tipo}`

    })
}

function buscarGastoTotal(periodo) {
  console.log("Entrei em buscarGastoTotal")
  let url = '';
  let div_titulo = document.getElementById('dataKPIgastoTotal');
  let labelComparacao = "";

  if (typeof periodo === 'number') {
    console.log("Ano identificado")
    url = `/registros/gastoTotalAno/${periodo}`;
    div_titulo.innerHTML = "ano"

    labelComparacao = `${periodo - 1}`;
  }
  else if (typeof periodo === 'object') {
    console.log("Mês identificado")
    url = `/registros/gastoTotalMes/${periodo.ano}/${periodo.mes}`;
    div_titulo.innerHTML = "mês"

    let mesAnterior = periodo.mes - 1;
    let anoAnterior = periodo.ano;

    if (mesAnterior === 0) {
      mesAnterior = 12;
      anoAnterior--;
    }

    labelComparacao = `${nomeMes(mesAnterior)}`;

  }

  console.log("Iniciando fetch...")
  fetch(url)
    .then(res => res.json())
    .then(json => {
      console.log("Dentro do fetch\nJson:", json[0])
      div_gastoTotal = document.getElementById('gastoTotal');
      div_percentual = document.getElementById('percentual');
      div_subtexto = document.getElementById('subtexto');

      div_gastoTotal.innerHTML = `R$ ${json[0].total_atual.toFixed(2)}`
      if (json[0].total_anterior === 0 && json[0].total_atual > 0) {
        console.log("Valor anterior nulo")
        div_percentual.style.display = "none"
        div_subtexto.innerHTML = "variação não aplicável"
      }
      else if (json[0].total_anterior === 0 && json[0].total_atual === 0) {
        console.log("Valor anterior e atual nulo")
        div_percentual.style.display = "none"
        div_subtexto.innerHTML = "variação não aplicável"
      }
      else {

        diferenca = (json[0].total_atual - json[0].total_anterior).toFixed(2);
        diferença_percentual = ((diferenca / json[0].total_anterior) * 100).toFixed(2);
        if (diferença_percentual > 0) {
          div_percentual.style.display = ""
          div_percentual.innerHTML = `<i class='bx  bx-caret-big-up'></i> +${diferença_percentual}`
        }
        else if (diferença_percentual < 0) {
          div_percentual.style.display = ""
          div_percentual
          div_percentual.innerHTML = `<i class='bx  bx-caret-big-down'></i> ${diferença_percentual}`
        }

      }
      div_subtexto.innerHTML = `Em relação a ${typeof periodo === 'object' ? 'mês de ' : 'ano de '} ${labelComparacao}`;
    })
}

function gerarTipos() {
  let dados = [];
  let labels = [];

  fetch("/registros/quantidadeTipo")
    .then(res => res.json())
    .then(json => {

      for (let c = 0; json.length > c; c++) {
        dados.push(json[c].qtd);
        labels.push(json[c].titulo);
      }

      criarGrafico(
        350,
        'bar',
        'Quantidade por Tipo',
        dados,
        labels,
        'graficoTipo'
      );
    });
}

async function gastosMes(param) {
  let url = '';
  let titulo = '';
  let tipoLabel = ''; // 'mes' ou 'dia'

  // 📅 Ano inteiro → meses
  if (typeof param === 'number') {
    url = `/registros/gastosMes/${param}`;
    titulo = 'Gasto por mês';
    tipoLabel = 'mes';
  }
  // 📆 Mês específico → dias
  else if (typeof param === 'object') {
    url = `/registros/gastosDia/${param.ano}/${param.mes}`;
    titulo = 'Gasto por dia';
    tipoLabel = 'dia';
  }

  fetch(url)
    .then(res => res.json())
    .then(json => {
      const dados = [];
      const labels = [];

      json.forEach(item => {
        const valor = Math.round(item.total_gasto * 100) / 100;
        dados.push(valor);

        // Labels para ANO → meses
        if (tipoLabel === 'mes') {
          const nome = new Date(param, item.mes_num - 1)
            .toLocaleString('pt-BR', { month: 'long' });
          labels.push(nome.charAt(0).toUpperCase() + nome.slice(1));
        }

        // Labels para MÊS → dias
        if (tipoLabel === 'dia') {
          const [dia, mes, ano] = item.dia_label.split('/');

          const nomeMes = new Date(ano, mes - 1)
            .toLocaleString('pt-BR', { month: 'short' });

          labels.push(`${dia} de ${nomeMes}`);
        }
      });

      criarGrafico(
        350,
        'line',
        titulo,
        dados,
        labels,
        'graficoTemporal'
      );
    });
}


function percentualTipo(dataInicial, dataFinal) {
  kpiTipo = document.getElementById('percentualKPItipo')
  valorKPI = document.getElementById('valorKPItipo')
  const dados = [];
  const labels = [];

  fetch(`/registros/percentualTipo`)
    .then(res => res.json())
    .then(json => {
      let maiorTipo = json[0]
      for (let c = 0; json.length > c; c++) {
        dados.push(json[c].percentual);
        labels.push(json[c].tipo);
        if (json[c].percentual > maiorTipo.percentual) {
          maiorTipo = json[c];
        }
      }
      kpiTipo.innerHTML = `${maiorTipo.tipo}`;
      valorKPI.innerHTML = `${maiorTipo.percentual}%`

      opcaoDonut = {
        chart: {
          type: 'donut',
          height: 350
        },
        series: dados,
        labels: labels,
        fill: {
          colors: ['#367373', '#5FA8A3', '#9ED2CE', '#7FBCD2', '#A7C7E7']
        },
        plotOptions: {
          pie: {
            customScale: 0.8
          }
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: '100%'
              }
            }
          }
        ]
      }


      var Donut = new ApexCharts(document.querySelector("#graficoDonut"), opcaoDonut)

      Donut.render();


    });

}
const graficos = {};


function criarGrafico(altura, tipo, nome, dados, labels, div) {
  const options = {
    chart: {
      height: altura,
      type: tipo
    },
    fill: {
      colors: ['#367373', '#5FA8A3', '#9ED2CE', '#7FBCD2', '#A7C7E7']
    },
    series: [{
      name: nome,
      data: dados
    }],
    xaxis: {
      categories: labels
    },
    grid: {
      borderColor: 'rgba(54, 115, 115, 0.15)',
      strokeDashArray: 4
    },
  };

  // 🔥 destrói gráfico antigo
  if (graficos[div]) {
    graficos[div].destroy();
  }

  // 🆕 cria e guarda o novo gráfico
  graficos[div] = new ApexCharts(
    document.querySelector(`#${div}`),
    options
  );

  graficos[div].render();
}

function graficoComparacao(periodoAtual, periodoAnterior, labels) {
  const options = {
    chart: {
      type: 'line',
      height: 350,
      toolbar: { show: false }
    },
    series: [
      {
        name: 'Período selecionado',
        data: periodoAtual
      },
      {
        name: 'Período anterior',
        data: periodoAnterior
      }
    ],
    xaxis: {
      categories: labels
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    colors: ['#367373', '#B4D9D5'],
    grid: {
      borderColor: 'rgba(54,115,115,0.15)',
      strokeDashArray: 4
    },
    legend: {
      position: 'top'
    }
  };

  new ApexCharts(
    document.querySelector("#graficoComparacao"),
    options
  ).render();
}


function nomeMes(mes) {
  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril",
    "Maio", "Junho", "Julho", "Agosto",
    "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  return meses[mes - 1];
}
