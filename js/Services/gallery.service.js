'use strict'

let gImgs = []
let gIdCount = 0
_createImgs()

function _createImgs() {
  gImgs = [
    _createImg('imgs/1.jpg', ['funny', 'person']),
    _createImg('imgs/2.jpg', ['cute', 'pets']),
    _createImg('imgs/3.jpg', ['cute', 'chill']),
    _createImg('imgs/4.jpg', ['cute', 'sleepy']),
    _createImg('imgs/5.jpg', ['cute', 'kids']),
    _createImg('imgs/6.jpg', ['funny']),
    _createImg('imgs/7.jpg', ['cute', 'kids']),
    _createImg('imgs/8.jpg', ['funny']),
    _createImg('imgs/9.jpg', ['funny', 'kids']),
    _createImg('imgs/10.jpg', ['funny', 'person']),
    _createImg('imgs/11.jpg', ['bros before hoes']),
    _createImg('imgs/12.jpg', ['funny']),
  ]
}

function _createImg(imgUrl, keywords) {
  gIdCount++
  return {
    id: gIdCount,
    imgUrl,
    keywords,
  }
}

function setImg(imgId) {
  const imgIdx = gImgs.find((img) => img.id === imgId)
  return imgIdx
}
