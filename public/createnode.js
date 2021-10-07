import getRandomInRange from './random.js'
function createNode(id) {
    let newNodes = {
      label: String(id),
      x:  getRandomInRange(1, 25),
      y:  getRandomInRange(1, 25),
      id: String(id),
      color: "rgb(90,90,90)",
      size: 100
    }
    arr.nodes.push(newNodes)
    return newNodes
  }

  export {getRandomInRange as default};