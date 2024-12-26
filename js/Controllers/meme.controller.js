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

// function onClickCanvas(ev) {
//   const rect = gElCanvas.getBoundingClientRect()
//   const clickX = ev.clientX - rect.left
//   const clickY = ev.clientY - rect.top
//   const textHeight = 20
//   const test = isClickedLine(clickX, clickY, textHeight)
//   if (test) gIsMovingText = true
//   console.log('hello')
//   drawFrame(textHeight, textWidth, x, y, textHeight, textWidth)
// }

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

function onDown(ev) {
  const rect = gElCanvas.getBoundingClientRect()
  const clickX = ev.clientX - rect.left
  const clickY = ev.clientY - rect.top
  const textHeight = 20
  const clickedLine = isClickedLine(clickX, clickY, textHeight)
  if (!clickedLine) return
  console.log('gSelectedLineIdx', gSelectedLineIdx)
  const lineIdx = getLineById(clickedLine.id)
  gSelectedLineIdx = lineIdx.id
  console.log('gSelectedLineIdx', gSelectedLineIdx)
  gIsMovingText = true
  gElCanvas.style.cursor = 'grabbing'
  drawFrame(clickedLine)
}

function onMove(ev) {
  if (!gIsMovingText) return
  gMeme.lines[gSelectedLineIdx].x = ev.offsetX
  gMeme.lines[gSelectedLineIdx].y = ev.offsetY
  renderMeme(gMeme.selectedImgId)
}

function onUp() {
  gIsMovingText = false
  gElCanvas.style.cursor = 'default'
}

// function onDrawNewTxt() {
//   Draw
// }

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
        <button class="close-btn"  onclick="onCloseModal()">X</button>`
    elModal.showModal()
  }
  uploadImg(canvasData, onSuccess)
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
// function getEvPos(ev) {
//   let pos = {
//     x: ev.offsetX,
//     y: ev.offsetY,
//   }

//   if (TOUCH_EVS.includes(ev.type)) {
//     ev.preventDefault()

//     ev = ev.changedTouches[0]

//     pos = {
//       x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
//       y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
//     }
//   }
//   return pos
// }
