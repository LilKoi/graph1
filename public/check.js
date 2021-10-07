function check(e, e2) {
    have2 = false
    arr.edges.forEach((e3,index3) => {
      if(((e3.source == e.id) & (e3.target == e2.id)) || ((e3.target == e.id) & (e3.source == e2.id)) & (e.id != e2.id)) {
        have2 = true
      }
    })
    return have2
  }

  export { check }