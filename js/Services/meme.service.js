'use strict'

let gTxtFont = 'Ariel'
let gTxtAlign = 'center'

let gMeme = {
  selectedImgId: 5,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'Add Text Here:',
      size: 40,
      color: '#000000',
    },
  ],
}

let editLines = gMeme.lines[0]

function getMeme(id = 6) {
  const gElCanvas = document.querySelector('canvas')
  console.log('id', id)
  drawText(editLines.txt, gElCanvas.width / 2, gElCanvas.height / 4)
}

function drawText(text, x, y) {
  console.log('text', text)
  const gElCanvas = document.querySelector('canvas')
  const gCtx = gElCanvas.getContext('2d')
  console.log('gMeme.lines[0].color', editLines)
  console.log('gMeme.lines[0].size', editLines.size)
  gCtx.lineWidth = 2
  gCtx.strokeStyle = editLines.color
  gCtx.fillStyle = editLines.color
  gCtx.font = `${editLines.size}px ${gTxtFont}`
  gCtx.textAlign = gTxtAlign
  gCtx.textBaseline = 'middle'

  gCtx.fillText(text, x, y)
  gCtx.strokeText(text, x, y)
}

function renderMeme(imgId) {
  const gElCanvas = document.querySelector('canvas')
  const currImg = setImg(imgId)
  renderImg(currImg)
  drawText(editLines.txt, gElCanvas.width / 2, gElCanvas.height / 4)
}
