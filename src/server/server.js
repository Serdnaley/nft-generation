const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { buildImage } = require('./generator')

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const app = express()

app.use(bodyParser())
app.use(cors())

app.post('/image', async (req, res) => {
  console.log(req.body)
  const layers = req.body.layers || []

  const { filePath, fileName } = await buildImage(layers)
    .catch((error) => {
      console.error(error)
      res.status(500).send('Error generating image')
      throw error
    })

  await sleep(100)

  return res.json({ filePath, fileName })
})

app.use('/output', express.static(path.resolve(__dirname, '../../out')))

app.listen(3000, () => {
  console.log('Server listening on port 3000!')
})
