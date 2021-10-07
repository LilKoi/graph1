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
    }
}