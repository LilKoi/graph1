import state from './state.js'
export default function createDiagMatrix() {
    let arr = state.pullSetka()
  let array = []
  console.log(arr.length)
  for(let i = 0;i<arr.length;i++) {
    array[i] = []
    for(let j=0;j<arr.length;j++) {
      array[i].push(0)
    }
  }
  console.log(array)
  let count = []
  for(let i=0;i<arr.length;i++) {
    count.push(0)
  }
  for(let i = 0;i<arr.length;i++) {
    for(let j=0;j<arr.length;j++) {
      if (arr[i][j] == 1) {
				count[i]++
			}
    }
  }
  for(let i = 0;i<arr.length;i++) {
    for(let j=0;j<arr.length;j++) {
      if (i == j) {
				array[i][j] = count[i]
			}
    }
  }
  return array
}