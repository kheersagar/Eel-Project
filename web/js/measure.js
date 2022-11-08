const countryCarbonIntensity = {
  India: 708,
  USA: 304,
  Germany: 210,
};
const renderBarChart = () => {
  var options = {
    series: [
      {
        name: "Net Profit",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
      },
    ],
    chart: {
      type: "bar",
      height: "100%",
      width: "100%",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    title: {
      text: "Energy Consumption from CPU",
      align: "left",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
      ],
    },
    fill: {
      opacity: 1,
    },
  };

  var chart = new ApexCharts(document.querySelector("#chart"), options);
  console.log(chart, "hello");
  chart.render();
};

const renderDonutChart = (data) => {
  var chartDom = document.getElementById("donut-chart");
  var myChart = echarts.init(chartDom);
  var option;

  option = {
    title: {
      text: "Total Enery Consumed",
      // subtext: 'Fake Data',
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "right",
    },
    series: [
      {
        name: "Energy Consumed (mJ)",
        type: "pie",
        radius: "60%",
        data: data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  option && myChart.setOption(option);
};
const calculateCarbonEmission = (country, othersInputValue) => {
  const ele = document.getElementById("energy-value");
  const value = ele.innerText.split(" ")[0];
  let intensityFactor;
  if (country) {
    const currentCountry = country.trim();
    intensityFactor = countryCarbonIntensity[currentCountry];
  } else {
    intensityFactor = othersInputValue;
  }
  console.log(value);
  const cal = ((value / 1000000) * intensityFactor).toFixed(2);
  return cal;
};
//exemplary euivalent
const calculateExemplaryEquivalent = () => {
  let emission = document.getElementById("energy-value");
  emission = emission.innerText.split(" ")[0];
  const equi = (emission / 50).toFixed(2);
  const Ele = document.getElementById("equi");
  Ele.innerHTML =
    `<span class='value-bold'>${equi}</span>` +
    " " +
    ` <span class='text-additional'>email(s)</span>`;
};
//dropDown of country for carbon internsity factor
const handleChange = (e) => {
  const otherInput = document.getElementById("others-input-country");
  otherInput.style.display = "none";

  const ele = document.getElementById("carbon-intensity-selected");
  const value = e.target.innerText;
  ele.innerText = value;
  const emissionvalue = calculateCarbonEmission(value);
  document.getElementById("emission-value").innerHTML =
    `<span class='value-bold'>${emissionvalue}</span>` +
    " " +
    `<span class='text-additional''>gCO2e</span>`;
};
const handleChangeOtherCountry = (e) => {
  const ele = document.getElementById("carbon-intensity-selected");
  const value = e.target.innerText;
  ele.innerText = value;
  const otherInput = document.getElementById("others-input-country");
  otherInput.style.display = "block";
};
const handleOthersInputChange = (e) => {
  const value = e.target.value;
  console.log(value);
  const energyConsumed = document
    .getElementById("energy-value")
    .innerText.split(" ")[0];
  const emissionvalue = ((energyConsumed / 1000000) * Number(value)).toFixed(2);
  document.getElementById("emission-value").innerHTML =
    `<span class='value-bold'>${emissionvalue}</span>` +
    " " +
    `<span class='text-additional''>gCO2e</span>`;
};
const defaultCarbonEmission = () => {
  const value = document.getElementById("carbon-intensity-selected").innerText;
  let emissionvalue;
  if (value === "Others") {
    const othersInputValue = document.getElementById(
      "others-input-country"
    ).value;
    emissionvalue = calculateCarbonEmission(null, othersInputValue);
  } else {
    emissionvalue = calculateCarbonEmission(value);
  }
  document.getElementById("emission-value").innerHTML =
    `<span class='value-bold'>${emissionvalue}</span>` +
    " " +
    `<span class='text-additional''>gCO2e</span>`;
};

const ToggleMeasurebtn = () => {
  const stopMeasuringBtn = document.getElementById("stop-measuring-btn");
  const isVisible = stopMeasuringBtn.style.display === "block";
  if (isVisible) {
    stopMeasuringBtn.style.display = "none";
  } else {
    stopMeasuringBtn.style.display = "block";
  }
};
const startMeasuring = async () => {
  // 
  document.getElementById('modal-tigger-btn').click()

  const stopMeasuringBtn = document.getElementById("stop-measuring-btn");
  stopMeasuringBtn.style.display = "none";
  const startMeasuringBtn = document.getElementById("start-measuring-btn");
  startMeasuringBtn.style.display = "none";
  const mesuringTitle = document.getElementsByClassName(
    "measuring-status-title"
  )[0];
  mesuringTitle.innerHTML = "Starting";

  const res = await eel.startDPSService()();
  console.log(res);
  startMeasuringBtn.style.display = "none";
  mesuringTitle.innerHTML = "Measuring";

  setTimeout(ToggleMeasurebtn, 1000 * 60 * 1);

};
const stopMeasuring = async () => {
  const res = await eel.stopDPSService()();
  console.log(res);
  let energyValue;
  if (res.status === 0) {
    //toggle toast
    document.getElementById('liveToast').classList.remove('hide')
    document.getElementById('liveToast').classList.add('show')

    setTimeout(()=>{
      document.getElementById('liveToast').classList.remove('show')
      document.getElementById('liveToast').classList.add('hide')
    },5000)

    const selectedAppPath = sessionStorage.getItem("selected-application-path");
    const selectedAppName = sessionStorage.getItem("selected-application-name");
    energyValue = await eel.applicationConsumption(
      selectedAppPath,
      selectedAppName
    )();
    console.log(energyValue);
  }
  const startMeasuringBtn = document.getElementById("start-measuring-btn");
  startMeasuringBtn.style.display = "block";
  // rendering charts
  let data = [];
  Object.keys(energyValue).map((item, index) => {
    if (item !== "TotalEnergyConsumption")
      data.push({ value: energyValue[item], name: item });
  });
  renderDonutChart(data);
  // renderLineChart('lineChart', 'Energy Consumption (kJ)', value.time, value.energy, 'Time (hh:mm:ss)', 'Energy Consumed (kJ)')
  // renderLineChart('lineChart2', 'Power Consumption (kW)', value.time, value.power, 'Time (hh:mm:ss)', 'Power Consumed (kW)')
  // updating energy consumption and carbon emission values
  const value = ((energyValue.TotalEnergyConsumption/1000) * 0.27777777777778).toFixed(
    2
  ); // mJ to mWh
  const energy_value = document.getElementById("energy-value");
  energy_value.innerHTML =
    `<span class='value-bold'>${value}</span>` +
    " " +
    `<span class='text-additional''>mWh</span>`;
  //default carbon emission run for the default value of the selected counrty before manually stopping the measuring
  defaultCarbonEmission();

  // toggling the measure button
  ToggleMeasurebtn();

  //
  calculateExemplaryEquivalent();
};

const renderLineChart = (id, title, xaxisData, yaxisData, xTitle, yTitle) => {
  var myChart = echarts.init(document.getElementById(id));

  option = {
    tooltip: {
      trigger: "axis",
      position: function (pt) {
        return [pt[0], "10%"];
      },
    },
    title: {
      left: "center",
      text: title,
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: "none",
        },
        restore: {},
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      data: xaxisData,
      boundaryGap: false,
      name: "Time (hh:mm:ss)",
      nameLocation: "middle",
      nameGap: 20,
      axisLabel: {
        formatter: (value) => {
          let res = String(value).split(" ");
          res = res[1]?.slice(0, -4);
          return res ? res : value;
        },
      },
    },
    yAxis: {
      type: "value",
      boundaryGap: [0, "100%"],
    },
    // horizontal zoom bar
    dataZoom: [
      {
        type: "inside",
        start: 0,
        end: 10,
      },
      {
        start: 0,
        end: 10,
      },
    ],
    series: [
      {
        name: yTitle,
        type: "line",
        symbol: "none",
        sampling: "lttb",
        itemStyle: {
          color: "rgb(255, 70, 131)",
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(255, 158, 68)",
            },
            {
              offset: 1,
              color: "rgb(255, 70, 131)",
            },
          ]),
        },
        data: yaxisData,
      },
    ],
  };

  // Display the chart using the configuration items and data just specified.
  myChart.setOption(option);
};

const addEventListenerDropdown = () => {
  const ele = document.getElementsByClassName("carbon-intensity-country");
  Array.from(ele).forEach(function (element) {
    element.addEventListener("click", handleChange);
  });
  const other = document.getElementById("others-country");
  other.addEventListener("click", handleChangeOtherCountry);
  const otherInput = document.getElementById("others-input-country");
  otherInput.addEventListener("keyup", handleOthersInputChange);
  //adding event listener to measure btn
  document.getElementById('start-measuring-btn').addEventListener('click',startMeasuring)
};
document.addEventListener("DOMContentLoaded", function () {
  addEventListenerDropdown();
  startMeasuring();
});
