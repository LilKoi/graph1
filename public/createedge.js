import up from './up.js'

function createEdge(id1, id2) {
    let newEdge = {
      source: String(id1),
      target: String(id2),
      id: String(up.returnArr().edges.length + 1)
    }
    up.updateArr('edge', newEdge)
  }

  export {createEdge as default}