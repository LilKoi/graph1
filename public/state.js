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
        console.log(this.state)
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
    }
  }

