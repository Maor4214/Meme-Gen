'use strict'

let gElCanvas
let gCtx

function onInit() {
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')
  renderGallery()
  makeSectionInvisible()
  addListeners()
  resizeCanvas()

  window.addEventListener('resize', () => {
    resizeCanvas()
    renderMeme(gMeme.selectedImgId)
  })
}

function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container')
  // Changing the canvas dimension clears the canvas
  gElCanvas.width = elContainer.clientWidth - 2
}

function addListeners() {
  addMouseListeners()
  addTouchListeners()
}
