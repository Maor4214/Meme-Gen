'use strict'

function saveMeme() {
  let savedMemes = JSON.parse(localStorage.getItem('savedMemes')) || []

  const memeImage = gElCanvas.toDataURL('image/png')

  const memeToSave = { ...gMeme, image: memeImage }

  savedMemes.push(memeToSave)

  localStorage.setItem('savedMemes', JSON.stringify(savedMemes))
}

function loadSavedMemes() {
  const savedMemes = JSON.parse(localStorage.getItem('savedMemes')) || []
  return savedMemes
}
