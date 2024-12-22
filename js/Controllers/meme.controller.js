'use strict'

function onOpenMeme() {
  document.querySelector('.main-meme-gen').classList.remove('hidden')
  document.querySelector('.main-saved').classList.add('hidden')
  document.querySelector('.main-gallery').classList.add('hidden')
}

function onChangeTxt(text) {
  // const gElCanvas = document.querySelector('canvas')
  editLines.txt = text
  renderMeme(gMeme.selectedImgId)
  // drawText(gMeme.lines[0].txt, gElCanvas.width / 2, gElCanvas.height / 4)
}

function onChangeFont(num) {
  editLines.size += num
  renderMeme(gMeme.selectedImgId)
}

function onSetColor(color) {
  editLines.color = color
  renderMeme(gMeme.selectedImgId)
}
