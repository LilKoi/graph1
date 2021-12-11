import createNode from './createNode.js'
import createEdge from './createEdge.js'
  
  export default {
    state: {
        edges: [],
        nodes: []
    },
    updateArr(type, obj) {
        if (type == 'edges') {
            this.state.edges.push(obj)
        }
        if (type == "nodes") {
            this.state.nodes.push(obj)
        }
    },
    returnArr() {
        return this.state
    },
    pullSetka() {
        let setka = document.getElementById("cetka")
        let arraySetka = new Array(setka.querySelectorAll("div").length)
        for (let i = 0; i < setka.querySelectorAll("div").length; i++) {
            arraySetka[i] = new Array(setka.querySelectorAll("div")[i].querySelectorAll("input").length);
            for (let j = 0; j < setka.querySelectorAll("div")[i].querySelectorAll("input").length; j++) {
                arraySetka[i][j] = setka.querySelectorAll("div")[i].querySelectorAll('input')[j].value
            }
        }
        return arraySetka
    },
    updateStatusReady(id,status) {
        this.returnArr.nodes.find((e) => {
            if(e.id == id) {
                e.status = status
            }
        })
    },
    generateStateArray() {
        let list = this.generateSpisokFunc()
  for(let i=0;i<list.length;i++) {
    createNode(i+1)
  }
  for(let i=0;i<list.length;i++) {
    for(let j=0;j<list.length;j++) {
      if(list[i][j] != -1) {
        let have = false
        this.returnArr().edges.forEach((element) => {
          if(((element.source == i+1) & (element.target == j+1))||((element.source == j+1) & (element.target == i+1))) {
          have = true
          }
        })
        if (!have) {
          createEdge(i+1,j+1)  
        }
      }
    }
  }
    },
     generateSpisokFunc() {
        let arraySetka = this.pullSetka()
        let list = [];
        for(let i =0; i < arraySetka.length;i++) {
          list[i] = []
          for(let j =0; j< arraySetka.length;j++) {
            list[i].push(-1)
          }
        }
        
        for(let i =0; i < arraySetka.length;i++) {
          for(let j =0; j< arraySetka.length;j++) {
            if (arraySetka[i][j] == 1) {
              list[i][j] = j;
            }
          }
        }
      
        for(let i =0; i < arraySetka.length;i++) {
          // console.log(`Для вершины ${i+1}:`) потом включить, мне надоело лишнее 
          for(let j =0; j< arraySetka.length;j++) {
            if(list[i][j] != -1) {
              // console.log(list[i][j] + 1) потом включить, мне надоело лишнее 
            }
          }
        }
        return list;
      }
  }

