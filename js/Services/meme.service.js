'use strict'

let gTxtFont = 'Ariel'
let gTxtAlign = 'center'
let gLineIdCount = 1

let gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      id: 1,
      txt: 'Add Text Here:',
      size: 40,
      color: '#000000',
      x: 240,
      y: 80,
    },
  ],
}
let gEditLines = gMeme.lines[0]

let gLinePos

const RANDOMTEXT = [
  'When food is life.',
  'I cant adult today.',
  'Mood: Always tired.',
  'Sarcasm level: Expert.',
  'Procrastination is my superpower.',
  'Netflix > everything.',
  'Who needs sleep anyway?',
  'Coffee: My spirit animal.',
  'WiFi is life.',
  'Me? Overthink? Never!',
]

function drawText(text, x, y) {
  // console.log('gMeme.lines[0].color', gEditLines)
  // console.log('gMeme.lines[0].size', gEditLines.size)
  gCtx.lineWidth = 2
  gCtx.strokeStyle = gEditLines.color
  gCtx.fillStyle = gEditLines.color
  gCtx.font = `${gEditLines.size}px ${gTxtFont}`
  gCtx.textAlign = `${gTxtAlign}`
  gCtx.textBaseline = `${gTxtAlign}`
  // console.log('gTxtAlign', gTxtAlign)

  gCtx.fillText(text, x, y)
  gCtx.strokeText(text, x, y)
}

function renderMeme(imgId) {
  const currImg = setImg(imgId)
  renderImg(currImg)
  drawText(gEditLines.txt, gMeme.lines[0].x, gMeme.lines[0].y)
}

function addLine() {
  let newLine = _createLine()
  // console.log('newline', newLine)
  gMeme.lines.push(newLine)
}

function _createLine() {
  gLineIdCount++
  return {
    id: gLineIdCount,
    txt: 'Add Text Here:',
    size: 40,
    color: '#000000',
    x: 240,
    y: 80,
  }
}

function drawFrame(height, width, x, y) {
  gCtx.strokeStyle = 'black'
  gCtx.strokeRect(x, y, width, height)
}

// function isTextCLicked(clickPos) {
//   const { pos } = gCircle
//   // Calc the distance between two dots
//   const distance = Math.sqrt(
//     (pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2
//   )
//   // console.log('distance', distance)
//   //If its smaller then the radius of the circle we are inside
//   return distance <= gCircle.size
// }

function RandomizeMeme() {
  const randomImgId = getRandomInt(1, gImgs.length)
  const randomTextId = getRandomInt(0, RANDOMTEXT.length)
  gEditLines.txt = RANDOMTEXT[randomTextId]
  onSetImg(randomImgId)
}
