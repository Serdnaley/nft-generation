const app = require('express')()
const { buildImage } = require('./generator')

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

app.get('/image.png', async (req, res) => {
  const layersStr = req.query.layers || '[]'

  let layers = []
  try {
    layers = JSON.parse(layersStr)
  } catch (e) {
    console.error(e)
    return res.status(400).send('Invalid layers')
  }

  const { filePath, fileName } = await buildImage(layers).catch((e) => {
    console.error(e)
    return res.status(500).send('Error generating image')
  })

  await sleep(1000)

  return filePath && res.type('png').attachment(fileName).sendFile(filePath)
})

app.listen(3000, () => {
  console.log('Server listening on port 3000!')
})
