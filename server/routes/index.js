const elastic = require("../elasticsearch-module")
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' })
})

router.post('/adddocument', (req, res, next) => {
  console.log("ADD_DOC")
  res.send(elastic.addDocument(req, 'entities'))
})

router.post('/suggest', (req, res, next) => {
  console.log("SEARCH")
    elastic.getSuggestions(req.body, "entities").then((Response => {
      res.send(Response)
    }))
})


module.exports = router;
