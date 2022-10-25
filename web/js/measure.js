
const renderBarChart = () =>{
  var options = {
    series: [{
    name: 'Net Profit',
    data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
  }, ],
    chart: {
    type: 'bar',
    height:'100%',
    width:'100%',
    toolbar: { show:false },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      endingShape: 'rounded'
    },
  },
  title: {
    text: 'Energy Consumption from CPU',
    align: 'left'
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  xaxis: {
    categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
  },
  fill: {
    opacity: 1
  },
  };

  var chart = new ApexCharts(document.querySelector("#chart"), options);
  console.log(chart,"hello")
  chart.render();
}

const renderLineChart = (id,title) =>{
        
  var options = {
    series: [{
      name: "Desktops",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
  }],
    chart: {
    type: 'line',
      height:'100%',
      width:'100%',
      toolbar: { show:false },
      zoom: {
        enabled: false
      },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight'
  },
  title: {
    text: title,
    align: 'left'
  },
  grid: {
    row: {
      colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.5
    },
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  }
  };

  var chart = new ApexCharts(document.querySelector(`#${id}`), options);
  chart.render();
}
const renderDonutChart = () =>{
  var options = {
    series: [44, 55, 41, 17, 15],
    chart: {
    type: 'donut',
  },
  legend: {
    position: 'bottom' 
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart:{
        height:'100%',
        width:'100%',
        toolbar: { show:false },
      }
    }
  }]
  };

  var chart = new ApexCharts(document.querySelector("#donutChart"), options);
  chart.render();
}

const EnableStopMeasuringBtn = () =>{
  const btn = document.createElement('button');
  btn.innerText = 'Stop Measuring'
  btn.onclick = async () =>{
    console.log("clicked")
    const res = await eel.stopDPSService()();
    console.log(res)
  }
  document.getElementById('btn-cont').appendChild(btn)
}
document.addEventListener("DOMContentLoaded",  function() {
  renderBarChart();
  renderLineChart('lineChart','Carbon Emission (gCo2eq)');
  renderLineChart('lineChart2','Energy Consumption (Wh)');
  renderDonutChart();
  const btn = document.getElementById('start');
  btn.addEventListener('click', async ()=>{
    console.log("Started")
    const res = await eel.startDPSService()();
    console.log(res)
    setTimeout(EnableStopMeasuringBtn,1000*60*1)
  })

});
