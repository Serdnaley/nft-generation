const path = require('path')
const Jimp = require('jimp')

const outPath = path.join(__dirname, '../../out')

const createLayer = async (layerType, trait) => {
  console.log(`Creating ${layerType} layer with trait ${trait.fileName}`)
  const layerJimp = await Jimp.read(path.resolve(__dirname, '../traits', trait.filePath))

  return {
    layerType,
    trait,
    layerJimp,
  }
}

const buildImage = async (layers) => {
  layers = layers.filter(layer => !!layer.trait)
  const fileName = `${Date.now()}.png`

  let result = await Jimp.create(2048, 2048)

  for (const { trait, layerType } of layers) {
    const layer = await createLayer(layerType, trait)

    result = await result.composite(layer.layerJimp, 0, 0)
  }

  const filePath = path.resolve(outPath, fileName)

  await result.write(filePath)

  return {
    filePath,
    fileName,
    layers,
  }
}

module.exports = {
  createLayer,
  buildImage,
}
