const express = require('express')
const request = require('request-promise')

const app = express()
const port = 8080

app.use('/api/images/:keyword?', async (req, res) =>{
   // api call to third party
   const thirdPartyURL = ''
   const msg = {}
   request({
     method: 'GET',
     json: true,
     uri: thirdPartyURL,
     body: msg
   }).then(response => {
     // response, pass back to front end
     res.send('24234')
   })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
