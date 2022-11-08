"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// window.oncontextmenu = function(event) {
//   // block right-click / context-menu
//   event.preventDefault();
//   event.stopPropagation();
//   return false;
// };
// window.addEventListener("keydown", function(event) {
//   if (event.keyCode == 116) {
//       // block F5 (Refresh)
//       event.preventDefault();
//       event.stopPropagation();
//       return false;
//   } else if (event.keyCode == 122) {
//       // block F11 (Fullscreen)
//       event.preventDefault();
//       event.stopPropagation();
//       return false;
//   } else if (event.keyCode == 123) {
//       // block F12 (DevTools)
//       event.preventDefault();
//       event.stopPropagation();
//       return false;
//   } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {
//       // block Strg+Shift+I (DevTools)
//       event.preventDefault();
//       event.stopPropagation();
//       return false;
//   } else if (event.ctrlKey && event.shiftKey && event.keyCode == 74) {
//       // block Strg+Shift+J (Console)
//       event.preventDefault();
//       event.stopPropagation();
//       return false;
//   }
// });
// 
var allProcess = [];

var appendProcessElement = function appendProcessElement(arr) {
  var container = document.getElementById("rpc");
  container.innerHTML = '';
  Object.keys(arr).map(function (item, index) {
    var div = document.createElement('div');
    var process = document.createElement('input');
    process.classList.add('process-name');
    process.type = 'radio';
    process.value = arr[item][0].exe.substr(3).replaceAll('\\', '\\\\').replace(/\\\\/g, "\\");
    process.name = "process-name";
    process.id = index;
    process.onclick = addMeasureBtn;
    var label = document.createElement('label');
    label.innerText = arr[item][0].name;
    label.className = 'process-label';
    label.htmlFor = index;
    div.appendChild(process);
    div.appendChild(label);
    container.appendChild(div);
  });
};

var getProcess = function getProcess() {
  var res;
  return regeneratorRuntime.async(function getProcess$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(eel.getProcess()());

        case 2:
          res = _context.sent;
          console.log(res);
          allProcess = res[0];
          appendProcessElement(allProcess);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
};

var findProcess = function findProcess() {
  var value = document.getElementById('p-search').value;
  console.log(value);

  if (value) {
    // Convert `obj` to a key/value array
    // `[['name', 'Luke Skywalker'], ['title', 'Jedi Knight'], ...]`
    var filteredData = Object.entries(allProcess).filter(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          keyValue = _ref2[1];

      return keyValue[0].name.toLowerCase().includes(value.toLowerCase());
    }); // Convert the key/value array back to an object:
    // `{ name: 'Luke Skywalker', title: 'Jedi Knight' }`

    var result = Object.fromEntries(filteredData);
    var parent = document.getElementById('rpc');
    parent.innerHTML = "";
    appendProcessElement(result);
  } else {
    appendProcessElement(allProcess);
  }
};

var addMeasureBtn = function addMeasureBtn() {
  var input = document.querySelectorAll('input[name="process-name"]:checked');
  sessionStorage.setItem('selected-application', input[0].value);
  var parent = document.getElementsByClassName('measure-btn-div');

  if (input && parent[0].children.length === 0) {
    var btn = document.createElement('button');
    btn.setAttribute('class', 'btn btn-outline-success');
    btn.innerText = 'Measure';

    btn.onclick = function () {
      return window.location = "./measure.html";
    };

    parent[0].appendChild(btn);
  }
}; // const fetchRequest = async () =>{
//   const res = await fetch('https://sih11.herokuapp.com/places');
//   console.log(await res.json())
// }