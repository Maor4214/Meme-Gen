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
        <img onclick="onSetImg(${img.id})" src="${img.imgUrl}" alt="${img.keywords[0]}">`
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

function renderImg(currImg) {
  gMeme.selectedImgId = currImg.id
  const img = new Image()
  // console.log('img', currImg)
  img.src = currImg.imgUrl
  // console.log('img.src', img.src)
  onOpenMeme()
  gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function onSetImg(imgIdx, txt) {
  // console.log('img', imgIdx)
  const currImg = setImg(imgIdx)
  resizeCanvas()
  createMemeLine(txt)
  renderImg(currImg)
  drawText()
}

function onImgInput(ev) {
  createMemeLine()
  loadImage(ev, renderImgFromUser)
  setTimeout(() => {
    drawText()
  }, 30)
}

function loadImage(ev, onImageReady) {
  const reader = new FileReader()

  reader.onload = function (event) {
    const img = new Image()
    img.onload = () => {
      onImageReady(img)
    }
    img.src = event.target.result
    gImgs.push(_createImg(img.src, 'funny', true))
    const imgIdx = gImgs.length - 1
    gMeme.selectedImgId = gImgs[imgIdx].id
  }
  reader.readAsDataURL(ev.target.files[0])
}

function renderImgFromUser(img) {
  // console.log('img', img)
  onOpenMeme()
  gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}
