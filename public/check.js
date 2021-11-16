import state from "./state.js"
  export default {
    check(e, e2){
      let have2 = false
      state.returnArr().edges.forEach((e3,index3) => {
        if(((e3.source == e.id) & (e3.target == e2.id)) || ((e3.target == e.id) & (e3.source == e2.id)) & (e.id != e2.id)) {
          have2 = true
        }
      })
      return have2
    },
    allCheck(e,e1) {
      let have = false
      state.returnArr().edges.forEach((e3,index3) => {
        
      })
    }
}