const elastic = require("../elasticsearch-module")
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' })
})

router.post('/addvalue', (req, res, next) => {
  console.log(req)
  console.log("ADD_DOC")
  res.send(elastic.addValue(req))
})

router.post('/initindex', (req, res, next) => {
  console.log("ADD_TYPE")
  console.log(req.body)
  elastic.initIndex(req.body.text).then((Response) => {
    res.send("OK")
  })

})

router.get('/getindices', (req, res, next) => {
  console.log("GET_INDICES")
  elastic.getIndices().then((Response, error) => {
    res.send(Response)
  })
})

router.post('/suggest', (req, res, next) => {
  console.log("SEARCH")
  elastic.getSuggestions(req.body.text, req.body.typeName).then((Response , error)=> {
    res.send(Response)
    error?console.log(error):null

  })
})


module.exports = router;
