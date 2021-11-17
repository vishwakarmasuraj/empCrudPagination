const { employeeModel } = require('../models');
const { successHandler, errorHandler } = require('../helper/responseHandler');
const constants = require('../constant/allConstant');
const bcrypt = require('bcrypt');

const addEmployee = async (req, res) => {
    try {
        console.log(req.body)
        req.body.password = await bcrypt.hash(req.body.password, constants.ROUND)
        const emp = await new employeeModel(req.body)
        await emp.save()
        successHandler(res, constants.EMP_CREATE_MSG)
    } catch (error) {
        return errorHandler(res, constants.ERR_MSG)
    }
}

module.exports = { addEmployee }
