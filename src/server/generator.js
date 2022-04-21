const path = require('path')
const Jimp = require('jimp')
const { filterTypes } = require('../enums')
const { traits } = require('../traits')

const outPath = path.join(__dirname, '../../out')

const jimpByTraitPath = {}

const getTraitFilePath = (trait) => path.resolve(__dirname, '../traits', trait.filePath)

for (const trait of traits) {
  const filePath = getTraitFilePath(trait)

  jimpByTraitPath[filePath] = Jimp.read(filePath)
}

const getTraitJimp = async (trait) => (await jimpByTraitPath[getTraitFilePath(trait)]).clone()

const createLayer = async (layerType, trait) => {
  console.log(`Creating ${layerType} layer with trait ${trait.fileName}`)
  const layerJimp = await getTraitJimp(trait)

  return {
    layerType,
    trait,
    layerJimp,
  }
}

const applyFilters = async (layerJimp, filters) => {
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

  filters.length && layerJimp.color(filters)
}

const buildImage = async (layers) => {
  console.log('--------------------------------------------------')
  console.time('Total time spent')

  layers = layers.filter(layer => !!layer.trait)
  const fileName = `${Date.now()}.png`

  let result = await Jimp.create(2048, 2048)

  for (const { trait, layerType, filters } of layers) {
    console.time('Create layer')
    const { layerJimp } = await createLayer(layerType, trait, filters)
    console.timeEnd('Create layer')

    console.time('Apply filters')
    await applyFilters(layerJimp, filters)
    console.timeEnd('Apply filters')

    console.time('Composite')
    result = await result.blit(layerJimp, 0, 0)
    console.timeEnd('Composite')
  }

  const filePath = path.resolve(outPath, fileName)

  console.time('Write result')
  await result.write(filePath)
  console.timeEnd('Write result')

  console.timeEnd('Total time spent')
  console.log('--------------------------------------------------')

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
