
const countryCarbonIntensity = {
  India: 708,
  USA: 304,
  Germany: 210,
}
const renderBarChart = () => {
  var options = {
    series: [{
      name: 'Net Profit',
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
    },],
    chart: {
      type: 'bar',
      height: '100%',
      width: '100%',
      toolbar: { show: false },
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
  console.log(chart, "hello")
  chart.render();
}

const renderDonutChart = () => {
  var options = {
    series: [44, 55, 41, 17, 15],
    chart: {
      type: 'donut',
      width: '100%',
      height: '100%'
    },
    legend: {
      position: 'bottom'
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          height: '100%',
          width: '100%',
          toolbar: { show: false },
        }
      }
    }]
  };

  var chart = new ApexCharts(document.querySelector("#donutChart"), options);
  chart.render();
}
const calculateCarbonEmission = (country, othersInputValue) => {
  const ele = document.getElementById('energy-value')
  const value = ele.innerText.split(' ')[0]
  let intensityFactor;
  if (country) {
    const currentCountry = country.trim()
    intensityFactor = countryCarbonIntensity[currentCountry]
  } else {
    intensityFactor = othersInputValue
  }
  console.log(value)
  const cal = ((value / 1000000) * intensityFactor).toFixed(2)
  return cal;
}
//exemplary euivalent
const calculateExemplaryEquivalent = () =>{
  const cont = document.getElementsByClassName('equivalent-cont')
  cont[0].style.display = 'flex'
  let emission = document.getElementById('energy-value')
  emission = emission.innerText.split(' ')[0]
  const equi = (emission/50).toFixed(2)
  const Ele = document.getElementById('equi')
  Ele.innerHTML = `<span class='value-bold'>${equi}</span>` + " " +` <span class='text-additional'>email(s)</span>`
}
//dropDown of country for carbon internsity factor
const handleChange = (e) => {
  const otherInput = document.getElementById('others-input-country')
  otherInput.style.display = 'none'

  const ele = document.getElementById('carbon-intensity-selected')
  const value = e.target.innerText;
  ele.innerText = value
  const emissionvalue = calculateCarbonEmission(value);
  document.getElementById('emission-value').innerHTML = `<span class='value-bold'>${emissionvalue}</span>` + " " +`<span class='text-additional''>gCO2e</span>`
}
const handleChangeOtherCountry = (e) => {
  const ele = document.getElementById('carbon-intensity-selected')
  const value = e.target.innerText;
  ele.innerText = value
  const otherInput = document.getElementById('others-input-country')
  otherInput.style.display = 'block'

}
const handleOthersInputChange = (e) => {
  const value = e.target.value;
  console.log(value)
  const energyConsumed = document.getElementById('energy-value').innerText.split(' ')[0]
  const emissionvalue = ((energyConsumed / 1000000) * Number(value)).toFixed(2)
  document.getElementById('emission-value').innerHTML = `<span class='value-bold'>${emissionvalue}</span>` + " " +`<span class='text-additional''>gCO2e</span>`
}
const defaultCarbonEmission = () => {
  const value = document.getElementById('carbon-intensity-selected').innerText
  let emissionvalue;
  if (value === 'Others') {
    const othersInputValue = document.getElementById('others-input-country').value
    emissionvalue = calculateCarbonEmission(null, othersInputValue);
  } else {
    emissionvalue = calculateCarbonEmission(value);
  }
  document.getElementById('emission-value').innerHTML = `<span class='value-bold'>${emissionvalue}</span>` + " " +`<span class='text-additional''>gCO2e</span>`
}
const startMeasuring = async () => {
  const res = await eel.startDPSService()();
  console.log(res)
  setTimeout(EnableStopMeasuringBtn,1000*60*1)
    // changing dispaly property of measduirng animation
    const Ele = document.getElementsByClassName('measuring-status')[0];
    Ele.style.display = 'flex'
    const successEle = document.getElementsByClassName('measured-success')[0];
    successEle.style.display = 'none'
  // toggling the measure button
  const stopMeasuringBtn = document.getElementById('stop-measuring-btn')
  stopMeasuringBtn.style.display = 'block';
  const startMeasuringBtn = document.getElementById('start-measuring-btn');
  startMeasuringBtn.style.display = 'none'
  const exemplaryEqui = document.getElementsByClassName('equivalent-cont')[0];
  exemplaryEqui.style.display = 'none'
}
const stopMeasuring = async () => {
  console.log("clicked")
  const res = await eel.stopDPSService()();

  console.log(res)
  // rendering charts
  // renderLineChart('lineChart', 'Energy Consumption (kJ)', value.time, value.energy, 'Time (hh:mm:ss)', 'Energy Consumed (kJ)')
  // renderLineChart('lineChart2', 'Power Consumption (kW)', value.time, value.power, 'Time (hh:mm:ss)', 'Power Consumed (kW)')
  // updating energy consumption and carbon emission values
  const energy_value = document.getElementById('energy-value')
  energy_value.innerHTML = `<span class='value-bold'>${value.cumulativeEnergy}</span>` + " " +`<span class='text-additional''>mWh</span>` 
  //default carbon emission run for the default value of the selected counrty before manually stopping the measuring
  defaultCarbonEmission()


  // changing dispaly property of measduirng animation
  const Ele = document.getElementsByClassName('measuring-status')[0];
  Ele.style.display = 'none'
  const successEle = document.getElementsByClassName('measured-success')[0];
  successEle.style.display = 'block'

  // toggling the measure button
  const stopMeasuringBtn = document.getElementById('stop-measuring-btn')
  stopMeasuringBtn.style.display = 'none';
  const startMeasuringBtn = document.getElementById('start-measuring-btn');
  startMeasuringBtn.style.display = 'block'

  //
  calculateExemplaryEquivalent()
}

const renderLineChart = (id, title, xaxisData, yaxisData, xTitle, yTitle) => {
  var myChart = echarts.init(document.getElementById(id));

  option = {
    tooltip: {
      trigger: 'axis',
      position: function (pt) {
        return [pt[0], '10%'];
      }
    },
    title: {
      left: 'center',
      text: title
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        restore: {},
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      data: xaxisData,
      boundaryGap: false,
      name:'Time (hh:mm:ss)',
      nameLocation:'middle',
      nameGap:20,
      axisLabel: {
        formatter: (value) => {
          let res = String(value).split(" ")
          res = res[1]?.slice(0, -4)
          return res ? res : value
        }
      },
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%']
    },
    // horizontal zoom bar
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 10
      },
      {
        start: 0,
        end: 10
      }
    ],
    series: [
      {
        name: yTitle,
        type: 'line',
        symbol: 'none',
        sampling: 'lttb',
        itemStyle: {
          color: 'rgb(255, 70, 131)'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(255, 158, 68)'
            },
            {
              offset: 1,
              color: 'rgb(255, 70, 131)'
            }
          ])
        },
        data: yaxisData
      }
    ]
  };

  // Display the chart using the configuration items and data just specified.
  myChart.setOption(option);
}

const addEventListenerDropdown = () => {
  const ele = document.getElementsByClassName('carbon-intensity-country')
  Array.from(ele).forEach(function (element) {
    element.addEventListener('click', handleChange);
  });
  const other = document.getElementById('others-country')
  other.addEventListener('click', handleChangeOtherCountry)
  const otherInput = document.getElementById('others-input-country')
  otherInput.addEventListener('keyup', handleOthersInputChange);
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
document.addEventListener("DOMContentLoaded", function () {
  addEventListenerDropdown();
  startMeasuring();
});


