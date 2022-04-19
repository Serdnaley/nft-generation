const Generator = require('./generator')

const init = async () => {
  for (let i = 0; i < 100; i++) {
    try {
      console.log(`Generating NFT ${i}`)
      const { name } = await Generator.build(i)
      console.log(`NFT ${i} generated with layers ${name}`)
    } catch (e) {
      console.error(`Error while generating NFT ${i}`)
      console.error(e)
    }
  }
}

init()
