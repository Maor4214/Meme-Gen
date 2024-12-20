'use strict'

// function onInit() {
//   renderGallery()
//   makeSectionInvisible()
//   //remmber to add a hidden class to the other sections!!
// }

function renderGallery() {
  const imgs = gImgs
  const elGallery = document.querySelector('.gallery')
  const strHtmls = imgs.map(
    (img) => `
        <img onclick="onSetImg(event, ${img.id})" src="${img.imgUrl}" alt="${img.keywords[0]}">`
  )
  elGallery.innerHTML = strHtmls.join('')
}

function makeSectionInvisible() {
  document.querySelector('.main-meme-gen').classList.add('hidden')
  document.querySelector('.main-saved').classList.add('hidden')
}

function onOpenGallery() {
  document.querySelector('.main-meme-gen').classList.add('hidden')
  document.querySelector('.main-saved').classList.add('hidden')
  document.querySelector('.main-gallery').classList.remove('hidden')

  renderGallery()
}

function onSetImg(ev, imgIdx) {
  console.log('img', ev, imgIdx)
  const currImg = setImg(imgIdx)
  const img = new Image()
  console.log('img', currImg)
  img.src = currImg.imgUrl
  renderImg(img)
}

function onImgInput(ev) {
  loadImage(ev, renderImg)
}

function renderImg(img) {
  console.log('img', img)
  onOpenRandomMeme()
  const gElCanvas = document.querySelector('canvas')
  const gCtx = gElCanvas.getContext('2d')
  gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function loadImage(ev, onImageReady) {
  const reader = new FileReader()

  reader.onload = function (event) {
    const img = new Image()
    img.onload = () => {
      onImageReady(img)
    }
    img.src = event.target.result
  }
  reader.readAsDataURL(ev.target.files[0])
}
