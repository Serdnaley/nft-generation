require('dotenv').config()
const Jimp = require('jimp')

const { layerTypes } = require('./enums')
const { traits } = require('./traits')

const createLayer = async (layerType, trait) => {
  const layerJimp = await Jimp.read(trait.filePath)

  return {
    layerType,
    trait,
    layerJimp,
  }
}

const getRandomTrait = (layerType = null) => {
  const scope = traits.filter((trait) => layerType === null || trait.layerType === layerType)

  return scope[Math.floor(Math.random() * scope.length)]
}

const build = async (index) => {
  const layersPriority = [
    layerTypes.BACKGROUND,
    layerTypes.BODY,
    layerTypes.OUTFIT,
    layerTypes.HEAD,
    layerTypes.NOSE,
    layerTypes.MOUTH,
    layerTypes.EYES,
    layerTypes.SUNGLASSES,
    layerTypes.HEADWEAR,
  ]

  let result
  let layers = []

  for (const layerType of layersPriority) {
    const trait = getRandomTrait(layerType)
    const layer = await createLayer(layerType, trait)

    layers.push(layer)
    result = result ? await result.composite(layer.layerJimp, 0, 0) : layer.layerJimp
  }

  const name = layers.map((layer) => layer.trait.name).join('_')

  await result.write(`out/${index}.png`)

  return {
    name,
  }
}

module.exports = {
  build,
}
