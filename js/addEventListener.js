document.addEventListener('keydown', function (e) {
  let key = e.keyCode || e.which || e.charCode
  e.preventDefault()
  switch (key) {
    // 点击左方向键
    case 37:
      chessGame.moveLeft()
      break
    // 点击上方向键
    case 38:
      chessGame.moveUp()
      break
    // 点击右方向键
    case 39:
      chessGame.moveRight()
      break
    // 点击下方向键
    case 40:
      chessGame.moveDown()
      break
  }
})
var h = document.documentElement.clientHeight,
  mybody = document.getElementById('chessboard')
mybody.style.height = h + 'px'

//返回角度
function GetSlideAngle (dx, dy) {
  return Math.atan2(dy, dx) * 180 / Math.PI
}

//根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
function GetSlideDirection (startX, startY, endX, endY) {
  var dy = startY - endY
  var dx = endX - startX
  var result = 0
  if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
    return result
  }
  var angle = GetSlideAngle(dx, dy)
  if (angle >= -45 && angle < 45) {
    result = 4
  } else if (angle >= 45 && angle < 135) {
    result = 1
  } else if (angle >= -135 && angle < -45) {
    result = 2
  } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
    result = 3
  }
  return result
}

var startX, startY
mybody.addEventListener('touchstart', function (ev) {
  ev.preventDefault()
  startX = ev.touches[0].pageX
  startY = ev.touches[0].pageY
}, false)
mybody.addEventListener('touchmove', function (ev) {
  var endX, endY
  ev.preventDefault()
  endX = ev.changedTouches[0].pageX
  endY = ev.changedTouches[0].pageY
  var direction = GetSlideDirection(startX, startY, endX, endY)

  function handleMove () {
    switch (direction) {
      case 0:
        break
      case 1:
        chessGame.moveUp()
        break
      case 2:
        chessGame.moveDown()
        break
      case 3:
        chessGame.moveLeft()
        break
      case 4:
        chessGame.moveRight()
        break
      default:
        break
    }
  }

  mybody.addEventListener('touchend', handleMove)

}, false)

function isSlideable () {
  var bodyElem = document.getElementsByTagName('body')[0]
  var htmlElem = document.getElementsByTagName('html')[0]
  htmlElem.style['overflow-y'] = 'hidden'
  // htmlElem.style['height'] = '100%'
  bodyElem.style['overflow-y'] = 'hidden'
  // bodyElem.style['height'] = '100%'
}
