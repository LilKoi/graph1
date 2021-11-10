import state from './state.js'



export default function createEdge(id1, id2){
  let newEdge = {
    source: String(id1),
    target: String(id2),
    id: String(state.returnArr().edges.length + 1)
  }
  state.updateArr('edges', newEdge)
  return newEdge
}