import createNode from './createNode.js'
import createEdge from './createEdge.js'
import getRandomInRange from './random.js'
import check from './check.js'
import state from './state.js'
import diagramMatrix from "./diagramMatrix.js"

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

let createMatrixIncidency = document.getElementById("createMatrixIncidency").addEventListener("click", (e) => {
  e.preventDefault()
  let arr = state.pullSetka()
  let array = [];
  for(let i = 0;i<arr.length;i++) {
    for(let j = 0;j<arr.length;j++) {
      if(arr[i][j] > 0) {
        let tmp = new Array(arr.length);
        tmp[i] = tmp[j] = 1;
        array.push(tmp)
      }
    }
  }

  for(let i = 0;i<array.length;i++) {
    for(let j = i + 1;j<array.length;j++) {
      if(array[i] == array[j]) {
        array.splice(j,1)
      }
    }
  }

  let array1 = new Array(array.length)
  for(let i = 0;i<array.length;i++) {
    for(let j = 0;j<array.length;j++) {
      if(typeof array[i][j] == "undefined") {
        array[i][j] = 0;
      }
    }
  }
  console.log(array)
  console.log(array.length)
  for(let i = 0; i <array.length;i++) {
    array1[i] = new Array(array.length)
    for(let j = 0;array.length;j++) {
      array1[i][j] = array[j][i]
    }
  }
  console.log(array1)
})

let diagram = document.getElementById("createDiagMatrix").addEventListener("click",(e)=> {
  e.preventDefault()
  console.log(diagramMatrix())
})

let laplas = document.getElementById("createMatrixLaplas").addEventListener("click", (e) => {
  e.preventDefault()
  let diagonal = diagramMatrix()
  let cmej = state.pullSetka()
  let array = []
  for(let i=0;i<diagonal.length;i++) {
    array[i] = []
    for(let j=0;j<diagonal.length;j++) {
      array[i].push(0)
    }
  }
  for(let i=0;i<diagonal.length;i++) {
    for(let j=0;j<diagonal.length;j++) {
      array[i][j] = diagonal[i][j] - cmej[i][j];
    }
  }
  console.log(array)
}) 

let dirac = document.getElementById("dirac").addEventListener("click", (e) => {
  e.preventDefault()
  let cmej = state.pullSetka()
  let count = new Array(cmej.length).fill(0)
  cmej.forEach((e) => {
    e.forEach((e2, index) => {
      if (e2 == 1) {
        count[index]++
      }
    })
  })
  let isDirac = true;
  count.forEach((e)=> {
    if(e < cmej.length) {
      isDirac = false;
    }
  })
  console.log(isDirac)
})

let Ore = document.getElementById("ore").addEventListener("click", (e) => {
  e.preventDefault()
  let cmej = state.pullSetka()
  let count = new Array(cmej.length).fill(0)
  cmej.forEach((e,index) => {
    e.forEach((e2, index2) => {
      if ((e2 == 0) & (index != index2)) {
        count[index2]++
      }
    })
  })
  let isOre = true
  cmej.forEach((e,index) => {
    e.forEach((e2, index2) => {
      if ((e2 == 0) & (index != index2)) {
        if(count[index] + count[index2] <cmej.length) {
          isOre = false
        }
      }
    })
  })
  
})

let Posha = document.getElementById("posha").addEventListener("click", (e) => {
  e.preventDefault()
  let cmej = state.pullSetka()
  let isPoshe = false
  for (let x=1;x< (cmej.length - 1) / 2;x++) {
    let fx = 0
    for(let i=0;i<n;i++) {
      if(arr[i] <= x) {
        fx++
      }
    }
    if(fx < x ) {
      isPoshe = true
    }
  }
  console.log(isPoshe)
})

let isEller = document.getElementById("isEller").addEventListener("click", (e) => {
  e.preventDefault()
  let cmej = state.pullSetka()
  let count = new Array(cmej.length).fill(0)
  cmej.forEach((e,index) => {
    e.forEach((e2, index2) => {
      if (e2 == 1) {
        count[index2]++
      }
    })
  })
  let isEller = true;
  count.forEach((e) => {
    if (e % 2 != 0) {
      isEller = false;
    }
  })
  console.log(isEller)
})

let Metric = document.getElementById("Metric").addEventListener("click", (e) => {
  e.preventDefault()
  let cmej = state.pullSetka()
  let count = new Array(cmej.length).fill(0)
  cmej.forEach((e,index) => {
    e.forEach((e2, index2) => {
      let dead = [];
      console.log(`для точки-${index}`)
      next(e2,dead)
    })
  })
  function next(element,dead) {
    cmej.forEach((e,index) => {
      e.forEach((e2, index2) => {
        if((e2 == 1) & (!dead.includes(index2))) {
          dead.push(index2)
          next(e2,dead)
        }
      })
    })
    console.log(2)
  }
})