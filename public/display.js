var arr = {
  edges: [],
  nodes: []
}
let buttonCreate = document.getElementById('button-create');
buttonCreate.addEventListener('click', (e) => {
  e.preventDefault()
  let label = document.getElementById('name-create');
  let x = document.getElementById('x-create');
  let y = document.getElementById('y-create')
  let newdot = {
    label: document.getElementById('name-create').value,
    x: document.getElementById('x-create').value,
    y: document.getElementById('y-create').value,
    id: String(arr.nodes.length + 1),
    color: "rgb(90,90,90)",
    size: 100
  }
  label.value = ""
  x.value = ""
  y.value = ""

  arr.nodes.push(newdot)
  console.log(arr)
})

let edgeCreate = document.getElementById('edge-button').addEventListener('click',(e) => {
  e.preventDefault()
  let true1 = null
  let true2 = null
  let source = document.getElementById('first-dodge');
  let target = document.getElementById('second-dodge');
  arr.nodes.forEach(element => {
    if (element.id == String(source.value)) {
      true1 = true
    }
    if (element.id == String(target.value)) {
      true2 = true
    }
  });

  if (true1 && true2) {
    console.log(true1)
    console.log(true2)
    let newEdge = {
      source: document.getElementById('first-dodge').value,
      target: document.getElementById('second-dodge').value,
      id: String(arr.edges.length + 1)
    }
  
    source.value = ""
    target.value = ""
    
    arr.edges.push(newEdge)
    console.log(arr)
  }
  if (true1 === null) {
      alert('id первой точки не существует')
  }
  if (true2 === null) {
    alert('id второй точки не существует')
  }

  
})




// let buttonClear = document.getElementById("button-create").onclick = function(e) {
//   document.getElementById("name-create").value = ""
//   document.getElementById("x-create").value = ""
//   document.getElementById("y-create").value = ""
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
