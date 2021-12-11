import state from "./state.js"
import random from "./random.js"
export default {
    next(id ,color) {
        // debugger
        state.returnArr().edges.find((e) =>{
            if (e.source == String(id)) {
                state.returnArr().nodes.find((e1) => {
                    if(e1.id == id & e1.used) {
                        e1.used = false
                        e1.color = color
                        state.returnArr().edges.forEach((element,index) => {
                          if(element.source == e1.id) {
                              if(index != 0) {
                                  color = `rgb(${random(0,255)},${random(0,255)},${random(0,255)})`
                              }
                              this.next(element.target, color)
                          }  
                        })
                    }
                })
            }
        })
    }
}