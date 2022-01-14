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
          listArray[e.id].push(check.check(e,e2))
    })
  })
  console.log(listArray)
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

function createMatrixIncidencyFunction() {
  let arr = state.pullSetka()
  let array = []
  for(let i=0;i<arr.length;i++) {
    for(let j=0;j<arr.length;j++) {
      if(Number(arr[i][j]) > 0) {
        let tmp = new Array(arr.length).fill(0)
        tmp[i] = tmp[j] = 1;
        array.push(tmp);
      }
    }
  }

  for (let i=0; i < array.length; i++)
	{
		for (let j = i + 1; j < array.length; j++)
		{
      let a = array[i];
      let b = array[j];
      let is_same = a.every(function(element, index) {
        return element == b[index]; 
    });
			if (is_same)
			{
				array.splice(j,1);
			}
		}
	}
  let array1 = new Array(array[0].length);
  for(let i=0;i<array[0].length;i++) {
    array1[i] = new Array(array.length)
    for(let j=0;j<array.length;j++) {
      array1[i][j] = array[j][i] 
    }
  }
  return array1
}

let createMatrixIncidency = document.getElementById("createMatrixIncidency").addEventListener("click", (e) => {
  e.preventDefault()
  let arr = state.pullSetka()
  let array = []
  for(let i=0;i<arr.length;i++) {
    for(let j=0;j<arr.length;j++) {
      if(Number(arr[i][j]) > 0) {
        let tmp = new Array(arr.length).fill(0)
        tmp[i] = tmp[j] = 1;
        array.push(tmp);
      }
    }
  }

  for (let i=0; i < array.length; i++)
	{
		for (let j = i + 1; j < array.length; j++)
		{
      let a = array[i];
      let b = array[j];
      let is_same = a.every(function(element, index) {
        return element == b[index]; 
    });
			if (is_same)
			{
				array.splice(j,1);
			}
		}
	}
  let array1 = new Array(array[0].length);
  for(let i=0;i<array[0].length;i++) {
    array1[i] = new Array(array.length)
    for(let j=0;j<array.length;j++) {
      array1[i][j] = array[j][i] 
    }
  }
  console.log(array1);
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
  let isDirac = count.find((e) => {
    if(e >= cmej.length / 2) {
      return true;
    }
  })
  if(isDirac > 0) {
    isDirac = true
  } else {
    isDirac = false;
  }
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
  console.log(isOre)
})

let Posha = document.getElementById("posha").addEventListener("click", (e) => {
  e.preventDefault()
  let cmej = state.pullSetka()
  let isPoshe = false
  for (let x=1;x< (cmej.length - 1) / 2;x++) {
    let fx = 0
    for(let i=0;i<(cmej.length - 1) / 2;i++) {
      if(cmej[i] <= x) {
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
  let a = state.pullSetka()
    let b =  state.pullSetka()
    let n  = a.length 
    let arr = []
    for (let count = 0; count < a.length; count++){
      arr.push(b)
      b = multiply(a,b)
    }
      function multiply (a, b) {

        let c = [] 
        for(let i = 0;i<a.length;i++) { 
          c[i] = [] 
          for(let j = 0;j<a.length;j++) { 
            c[i][j] = 0 
          } 
        }
        for(let i = 0; i < n; i++) 
        for(let j = 0; j < n; j++) 
        for(let k = 0; k < n; k++) 
        c[i][j] = c[i][j] | (a[i][k] & b[k][j])
        return c
      }
      for (let i = 1; i < arr.length-1; i++){
        for (let j = 0; j < arr.length; j++){
          for (let k = 0; k < arr.length; k++){
            a[j][k] = arr[i][j][k] | a[j][k]
          }
        }
      }
    console.log(a)
})

function dostFunc() {
  let a = state.pullSetka()
    let b =  state.pullSetka()
    let n  = a.length 
    let arr = []
    for (let count = 0; count < a.length; count++){
      arr.push(b)
      b = multiply(a,b)
    }
      function multiply (a, b) {

        let c = [] 
        for(let i = 0;i<a.length;i++) { 
          c[i] = [] 
          for(let j = 0;j<a.length;j++) { 
            c[i][j] = 0 
          } 
        }
        for(let i = 0; i < n; i++) 
        for(let j = 0; j < n; j++) 
        for(let k = 0; k < n; k++) 
        c[i][j] = c[i][j] | (a[i][k] & b[k][j])
        return c
      }
      for (let i = 1; i < arr.length-1; i++){
        for (let j = 0; j < arr.length; j++){
          for (let k = 0; k < arr.length; k++){
            a[j][k] = arr[i][j][k] | a[j][k]
          }
        }
      }
    return a
}

let dijkstra = document.getElementById("dijkstra").addEventListener("click", (e) => {
  e.preventDefault()
  let cmej = state.pullSetka()
  Dijkstra(cmej)
  function Dijkstra(matrix, start = 0) {
    for(let i=0;i<matrix.length;i++) {
      for(let j=0;j<matrix.length;j++) {
        if(matrix[i][j] == 0) {
          matrix[i][j] = Infinity
        }
        if(matrix[i][j] != Infinity) {
          matrix[i][j] = Number(matrix[i][j])
        }
      }
    }
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
      }
    }
    console.log(distance);
  return distance;
}
})

let kraskala = document.getElementById("kraskala").addEventListener("click",(e) => {
  e.preventDefault()
  let task = state.pullSetka();
  let v_weights = [];
  let empty_v = [];
  for(let i = 0;i<task.length;i++) {
    for(let j=i;j<task[i].length;j++) {
      if(Number(task[i][j]) != 0) {
        let obj = 
        {
          "first":task[i][j],
          "second":{
            "first":i,
            "second":j
          } 
        }
        v_weights.push(obj)
      } 
    }
  }
  v_weights.sort((a,b) => {
    if(a.first > b.first) {
      return 1
    }
    if(a.first < b.first) {
      return -1
    }
    return 0
  })
  while(v_weights.length > 0) {
    let obj = {
      "first":v_weights[0].second.first,
      "second":v_weights[0].second.second
    }
    empty_v.push(obj)
    let Matrix = new Array(task.length);
    for(let i=0;i<task.length;i++) {
      Matrix[i] = new Array(task.length).fill(0)
    }
    empty_v.forEach(element => {
      Matrix[element.first][element.second] = 1
      Matrix[element.second][element.first] = 1
    })
    let pr = new Array(Matrix.length).fill(false)
    for(let i=0;i< Matrix.length;i++) {
      if(!pr[i]) {
        pr = obxod_v_glubiny(i,Matrix,pr)
      }
    }
    v_weights.shift()
  }
  console.log(empty_v)
  empty_v.forEach(element => {
    const findFirst = state.returnArr().nodes.find((element1) =>{
      if(element.first == element1.id){
        return element1
      }
    })
    if(typeof findFirst === "undefined") {
      createNode(element.first)
    }
    const findSecond = state.returnArr().nodes.find((element1) =>{
      if(element.second == element1.id){
        return element1
      }
    })
    if(typeof findSecond === "undefined") {
      createNode(element.second)
    }
  })
  empty_v.forEach(element => {
    createEdge(element.first,element.second)
  })
  console.log(state.returnArr())
  function obxod_v_glubiny(v,task,rp) {
    rp[v] = true
    for(let u=0;u<task.length;u++) {
      if((task[v][u]) && (!rp[u])) {
        rp = obxod_v_glubiny(u,task,rp)
      }
    }
    return rp;
  }
})
let dif = document.getElementById("dif").addEventListener("click",e => {
  e.preventDefault()
  let list = [
    [0,1,1,0],
    [0,0,1,0],
    [0,0,1,0],
    [1,0,0,1],
  ]
  let max = Number.MIN_SAFE_INTEGER
  let ready = new Array(list.length)
  let ready2 = new Array(list.length)
  for(let index=1;index<=list.length;index++){
    deep(index,ready,list)
  }
  deep2(list.length,ready,ready2,list)
  for(let i = 0;i<ready.length;i++) {
    for(let j = 0;j<ready[i].length;j++) {
      let sum = ready[i][j].length - ready2[i][j].length
        if(sum > max) {
          max = sum
        }
    }
  }
  console.log(ready)
  console.log(ready2)
  console.log(max)
  function deep2(number,ready,ready2,list) {
    for (let index = 0; index < ready.length; index++) {
      ready2[index] = new Array(ready[index].length)
      for(let j=0;j<ready[index].length;j++) {
        ready2[index][j] = new Array()
      }
    }
    for (let i = 0; i < ready.length; i++) {
      for (let j = 0; j < ready[i].length; j++) {
        for(let k=0;k < ready[i][j].length;k++) {
          let index = ready[i][j][k]
          for(let m=0;m<list[index].length;m++) {
            if(list[index][m] == 1) {
              let find = ready2[i][j].find(element => {
                if(element == m) {
                  return element
                }
              })
              if(typeof find == "undefined") {
                ready2[i][j].push(m)
              }
            }
          }
        }
      }
    }

  }
  function deep(number, ready, list) {
    let par = (factorial(list.length) / (factorial(number) *factorial(list.length - number))) 
    ready[number-1] = new Array(par)      
    for (let i = 0; i < par; i++) {
      ready[number-1][i] = []
    }
    let count = 1;
      while(count != par+1) {
        let newNumber = Math.floor(Math.random() * list.length)
        let findNumber;
        
          // console.log(ready[number-1][count-1])
          findNumber = ready[number-1][count-1].find(element => {
            if(element == newNumber) {
              return true
            }
          }) 
        if(typeof findNumber == "undefined") {
          ready[number-1][count-1].push(newNumber)
          if(ready[number-1][count-1].length == number) {
            let findArray = ready[number-1][count-1]
              if(isEqual(findArray,ready[number-1],count-1)) {
                ready[number-1][count-1] = []
              }else{
            count++
          }
        }
      }
    }
  }
  function isEqual(arrayFind, array,index){
    let isEqual = false
    for (let i = 0; i < array.length; i++) {
      if(!isEqual & (index != i)) {
        let result = arrayFind.every(element => array[i].includes(element))
        if(result) {
          isEqual = true
        }
      }
    }
    return isEqual
  }
    function factorial(number) {
      let fac = 1;
      for (let index = 1; index <= number; index++) {
        fac *= index
      }
      return fac
    }
})

let dvud = document.getElementById("dvud").addEventListener("click",e => {

  e.preventDefault()
  let array = state.pullSetka()
  let graph = new Array(array.length)
  for(let i=0;i<array.length;i++) {
    graph[i] = []
  } 
  for(let i=0;i<array.length - 1;i++) {
    for(let j= i + 1 ;j<array.length;j++) {
    if(array[i][j] == 1) {
      graph[i].push(j)
      graph[j].push(i)
    }
  }
  }  
  let possible = true
  let n = graph.length
  let visited = new Array(n).fill(0)
  for (let i=0;i<n;i++) {
    if(visited[i]==0) 
        {
            dfs(i,1); 
        }
  }
  console.log(visited)
    console.log(possible ? "да" : "нет")
    function dfs(v,c) {
      visited[v]=c; 
    for(let j=0;j<graph[v].length;j++)
    {
        if(visited[graph[v][j]]==0) 
        {
            let new_colour = (c==1) ? 2 :1;
            
            dfs(graph[v][j],new_colour); 
        }
        if(visited[graph[v][j]]==c)
        {
            possible=false; 
        }
    }
    }
})

let bio = document.getElementById("bio").addEventListener("click", e => {
  e.preventDefault()
  let incidency = dostFunc();
  console.log("Матрица Инцедентности")
  console.log(incidency)
  for(let i=0;i<incidency.length;i++) {
    for(let j=0;j<incidency[i].length;j++) {
      if(incidency[i][j] == 1) {
        console.log(`{${i},${j}}`)
      }
    }
  }
})

let levita = document.getElementById("levita").addEventListener("click", e => {
  e.preventDefault()
  let array = state.pullSetka()
  let g = new Array(array.length)
  
  for(let i=0;i<g.length;i++)
  g[i] = []
  
  array.forEach((element, index) => {
    element.forEach((element2, index2) => {
      if(array[index][index2]) {
        g[index].push([index2,array[index][index2]])
      }
    })
  })
  const numberOfVertices  = g.length
  const startVertex       = 0
  const finishVertex      = 3

  let d = new Array(numberOfVertices).fill(Infinity);
  d[startVertex] = 0
  let state = new Array(numberOfVertices).fill(2)
  state[startVertex] = 1
  let q = []
  q.push(startVertex)
  let p = new Array(numberOfVertices).fill(-1)

  while(q.length != 0)
  {
    let vertex = q[0]
    q.splice(0,1)
    state[vertex] = 0
    for(let i = 0; i < g[vertex].length;i++) {
      let to = g[vertex][i][0]
      let length = g[vertex][i][1]
      if(d[to] > d[vertex] + length) {
        d[to] = d[vertex] + length
        if(state[to] == 2) {
          q.push(to)
        } else {
          if (state[to] == 0) {
            q.unshift(to)
          }
        }
        p[to] = vertex
        state[to] = 1
      }
    }
  }

  if(p[finishVertex] == -1) {
    console.log("No solution")
  } else {
    let path = []
    for(let vertex = finishVertex; vertex != -1; vertex = p[vertex])
      path.push(vertex)
    path.reverse()
    for(let i=0; i<path.length;i++)
    console.log(path[i])
  }

  // console.log(list)
})

let par = document.getElementById("par").addEventListener("click", e => {
  e.preventDefault()
  let array = state.pullSetka()
  const V = array.length; 
  
  function bfs(rGraph, s, t, parent)
  {
      
      let visited = new Array(V);
      for(let i = 0; i < V; ++i)
          visited[i] = false;

      let queue  = [];
      queue.push(s);
      visited[s] = true;
      parent[s] = -1;

      while (queue.length != 0)
      {
          let u = queue.shift();

          for(let v = 0; v < V; v++) 
          {
              if (visited[v] == false && 
                  rGraph[u][v] > 0)
              {
                  if (v == t) 
                  {
                      parent[v] = u;
                      return true;
                  }
                  queue.push(v);
                  parent[v] = u;
                  visited[v] = true;
              }
          }
      }

      return false;
  }

  function fordFulkerson(graph, s, t)
  {
      let u, v;
  
      let rGraph = new Array(V);

      for(u = 0; u < V; u++)
      {
          rGraph[u] = new Array(V);
          for(v = 0; v < V; v++)
              rGraph[u][v] = graph[u][v];
      }
      
      let parent = new Array(V);
      
      let max_flow = 0; 

      while (bfs(rGraph, s, t, parent))
      {
          
          let path_flow = Number.MAX_VALUE;
          for(v = t; v != s; v = parent[v]) 
          {
              u = parent[v];
              path_flow = Math.min(path_flow, 
                                  rGraph[u][v]);
          }

          for(v = t; v != s; v = parent[v]) 
          {
              u = parent[v];
              rGraph[u][v] -= path_flow;
              rGraph[v][u] += path_flow;
          }

          max_flow += path_flow;
      }

      return max_flow;
  }

  console.log("The maximum possible flow is " + 
                fordFulkerson(array, 0, V-1));

})