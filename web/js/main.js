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
let allProcess = [];


const appendProcessElement = (arr)=>{
const container = document.getElementById("rpc");
Object.keys(arr).map((item,index)=>{
  const div = document.createElement('div')
  const process = document.createElement('input')
  process.classList.add('process-name')
  process.type ='radio';
  process.value = item.name
  process.name = "process-name"
  process.id=index
  process.onclick = addMeasureBtn

  const label = document.createElement('label')
  label.innerText = arr[item][0].name
  label.className = 'process-label'
  label.htmlFor = index

  div.appendChild(process)
  div.appendChild(label)
  container.appendChild(div)
})
}

const getProcess = async ()=>{
const res = await  eel.getProcess()();
console.log(res)
allProcess = res[0];
appendProcessElement(allProcess)
}

const findProcess = () =>{
  const value = document.getElementById('p-search').value;
  console.log(value);
  if(value){
    // Convert `obj` to a key/value array
  // `[['name', 'Luke Skywalker'], ['title', 'Jedi Knight'], ...]`
    const filteredData =  Object.entries(allProcess).filter(([key,keyValue]) => {
      return  keyValue[0].name.toLowerCase().includes(value.toLowerCase())
    })
    // Convert the key/value array back to an object:
  // `{ name: 'Luke Skywalker', title: 'Jedi Knight' }`
    const result =  Object.fromEntries(filteredData);
    const parent = document.getElementById('rpc');
    parent.innerHTML = ""
    appendProcessElement(result)
  }else{
    appendProcessElement(allProcess)
  }
}

const addMeasureBtn = () =>{
 const input =  document.querySelectorAll('input[name="process-name"]:checked')
 const parent =  document.getElementsByClassName('measure-btn-div');
 if(input &&  parent[0].children.length === 0){
    const btn = document.createElement('button');
    btn.setAttribute('class','btn btn-outline-success');
    btn.innerText = 'Measure';
    btn.onclick = () => window.location = "./measure.html"
   parent[0].appendChild(btn);
  }
}
// const fetchRequest = async () =>{
//   const res = await fetch('https://sih11.herokuapp.com/places');
//   console.log(await res.json())
// }
