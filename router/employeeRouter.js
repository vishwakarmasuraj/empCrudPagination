const express = require('express')
const router = express.Router()

const { empValidRule, valid } = require('../middleware')
const { employeeController } = require('../controller')

router.post('/create-employee', empValidRule.empValidationRule(), valid.validate, employeeController.addEmployee)
router.get('/get-employee', employeeController.getEmployee)
router.put('/update-employee/:id', employeeController.updateEmployee)
router.delete('/delete-employee/:id', employeeController.delEmployee)

/**
 *  pagination
 */

router.get('/search-record', employeeController.getEmpBySearching)

module.exports = router