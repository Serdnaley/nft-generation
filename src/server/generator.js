const path = require('path')
const Jimp = require('jimp')
const { filterTypes } = require('../enums')

const outPath = path.join(__dirname, '../../out')

const createLayer = async (layerType, trait, filters) => {
  console.log(`Creating ${layerType} layer with trait ${trait.fileName}`)
  const layerJimp = await Jimp.read(path.resolve(__dirname, '../traits', trait.filePath))

  console.log(1, filters)

  filters = filters.filter(filter => filter?.type)
  filters = filters.map(({ type, amount, degree, color }) => {
    let params

    if ([filterTypes.MIX].includes(type)) params = [color, amount]
    if ([filterTypes.XOR].includes(type)) params = [color]

    if ([
      filterTypes.LIGHTEN,
      filterTypes.BRIGHTEN,
      filterTypes.DARKEN,
      filterTypes.DESATURATE,
      filterTypes.SATURATE,
      filterTypes.GREYSCALE,
      filterTypes.TINT,
      filterTypes.SHADE,
      filterTypes.RED,
      filterTypes.GREEN,
      filterTypes.BLUE,
    ].includes(type)) params = [color]

    if ([
      filterTypes.SPIN,
      filterTypes.HUE,
    ].includes(type)) params = [degree]

    return { apply: type.toLowerCase(), params }
  })

  console.log(2, filters)

  layerJimp.color(filters)

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

  for (const { trait, layerType, filters } of layers) {
    const layer = await createLayer(layerType, trait, filters)

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
