'use strict'

function onInit() {
  renderGallery()
  //remmber to add a hidden class to the other sections!!
}

function renderGallery() {
  const imgs = gImgs
  const elGallery = document.querySelector('.main-gallery')
  const strHtmls = imgs.map(
    (img) => `
        <img src="${img.imgUrl}" alt="${img.keywords[0]}">`
  )
  elGallery.innerHTML = strHtmls.join('')
}
