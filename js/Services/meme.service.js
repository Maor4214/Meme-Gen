'use strict'

let gLineIdCount = 0
let gSelectedLineIdx = 0

let gMeme = {
  selectedImgId: 1,
  lines: [{}],
}
let gEditLines = gMeme.lines

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

function createMemeLine(txt = 'Add Text Here:') {
  return (gMeme.lines[0] = {
    id: 0,
    txt,
    size: 40,
    color: '#000000',
    x: 240,
    y: 80,
    align: 'center',
    font: 'Ariel',
  })
}

function renderMeme(imgId) {
  const currImg = setImg(imgId)
  renderImg(currImg)
  drawText()
  if (gIsMovingText) drawFrame(gEditLines[gSelectedLineIdx])
}

function addLine() {
  let newLine = _createLine()
  // console.log('newline', newLine)
  gMeme.lines.push(newLine)
  drawText()
}

function deleteLine() {
  delete gEditLines[gSelectedLineIdx]
  renderMeme(gMeme.selectedImgId)
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
    align: 'center',
    font: 'Ariel',
  }
}

function drawFrame(line) {
  const textWidth = gCtx.measureText(line.txt).width
  const textHeight = 20
  const padding = 10

  gCtx.beginPath()
  gCtx.strokeStyle = 'black'
  gCtx.lineWidth = 2

  gCtx.strokeRect(
    line.x - textWidth / 2 - padding,
    line.y - textHeight - padding,
    textWidth + padding * 2,
    textHeight + padding
  )

  gCtx.closePath()
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
  if (!gEditLines[0]) createMemeLine()
  const randomText = (gEditLines[0].txt = RANDOMTEXT[randomTextId])
  onSetImg(randomImgId, randomText)
}

function drawText() {
  for (var i = 0; i < gMeme.lines.length; i++) {
    if (!gEditLines[i]) continue
    gCtx.lineWidth = 2
    gCtx.strokeStyle = gEditLines[i].color
    gCtx.fillStyle = gEditLines[i].color
    gCtx.font = `${gEditLines[i].size}px ${gEditLines[i].font}`
    gCtx.textAlign = `${gEditLines[i].align}`
    gCtx.textBaseline = `${gEditLines[i].align}`
    // console.log('gTxtAlign', gTxtAlign)

    gCtx.fillText(gEditLines[i].txt, gEditLines[i].x, gEditLines[i].y)
    gCtx.strokeText(gEditLines[i].txt, gEditLines[i].x, gEditLines[i].y)
  }
}

function getLineById(lineId) {
  const lineIdx = gMeme.lines.find((line) => line && line.id === lineId)
  return lineIdx
}
