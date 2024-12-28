'use strict'

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
let gIsMovingText = false
let gCLickOnTxt = false

function onOpenMeme() {
  document.querySelector('.main-meme-gen').classList.remove('hidden')
  document.querySelector('.main-saved').classList.add('hidden')
  document.querySelector('.main-gallery').classList.add('hidden')
}

function onRandomizeMeme() {
  if (gUserOnPhone) onToggleMenu()
  RandomizeMeme()
  onOpenMeme()
}

function onChangeTxt(text) {
  // const gElCanvas = document.querySelector('canvas')
  gEditLines[gSelectedLineIdx].txt = text
  renderMeme(gMeme.selectedImgId)
  // drawText(gMeme.lines[0].txt, gElCanvas.width / 2, gElCanvas.height / 4)
}

function onChangeFontSize(num) {
  console.log('changing size', num)
  gEditLines[gSelectedLineIdx].size += num
  drawText
  renderMeme(gMeme.selectedImgId)
}

function onSetColor(color) {
  gEditLines[gSelectedLineIdx].color = color
  renderMeme(gMeme.selectedImgId)
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousedown', onDown)
  gElCanvas.addEventListener('mousemove', onMove)
  gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchstart', onDown)
  gElCanvas.addEventListener('touchmove', onMove)
  gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
  ev.preventDefault()
  const rect = gElCanvas.getBoundingClientRect()

  const clientX = isTouchEvent(ev) ? ev.touches[0].clientX : ev.clientX
  const clientY = isTouchEvent(ev) ? ev.touches[0].clientY : ev.clientY

  const clickX = clientX - rect.left
  const clickY = clientY - rect.top

  const textHeight = 20
  const clickedLine = isClickedLine(clickX, clickY, textHeight)

  if (!clickedLine) return

  console.log('gSelectedLineIdx', gSelectedLineIdx)
  const lineIdx = getLineById(clickedLine.id)
  gSelectedLineIdx = lineIdx.id

  console.log('gSelectedLineIdx', gSelectedLineIdx)
  gIsMovingText = true
  gElCanvas.style.cursor = 'grabbing'
}

function isClickedLine(clickX, clickY, textHeight) {
  const clickedLine = gMeme.lines.filter(({ txt, x, y }) => {
    const textWidth = gCtx.measureText(txt).width

    return (
      clickX >= x - textWidth / 2 &&
      clickX <= x + textWidth &&
      clickY >= y - textHeight &&
      clickY <= y
    )
  })
  return clickedLine[0]
}

function onMove(ev) {
  if (!gIsMovingText) return

  const offsetX = isTouchEvent(ev)
    ? ev.touches[0].clientX - gElCanvas.getBoundingClientRect().left
    : ev.offsetX
  const offsetY = isTouchEvent(ev)
    ? ev.touches[0].clientY - gElCanvas.getBoundingClientRect().top
    : ev.offsetY

  gMeme.lines[gSelectedLineIdx].x = offsetX
  gMeme.lines[gSelectedLineIdx].y = offsetY

  renderMeme(gMeme.selectedImgId)
}
function onUp() {
  gIsMovingText = false
  gElCanvas.style.cursor = 'default'
}

function onDownload(elLink) {
  const dataUrl = gElCanvas.toDataURL()
  // console.log('dataUrl', dataUrl)

  elLink.href = dataUrl
  // console.log('elLink.href', elLink.href)

  elLink.download = 'BEST MEME EVER'
}

function onUploadImg(ev) {
  ev.preventDefault()
  const canvasData = gElCanvas.toDataURL('image/jpeg')

  function onSuccess(uploadedImgUrl) {
    const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
    const elModal = document.querySelector('.modal')
    elModal.innerHTML = `
        <p>Your Link is Ready!</p>
        <p>Image url: <a href="${uploadedImgUrl}">${uploadedImgUrl}</a> </p>
        <button class="btn-facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}')">
           Share on Facebook  
        </button>
         <button class="btn-whatsapp" target="_blank" onclick="window.open('https://api.whatsapp.com/send?text=${encodedUploadedImgUrl}')">
           Share on WhatsApp  
        </button>
        <button class="close-btn"  onclick="onCloseModal()">X</button>`
    elModal.showModal()
  }
  uploadImg(canvasData, onSuccess)
}

function onCloseModal() {
  const elModal = document.querySelector('.modal')
  elModal.close()
}

function onChangeAlign(align) {
  switch (align) {
    case 'right':
      gEditLines[gSelectedLineIdx].align = 'right'
      break
    case 'center':
      gEditLines[gSelectedLineIdx].align = 'center'
      break
    case 'left':
      gEditLines[gSelectedLineIdx].align = 'left'
  }
  renderMeme(gMeme.selectedImgId)
}

function onChangeFont(font) {
  gEditLines[gSelectedLineIdx].font = font
  renderMeme(gMeme.selectedImgId)
}

function onAddLine() {
  console.log('adding line')
  addLine()
}

function onRemoveLine() {
  console.log('removing line')
  deleteLine()
}

function isTouchEvent(ev) {
  return TOUCH_EVS.includes(ev.type)
}

function onSaveToStorage() {
  saveMemeToStorage()
}

function onOpenSavedMemes() {
  const savedMemes = loadSavedMemes()
  document.querySelector('.main-meme-gen').classList.add('hidden')
  document.querySelector('.main-saved').classList.remove('hidden')
  document.querySelector('.main-gallery').classList.add('hidden')
  if (!savedMemes[0]) renderMsg()
  else renderSavedMemes()
}

function renderMsg() {
  const elModal = document.querySelector('.modal')
  elModal.innerHTML = `
      <p>You havent saved memes yet, create some funny memes to save and find them here!</p>
       <button class="close-btn"  onclick="onCloseModal()">X</button>
       <button  onclick="openGallery()">Click here to move to Gallery</button>`
  elModal.showModal()
}

function renderSavedMemes() {
  const savedMemes = loadSavedMemes()
  const memes = savedMemes
  const elSavedMemes = document.querySelector('.saved-memes')
  const strHtmls = memes.map(
    (meme) => `
          <img onclick="onSetImg(${meme.id})" src="${meme.image}">`
  )
  elSavedMemes.innerHTML = strHtmls.join('')
}

function openGallery() {
  onCloseModal()
  onOpenGallery()
}
