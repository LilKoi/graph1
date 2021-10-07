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
            this.state.push(obj)
        }
    },
    returnArr() {
        return this.state
    }
}