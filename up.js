exports.up = function updateArr(type, obj) {
    let arr = {
    edges: [],
    nodes: []
    }
    if (type == 'edges') {
    arr.edges.push(obj)
    }
    if (type == "nodes") {
    arr.nodes.push(obj)
    }
    }