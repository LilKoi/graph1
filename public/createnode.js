import getRandomInRange from './random.js'
import up from './up.js'

export default function createNode(id){
  let newNodes = {
    label: String(id),
    x:  getRandomInRange(1, 25),
    y:  getRandomInRange(1, 25),
    id: String(id),
    color: "rgb(90,90,90)",
    size: 100
  }
  up.updateArr('nodes', newNodes)
  return newNodes
}