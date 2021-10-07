import createNode from './createNode.js'
import createEdge from './createEdge.js'
import getRandomInRange from './random.js'
import check from './check.js'
import up from './up.js'

let list = document.getElementById("button-create").addEventListener("click", (e) => {
  e.preventDefault()
  let input = document.getElementById("input").value
  let exit = document.getElementById("exit").value.split(',')
  let yes = false
  let node;
  up.returnArr().nodes.forEach((element)=>{
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
    up.returnArr().nodes.forEach((element1) =>{
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
    graph: up.returnArr(),
    container: 'network-graph',
    })
    graph.refresh();
    document.getElementById('form').classList.toggle('none')
})



let matrix = document.getElementById("create-list").addEventListener("click", (e) => {
  let listArray = [];
  up.returnArr().nodes.forEach((e,index) => {
    listArray[e.id] = new Array()
    up.returnArr().nodes.forEach((e2,index2) => {
          let have = false
          listArray[e.id].push(check(e,e2))
    })
  })
})