import express from 'express'

import dialogflowHandler from './dialogflow-handler'

const app = express()
const port = 3000 // default port to listen

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/', dialogflowHandler)

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})
