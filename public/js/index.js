function gerarInstituicoes() {
  for (c = 0; c < 1; c++) {
    containerKPIS.innerHTML +=
      `
                <div class="KPI">
                   <p>Total: <span>Nubank</span></p> 
                   <p><span>R$1,000</span></p> 
                </div> 
            `
  }

}
function gerarGraficos() {
  const anoAtual = new Date().getFullYear();

  gerarTipos();
  gastosMes(anoAtual);
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

function gastosMes(ano) {
  fetch(`/registros/gastosMes/${ano}`)
    .then(res => res.json())
    .then(json => {
      const dados = [];
      const labels = [];

      json.forEach(item => {
        dados.push(item.total_gasto);
        const nome = new Date(ano, item.mes_num - 1)
          .toLocaleString('pt-BR', { month: 'long' });

        labels.push(nome.charAt(0).toUpperCase() + nome.slice(1));
      });

      criarGrafico(
        350,
        'line',
        'Gasto por mês',
        dados,
        labels,
        'graficoTemporal'
      );

    })
}

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

  const chart = new ApexCharts(
    document.querySelector(`#${div}`),
    options
  );

  chart.render();
}

opcaoDonut = {
  chart: {
    type: 'donut'
  },
  series: [50, 30],
  labels: ['Apple', 'Mango'],
  fill: {
    colors: ['#B4D9D5', '#367373']
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