'use strict'

let gImgs = []
let gIdCount = 0
_createImgs()

function _createImgs() {
  gImgs = [
    _createImg('imgs/1.jpg', ['funny', 'person']),
    _createImg('imgs/2.jpg', ['cute, pets']),
  ]
}

function _createImg(img, keywords) {
  gIdCount++
  return {
    id: gIdCount,
    img,
    keywords,
  }
}
