const navbar = document.getElementById("navbar");
const main = document.getElementById("main");
const home = document.getElementById("home");
const reg = document.getElementById("reg");
const add = document.getElementById("add");
const agenda = document.getElementById("agenda");

let ativo = false;

navbar.style.width = "70px";
home.style.display = "none";
reg.style.display = "none";
add.style.display = "none";
agenda.style.display = "none";
main.style.marginLeft = "70px";

function sidebarFunction() {
    console.log("Entrei na funciton", ativo)
    if (!ativo) {

        ativo = true;

        navbar.style.width = "290px";
        main.style.marginLeft = "290px";
        home.style.display = "";
        reg.style.display = "";
        add.style.display = "";
        agenda.style.display = "";

        console.log("Abriu", ativo);

    } else {
        ativo = false;

        navbar.style.width = "70px";
        main.style.marginLeft = "70px";
        home.style.display = "none";
        reg.style.display = "none";
        add.style.display = "none";
        agenda.style.display = "none";

        console.log("Fechou", ativo);
    }


}

function gerarKPIS() {
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

var options = {
  chart: {
    height:350,
    type: 'bar'
  },
  series: [{
    name: 'sales',
    data: [30,40,35,50,49,60,70,91,125]
  }],
  xaxis: {
    categories: [1991,1992,1993,1994,1995,1996,1997, 1998,1999]
  }
}

var tipos = new ApexCharts(document.querySelector("#graficoTipo"), options);

tipos.render();

var opcoes = {
  chart: {
    height:350,
    type: 'line'
  },
  series: [{
    name: 'sales',
    data: [30,40,35,50,49,60,70,91,125]
  }],
  xaxis: {
    categories: [1991,1992,1993,1994,1995,1996,1997, 1998,1999]
  }
}

var temporal = new ApexCharts(document.querySelector("#graficoTemporal"), opcoes);

temporal.render();

 opcaoDonut = {
    chart:{
        type: 'donut'
    },
    series: [50,30],
    labels: ['Apple', 'Mango'],
    fill:{
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