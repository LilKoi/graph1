import createNode from './createNode.js'
import createEdge from './createEdge.js'
import getRandomInRange from './random.js'
import check from './check.js'
import state from './state.js'
import diagramMatrix from "./diagramMatrix.js"
import depthModule from "./depth.js"
import widthModule from "./width.js"

let list = document.getElementById("button-create").addEventListener("click", (e) => {
  e.preventDefault()
  let string = document.getElementById("input").value
  let input = string.split(';')[0]
  let exit = string.split(';')[1].split(',')
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
  let stateArr = state.returnArr()
  console.log(stateArr)
  stateArr.nodes.forEach((e) => {
    delete e.used
    delete e.number
  })
  stateArr.edges.forEach((e) => {
    delete e.scales
  })
  console.log(stateArr)
  const graph = new sigma({
    graph: stateArr,
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
  state.generateSpisokFunc()
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
  }
})

let depth = document.getElementById("depth").addEventListener("click", (e) => {
  e.preventDefault();
  state.generateStateArray()

  depthModule.next(state.returnArr().nodes[0].id,`rgb(${getRandomInRange(0,255)},${getRandomInRange(0,255)},${getRandomInRange(0,255)})`)
  console.log(state.returnArr())
})

let width = document.getElementById("width").addEventListener("click",(e) => {
  e.preventDefault()
  state.generateStateArray()
  widthModule.start('1')
  console.log(state.returnArr())
})


let prima = document.getElementById('prima').addEventListener("click", (e) => {
  e.preventDefault()
  state.generateArrayInScales()
  console.log(state.returnArr())
  let edges = state.returnArr().edges
  next(1)
  function next(id) {
    let min = null;
    let edge = null;
    state.returnArr().nodes.find((e) => {
      if(e.id == id) {
        e.used = false;
        min = null;
        edge = null;
        state.returnArr().edges.find((e1) => {
          if(e.id == e1.source) {
            if(Number(e1.scales) < min || min == null) {
              min = Number(e1.scales)
              edge = e1
            }
          }
        })
      }
    })
    if(edge != null) {
      let egest = state.returnArr().edges.filter((e1, index) => {
          if(e1.source == edge.source) {
            console.log(e1)
            console.log(edge)
            if(!((edge.target == e1.target) && (edge.source == e1.source) || ((edge.target == e1.source) &&(edge.source == e1.target)))) {
              return false
            }

          } 
          return true
      })
      state.updateEdges(egest)
      next(edge.target)
    } else {
      let find = state.returnArr().nodes.find((e) => {
        if (e.used) {
          return e;
        }
      })
      if (typeof find !== " undefined") {
        next(find.id)
      }
    }
  }
})
let dostizhimost = document.getElementById("dostizhimost").addEventListener("click", (e) => {
  e.preventDefault();
  let cmej = state.pullSetka()
  for(let i=0;i<cmej.length;i++) {
    for(let j=0;j<cmej[i].length;j++) {
      if (i == j)
      cmej[i][j] = 1 
    }
  } 
  console.log(cmej)
})

let dijkstra = document.getElementById("dijkstra").addEventListener("click", (e) => {
  e.preventDefault()
  let cmej = state.pullSetka()
  Dijkstra(cmej)
  function Dijkstra(matrix, start = 0) {
    const rows = matrix.length,
    cols = matrix[0].length;
    const distance = new Array(rows).fill(Infinity);
    distance[start] = 0;
    for(let i = 0; i < rows; i++) {
      if(distance[i] < Infinity) {
       for(let j = 0; j < cols; j++) {
        if(matrix[i][j] + distance[i] < distance[j]) {
            distance[j] = matrix[i][j] + distance[i];
        }
       }
       console.log(distance);
      }
  }
  return distance;
}
})