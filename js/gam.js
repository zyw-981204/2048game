// let game = {
//   score: 0,
//   bestScore: 0,
//   data: [],
//   chessNumber: 4,
//   init () {
//     for (let i = 0; i < this.chessNumber; i++) {
//       for (let j = 0; j < this.chessNumber; j++) {
//         this.getChess(i, j).innerHTML = '0'
//         console.log(i, j)
//       }
//     }
//   },
//   getChess (i, j) {
//     return document.getElementById(`chess-${i}-${j}`)
//   }
// }
// game.init()
// console.log(game.chessNumber)

class game {
  constructor () {
    this.score = 0
    this.bestScore = 0
    this.chessNumber = 4
    this.data = []
    this.isStilRemain = true
  }

  init () {
    for (let i = 0; i < this.chessNumber; i++) {
      this.data[i] = []
      for (let j = 0; j < this.chessNumber; j++) {
        this.getChess(i, j).innerHTML = ' '
        this.data[i][j] = ' '
      }
    }
    this.generateNumber()
    this.generateNumber()
  }

  getChess (i, j) {
    return document.getElementById(`chess-${i}-${j}`)
  }

  isRemain () {
    for (let i = 0; i < this.chessNumber; i++) {
      this.isStilRemain = this.data[i].some((value) => value === ' ')
      if (this.isStilRemain) {
        return true
      }
    }
    return false
  }

  setChess (i, j, value) {
    this.getChess(i, j).innerHTML = value
    let color
    switch (value) {
      case 2:
        color = '#d5e6c1'
        break
      case 4:
        color = '#97db47'
        break
      case 8:
        color = '#68a61e'
        break
      case 16:
        color = '#477214'
        break
      case 32:
        color = '#617f57'
        break
      case 64:
        color = '#274c23'
        break
      case 128:
        color = '#10d79f'
        break
      case 256:
        color = '#1d46b8'
        break
      case 512:
        color = '#08132f'
        break
      case 1024:
        color = '#b42d91'
        break
      case 2048:
        color = '#d20d0d'
        break
    }
    this.getChess(i, j).style.backgroundColor = color
  }

  generateNumber(){
    if (this.isRemain()) {
      let value = Math.random() > 0.5 ? 4 : 2
      let randomX = Math.floor(Math.random() * 4)
      let randomY = Math.floor(Math.random() * 4)
      while (this.getChess(randomX, randomY).innerHTML !== ' ') {
        randomX = Math.floor(Math.random() * 4)
        randomY = Math.floor(Math.random() * 4)
      }
      this.setChess(randomX, randomY, value)
    }
  }
}

