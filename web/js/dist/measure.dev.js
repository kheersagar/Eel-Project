"use strict";

var renderBarChart = function renderBarChart() {
  var options = {
    series: [{
      name: 'Net Profit',
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
    }],
    chart: {
      type: 'bar',
      height: '100%',
      width: '100%',
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      }
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
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
    },
    fill: {
      opacity: 1
    }
  };
  var chart = new ApexCharts(document.querySelector("#chart"), options);
  console.log(chart, "hello");
  chart.render();
};

var renderLineChart = function renderLineChart(id, title) {
  var options = {
    series: [{
      name: "Desktops",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }],
    chart: {
      type: 'line',
      height: '100%',
      width: '100%',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
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
        colors: ['#f3f3f3', 'transparent'],
        // takes an array which will be repeated on columns
        opacity: 0.5
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
    }
  };
  var chart = new ApexCharts(document.querySelector("#".concat(id)), options);
  chart.render();
};

var renderDonutChart = function renderDonutChart() {
  var options = {
    series: [44, 55, 41, 17, 15],
    chart: {
      type: 'donut'
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
          toolbar: {
            show: false
          }
        }
      }
    }]
  };
  var chart = new ApexCharts(document.querySelector("#donutChart"), options);
  chart.render();
};

var EnableStopMeasuringBtn = function EnableStopMeasuringBtn() {
  var btn = document.createElement('button');
  btn.innerText = 'Stop Measuring';

  btn.onclick = function _callee() {
    var res;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("clicked");
            _context.next = 3;
            return regeneratorRuntime.awrap(eel.stopDPSService()());

          case 3:
            res = _context.sent;
            console.log(res);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    });
  };

  document.getElementById('btn-cont').appendChild(btn);
};

document.addEventListener("DOMContentLoaded", function () {
  renderBarChart();
  renderLineChart('lineChart', 'Carbon Emission (gCo2eq)');
  renderLineChart('lineChart2', 'Energy Consumption (Wh)');
  renderDonutChart();
  var btn = document.getElementById('start');
  btn.addEventListener('click', function _callee2() {
    var res;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log("Started");
            _context2.next = 3;
            return regeneratorRuntime.awrap(eel.startDPSService()());

          case 3:
            res = _context2.sent;
            console.log(res);
            setTimeout(EnableStopMeasuringBtn, 1000 * 60 * 1);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
});