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
        node2 = element
        console.log(element1)
      }
    })
    if (!yes2) {
      node2 = createNode(element)
    }
    createEdge(node.id, node2.id)
  })
  console.log(arr)
})

function createNode(id) {
  let newNodes = {
    label: "nodes",
    x:  getRandomInRange(1, 25),
    y:  getRandomInRange(1, 25),
    id: String(id),
    color: "rgb(90,90,90)",
    size: 100
  }
  arr.nodes.push(newNodes)
  return newNodes
}

function createEdge(id1, id2) {
  newEdge = {
    source: String(id1),
    target: String(id2),
    id: String(arr.edges.length + 1)
  }
  arr.edges.push(newEdge)
}

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
