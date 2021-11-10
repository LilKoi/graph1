import createNode from './createNode.js'
import createEdge from './createEdge.js'
import getRandomInRange from './random.js'
import check from './check.js'
import state from './state.js'


let list = document.getElementById("button-create").addEventListener("click", (e) => {
  e.preventDefault()
  let input = document.getElementById("input").value
  let exit = document.getElementById("exit").value.split(',')
  let yes = false
  let node;
  state.returnArr().nodes.forEach((element)=>{
    if(element.id == String(input)) {
      yes = true
      node = element
      // console.log(yes)
    }
  })
  if(!yes) {
    node = createNode(input)
  }
  exit.forEach((element) => {
    let yes2 = false
    let node2;
    state.returnArr().nodes.forEach((element1) =>{
      if(element1.id == String(element)) {
        yes2 = true
        node2 = element1
      }
    })
    if (!yes2) {
      node2 = createNode(element)
    }
    createEdge(node.id, node2.id)
  })
})


let graph = document.getElementById('create-graph').addEventListener('click', (e) => {
  // createGraph(JSON.stringify(arr))
  const graph = new sigma({
    graph: state.returnArr(),
    container: 'network-graph',
    })
    graph.refresh();
    document.getElementById('form').classList.toggle('none')
})



let matrix = document.getElementById("create-list").addEventListener("click", (e) => {
  let listArray = [];
  state.returnArr().nodes.forEach((e,index) => {
    listArray[e.id] = new Array()
    state.returnArr().nodes.forEach((e2,index2) => {
          let have = false
          listArray[e.id].push(check(e,e2))
    })
  })
  // console.log(listArray)
})

let generateCetka = document.getElementById("createCetka").addEventListener("click", (e)=> {
  e.preventDefault();
  let x = document.getElementById("x").value
  let y = document.getElementById("y").value
  let cetka = document.getElementById("cetka");
  for (let i=0;i<y;i++) {
    let newDiv = document.createElement("div")
    newDiv.id = `y-${i}`
    newDiv.className += "flex"
    cetka.appendChild(newDiv)
  }
  // console.log(cetka)
  for (let i=0;i<y;i++) {
    let newx = cetka.querySelector(`#y-${i}`)
    // console.log(newx)
    for (let j=0;j<x;j++) {
      let newDiv = document.createElement("input")
      newDiv.id = `y-${i}`
      newDiv.id = `x-${j}`
      newx.appendChild(newDiv)
    }
  }
})

let generateSpisok = document.getElementById("createSpisok").addEventListener ("click", (e) => {
  e.preventDefault();  

  let arraySetka = state.pullSetka()
  let list = [];
  for(let i =0; i < arraySetka.length;i++) {
    list[i] = []
    for(let j =0; j< arraySetka.length;j++) {
      list[i].push(-1)
    }
  }
  
  for(let i =0; i < arraySetka.length;i++) {
    for(let j =0; j< arraySetka.length;j++) {
      if (arraySetka[i][j] == 1) {
        list[i][j] = j;
      }
    }
  }

  for(let i =0; i < arraySetka.length;i++) {
    console.log(`Для вершины ${i+1}:`)
    for(let j =0; j< arraySetka.length;j++) {
      if(list[i][j] != -1) {
        console.log(list[i][j] + 1)
      }
    }
  }
})
