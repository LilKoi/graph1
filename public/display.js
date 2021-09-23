var arr = {
  edges: [],
  nodes: []
}
let buttonCreate = document.getElementById('button-create');
buttonCreate.addEventListener('click', (e) => {
  e.preventDefault()
  let newdot = {
    label: document.getElementById('name-create').value,
    x: document.getElementById('x-create').value,
    y: document.getElementById('y-create').value,
    id: arr.nodes.length + 1,
    color: "rgb(90,90,90)",
    size: 100
  }
  arr.nodes.push(newdot)
  console.log(arr)
})

let edgeCreate = document.getElementById('edge-button').addEventListener('click',(e) => {
  e.preventDefault()
  let newEdge = {
    sourse: document.getElementById('first-dodge').value,
    target: document.getElementById('second-dodge').value,
    id: arr.edges.length + 1
  }
  arr.edges.push(newEdge)
  console.log(arr)
})

let graph = document.getElementById('create-graph').addEventListener('click', (e) => {
  createGraph(JSON.stringify(arr))
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
