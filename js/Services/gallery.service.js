'use strict'

let gImgs = []
let gIdCount = 0
createImgs()

function createImgs() {
  gImgs = [
    createImg('imgs/1.jpg', ['funny', 'person']),
    createImg('imgs/2.jpg', ['cute', 'pets']),
    createImg('imgs/3.jpg', ['cute', 'chill']),
    createImg('imgs/4.jpg', ['cute', 'sleepy']),
    createImg('imgs/5.jpg', ['cute', 'kids']),
    createImg('imgs/6.jpg', ['funny']),
    createImg('imgs/7.jpg', ['cute', 'kids']),
    createImg('imgs/8.jpg', ['funny']),
    createImg('imgs/9.jpg', ['funny', 'kids']),
    createImg('imgs/10.jpg', ['funny', 'person']),
    createImg('imgs/11.jpg', ['bros before hoes']),
    createImg('imgs/12.jpg', ['funny']),
  ]
}

function createImg(imgUrl, keywords, uploadImg = false) {
  gIdCount++
  return {
    id: gIdCount,
    imgUrl,
    keywords,
    uploadImg,
  }
}

function setImg(imgId) {
  const imgIdx = gImgs.find((img) => img.id === imgId)
  return imgIdx
}
