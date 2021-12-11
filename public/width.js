import state from "./state.js";

export default {
    start(id) {
        state.returnArr().nodes.find((e) =>{
            if(e.id == id) {
                e.number = 0;
                e.used = false;
                let arr = [];
                state.returnArr().edges.find(e1 => {
                    if(e1.source == e.id) {
                        arr.push(e1.target)
                    }
                })
                // console.log(arr)
                this.findInArray(arr,1)
            }
        })
    },
    findInArray(array,number) {
        let arr = [];
        console.log(array)
        array.forEach(element => {
            state.returnArr().edges.find((e) => {
                if(element == e.source) {
                    arr.push(e.target)
                }
            })
            state.returnArr().nodes.find((e1) =>{
                if(e1.id == element && e1.used) {
                    e1.used = false;
                    e1.number = number;
                }
            })
        })
        if(arr.length > 0) {
            this.findInArray(arr,number++)

        }
    }
}