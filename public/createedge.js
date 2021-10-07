exports.createEd = function createEdge(id1, id2) {
    newEdge = {
      source: String(id1),
      target: String(id2),
      id: String(arr.edges.length + 1)
    }
    arr.edges.push(newEdge)
  }