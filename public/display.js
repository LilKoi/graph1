import { createNode } from './createNode.js'
import { createEdge } from './createEdge.js'
import { getRandomInRange } from './random.js'
import { check } from './check.js'
import {  } from './up.js'



var arr = {
  edges: [],
  nodes: []
}

let list = document.getElementById("button-create").addEventListener("click", (e) => {
  e.preventDefault()
  let input = document.getElementById("input").value
  let exit = document.getElementById("exit").value.split(',')
  let yes = false
  let node;
  arr.nodes.forEach((element)=>{
    if(element.id == String(input)) {
      yes = true
      node = element
      console.log(yes)
    }
  })
  if(!yes) {
    node = createNode(input)
  }
  exit.forEach((element) => {
    let yes2 = false
    let node2;
    arr.nodes.forEach((element1) =>{
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


// function createNode(id) {
//   let newNodes = {
//     label: String(id),
//     x:  getRandomInRange(1, 25),
//     y:  getRandomInRange(1, 25),
//     id: String(id),
//     color: "rgb(90,90,90)",
//     size: 100
//   }
//   arr.nodes.push(newNodes)
//   return newNodes
// }

// function createEdge(id1, id2) {
//   newEdge = {
//     source: String(id1),
//     target: String(id2),
//     id: String(arr.edges.length + 1)
//   }
//   arr.edges.push(newEdge)
// }

// function getRandomInRange(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

let graph = document.getElementById('create-graph').addEventListener('click', (e) => {
  // createGraph(JSON.stringify(arr))
  const graph = new sigma({
    graph: arr,
    container: 'network-graph',
    })
    graph.refresh();
    document.getElementById('form').classList.toggle('none')
})



let matrix = document.getElementById("create-list").addEventListener("click", (e) => {
  let listArray = [];
  arr.nodes.forEach((e,index) => {
    listArray[e.id] = new Array()
    arr.nodes.forEach((e2,index2) => {
          let have = false
          listArray[e.id].push(check(e,e2))
    })
  })
  console.log(arr)
  console.log(listArray)
})

// function check(e, e2) {
//   have2 = false
//   arr.edges.forEach((e3,index3) => {
//     if(((e3.source == e.id) & (e3.target == e2.id)) || ((e3.target == e.id) & (e3.source == e2.id)) & (e.id != e2.id)) {
//       have2 = true
//     }
//   })
//   return have2
// }










function createGraph(graphJson){
  function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  };
  console.log("json", graphJson)
  sigma.parsers.json( graphJson ,
  
    {container: 'network-graph'},
  
  function(s) {
      nodeId = parseInt(getParameterByName('node_id'));
  
      var selectedNode;
  
      s.graph.nodes().forEach(function(node, i, a) {
          if (node.id == nodeId) {
          selectedNode = node;
          return;
          }
      });
  
      s.graph.nodes().forEach(function(node, i, a) {
          node.x = Math.cos(Math.PI * 2 * i / a.length);
          node.y = Math.sin(Math.PI * 2 * i / a.length);
      });
  
      s.refresh();
  
      s.startForceAtlas2();
  
      if (selectedNode != undefined){
          s.cameras[0].goTo({x:selectedNode['read_cam0:x'],y:selectedNode['read_cam0:y'],ratio:0.1});
      }
  });
  
   
}
