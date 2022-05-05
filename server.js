const express = require('express');
const { Options } = require('./config.js');
const db = require('./database/index.js')
const axios = require('axios');
const app = express();
const port = 3000;

// Serving static files
app.use(express.static('client/dist'));
app.use(express.json());


// axios.get("https://search.patentsview.org/api/v1/patent/10117072/", {headers: Options})
// .then((res) => {
//   console.log(res.data)
// })
app.post("/patents", (request, response) => {
  console.log(request.body.search)
  const { search } = request.body;
  let resObj = {}
  axios.get(`https://api.patentsview.org/patents/query?q={"_text_any":{"patent_abstract":"${search}"}}`)
  .then((res)=>{
    response.send(res.data);
  })
  .catch((err) => {
    console.error(err);
  })
})

app.post("/save", (req, res) => {
  db.save(req.body)
  .then(()=>{
    res.send('added')
  })
  .catch((err)=>{
    console.error(err);
  })

})

app.get('/saved', (req, res)=>{
  db.getSaved()
  .then((data)=>{
    res.send(data)
  })
  .catch((err)=>{
    console.error(err)
  })
})

// Connecting on the port
app.listen(port, (req, res) => {
  console.log(`Listening on port ${port}`);
});