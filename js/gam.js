class game {
  constructor () {
    this.score = 0
    this.bestScore = 0
    this.chessNumber = 4
    this.data = []
    this.beforeData = []
    this.isStilRemain = true
    this.isFinalEnd = false
    this.isMove = true
    this.count = 0
  }

  // 初始化
  init () {
    this.data = []
    this.score = 0
    this.isStilRemain = true
    this.isFinalEnd = false
    for (let i = 0; i < this.chessNumber; i++) {
      this.data[i] = []
      for (let j = 0; j < this.chessNumber; j++) {
        this.data[i][j] = ''
      }
    }
    this.beforeData = this.data
    this.upToViewAll()
    this.generateNumber()
    this.generateNumber()
    this.upToViewAll()
  }

  // 获得棋子DOM对象
  getChess (i, j) {
    return document.getElementById(`chess-${i}-${j}`)
  }

  // 是否还有剩余位置
  isRemain () {
    for (let i = 0; i < this.chessNumber; i++) {
      this.isStilRemain = this.data[i].some((value) => value === '')
      if (this.isStilRemain) {
        return true
      }
    }
    return false
  }

  hasMove () {
    this.isMove = this.beforeData === String(this.data) ? false : true
  }

  // 设置状态
  setChess (x, y, value) {
    this.data[x][y] = value
    this.upToView(x, y)
  }

  // 随机产生数字
  generateNumber () { // 产生数字
    if (this.isRemain() && this.isMove) {
      let value = Math.random() > 0.5 ? 4 : 2
      let randomX = Math.floor(Math.random() * 4)
      let randomY = Math.floor(Math.random() * 4)
      if (this.getChess(randomX, randomY).innerHTML === '') {
        this.setChess(randomX, randomY, value)
      } else {
        while (this.getChess(randomX, randomY).innerHTML !== '') {
          randomX = Math.floor(Math.random() * 4)
          randomY = Math.floor(Math.random() * 4)
        }
        this.setChess(randomX, randomY, value)
      }
    }
  }

  // 向左移动
  moveLeft () {
    this.beforeData = String(this.data)
    // 判断两个数组是否相等 必须把两个数组转成字符串在进行比较
    for (let i = 0; i < this.chessNumber; i++) {
      this.data[i] = this.crash(this.data[i], 'left')
    }
    this.upToViewAll()
    this.hasMove()
    this.count++
    console.log(`我执行了${this.count}次`)
    if (this.isRemain()) {
      this.generateNumber()
    }
  }

  moveRight () { // 向右移动
    this.beforeData = String(this.data)
    for (let i = 0; i < this.chessNumber; i++) {
      this.data[i] = this.crash(this.data[i], 'right')
    }
    this.upToViewAll()
    this.hasMove()
    if (this.isRemain()) {
      this.generateNumber()
    }
  }

  moveUp () { // 向上移动
    this.beforeData = String(this.data)
    let temp
    for (let i = 0; i < this.chessNumber; i++) {
      temp = this.crash(this.getCol(i), 'up')
      this.setCol(i, temp)
    }
    this.upToViewAll()
    this.hasMove()
    if (this.isRemain()) {
      this.generateNumber()
    }
  }

  moveDown () { // 向下移动
    this.beforeData = String(this.data)
    let temp
    for (let i = 0; i < this.chessNumber; i++) {
      temp = this.crash(this.getCol(i), 'down')
      this.setCol(i, temp)
    }
    this.upToViewAll()
    this.hasMove()
    if (this.isRemain()) {
      this.generateNumber()
    }
  }

  // 获取数组第col列
  getCol (col) {
    let arr = []
    for (let i = 0; i < this.chessNumber; i++) {
      arr.push(this.data[i][col])
    }
    return arr
  }

  // 给数组第col列赋值
  setCol (col, arr) {
    for (let i = 0; i < this.chessNumber; i++) {
      this.data[i][col] = arr.shift()
    }
  }

  // 产生碰撞，合并相同数
  crash (arr, type) {
    let temp = arr.filter(value => value !== '') // 把空格去掉
    if (type === 'left' || type === 'up') {
      for (let i = 0; i < temp.length; i++) {
        if (temp[i] === temp[i + 1]) {
          this.score += temp[i]
          temp.splice(i, 2, temp[i] * 2)
        }
      }
      while (temp.length < this.chessNumber) {
        temp.push('')
      }
    }
    if (type === 'right' || type === 'down') {
      for (let i = temp.length - 1; i > 0; i--) {
        if (temp[i - 1] === temp[i]) {
          let tempScore = temp[i]
          this.score += parseInt(tempScore)
          temp.splice(i - 1, 2, tempScore * 2)
        }
      }
      while (temp.length < this.chessNumber) {
        temp.unshift('')
      }
    }
    return temp
  }

  // 更新所有视图层
  upToViewAll () {
    for (let i = 0; i < this.chessNumber; i++) {
      for (let j = 0; j < this.chessNumber; j++) {
        this.upToView(i, j)
      }
    }
    this.isFinalEnd = this.isEnd()
    if (this.isFinalEnd === true) {
      alert(`Game Over! you score is ${this.score}`)
      let isReStart = window.prompt('是否重新开始游戏')
      if (isReStart) this.init()
    }
  }

  // 更新 x,y视图层
  upToView (x, y) {
    let temp, color
    temp = this.data[x][y]
    this.getChess(x, y).innerHTML = temp
    switch (temp) {
      case 2:
        color = '#d5e6c1'
        break
      case 4:
        color = '#97db47'
        break
      case 8:
        color = '#dee51a'
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
      default:
        color = '#41d530'
        break
    }
    this.getChess(x, y).style.backgroundColor = color
    // 计算分数
    score.innerHTML = this.score
    this.bestScore = this.score > this.bestScore ? this.score : this.bestScore
    bestScore.innerHTML = this.bestScore
  }

  // 判断游戏是否结束
  isEnd () {
    if (this.isStilRemain) return false
    else {
      for (let i = 0; i < this.chessNumber; i++) {
        for (let j = 0; j < this.chessNumber - 1; j++) {
          if (this.data[i][j] === this.data[i][j + 1] || this.getCol(i)[j] === this.getCol(i)[j + 1]) {
            return false
          }
        }
      }
      return true
    }
    return true
  }
}

let chessGame = new game()
chessGame.init()