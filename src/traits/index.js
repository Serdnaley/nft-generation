const { flatMap, keys, uniqBy } = require('lodash')
const {
  rarityTypes,
  layerTypes,
} = require('./enums')

const prefixByLayerType = {
  [layerTypes.BACKGROUND]: 'Background',
  [layerTypes.BODY]: 'Body',
  [layerTypes.HEAD]: 'Head',
  [layerTypes.OUTFIT]: 'Outfit',
  [layerTypes.NOSE]: 'Nose',
  [layerTypes.MOUTH]: 'Mouth',
  [layerTypes.EYES]: 'Eyes',
  [layerTypes.SUNGLASSES]: 'Sunglasses',
  [layerTypes.HEADWEAR]: 'Headwear',
}

const traitsConfig = {
  [layerTypes.BACKGROUND]: {
    [rarityTypes.COMMON]: ['Lava', 'Forest'],
    [rarityTypes.UNCOMMON]: ['Mountain', 'Aqua'],
    [rarityTypes.RARE]: ['Psycho', 'Snow'],
    [rarityTypes.LEGENDARY]: ['Galaxy'],
  },
  [layerTypes.BODY]: {
    [rarityTypes.COMMON]: ['Normal'],
    [rarityTypes.UNCOMMON]: ['Normal'],
    [rarityTypes.RARE]: ['Alien', 'Zombie'],
    [rarityTypes.LEGENDARY]: ['Gold'],
  },
  [layerTypes.HEAD]: {
    [rarityTypes.COMMON]: ['Normal'],
    [rarityTypes.UNCOMMON]: ['Normal'],
    [rarityTypes.RARE]: ['Alien', 'Zombie'],
    [rarityTypes.LEGENDARY]: ['Gold'],
  },
  [layerTypes.OUTFIT]: {
    [rarityTypes.COMMON]: ['Gap', 'Hoodie', 'Tanktop', 'Lumberjack'],
    [rarityTypes.UNCOMMON]: ['Shirt_with_holes'],
    [rarityTypes.RARE]: ['Blue_Jacket', 'Red_Jacket'],
    [rarityTypes.LEGENDARY]: ['Pink_Hoodie'],
  },
  [layerTypes.NOSE]: {
    [rarityTypes.COMMON]: ['Common'],
    [rarityTypes.UNCOMMON]: ['Common'],
    [rarityTypes.RARE]: ['Common',],
    [rarityTypes.LEGENDARY]: ['Common',],
  },
  [layerTypes.MOUTH]: {
    [rarityTypes.COMMON]: ['Happy', 'Surprise', 'Serious'],
    [rarityTypes.UNCOMMON]: ['Full_Beard', 'Moustache'],
    [rarityTypes.RARE]: ['Lips', 'Twisted'],
    [rarityTypes.LEGENDARY]: ['Lock_Beard'],
  },
  [layerTypes.EYES]: {
    [rarityTypes.COMMON]: ['Chill', 'Angry'],
    [rarityTypes.UNCOMMON]: ['Surprise'],
    [rarityTypes.RARE]: ['Shame',],
    [rarityTypes.LEGENDARY]: ['Focus',],
  },
  [layerTypes.SUNGLASSES]: {
    [rarityTypes.COMMON]: ['Empty'],
    [rarityTypes.UNCOMMON]: ['Empty', 'Pirate_Patch'],
    [rarityTypes.RARE]: ['Cateyes', 'Aviator'],
    [rarityTypes.LEGENDARY]: ['Thug_Sunglasses'],
  },
  [layerTypes.HEADWEAR]: {
    [rarityTypes.COMMON]: ['Empty'],
    [rarityTypes.UNCOMMON]: ['Empty', 'Blue_Bandana', 'Red_Bandana', 'Sailor', 'Purple_Hat', 'Wizard', 'Cowboy'],
    [rarityTypes.RARE]: ['Purple_Punk', 'Pink_Punk', 'Bowler', 'Backwards_Camo'],
    [rarityTypes.LEGENDARY]: ['Leaves', 'Rasta'],
  },
}

let traits = flatMap(keys(traitsConfig), (layerType) => {
  return flatMap(keys(traitsConfig[layerType]), (rarityType) => {
    return traitsConfig[layerType][rarityType].map((name) => {
      const prefix = prefixByLayerType[layerType]
      const fileName = `${prefix}_${name}.png`

      return {
        layerType,
        rarityType,
        name,
        prefix,
        fileName,
        filePath: [prefix, fileName].join('/'),
      }
    })
  })
})

traits = uniqBy(traits, 'filePath')

module.exports = {
  traitsConfig,
  traits,
}
