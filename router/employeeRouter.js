const express = require('express')
const router = express.Router()

const { empValidRule, valid } = require('../middleware')
const { employeeController } = require('../controller')

router.post('/create-employee', empValidRule.empValidationRule(), valid.validate, employeeController.addEmployee)

module.exports = router