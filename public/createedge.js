import up from './state.js'



export default function createEdge(id1, id2){
  let newEdge = {
    source: String(id1),
    target: String(id2),
    id: String(up.returnArr().edges.length + 1)
  }
  up.updateArr('edges', newEdge)
  return newEdge
}