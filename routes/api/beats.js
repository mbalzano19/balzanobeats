const express = require('express')
const router = express.Router()
const beatsCtrl = require('../../controllers/api/beats')

router.get('/', beatsCtrl.index)

router.get('/:id', beatsCtrl.show)

router.post('/new', beatsCtrl.create)

module.exports = router