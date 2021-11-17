const express = require('express')
const router = express.Router()

router.use('/employee', require('./employeeRouter'))

module.exports = router