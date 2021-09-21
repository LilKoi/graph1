function getParameterByName(name) {
  var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
};

sigma.parsers.json( "../data/network.json",

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