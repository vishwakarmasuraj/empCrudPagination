const { employeeModel } = require('../models');
const { successHandler, errorHandler } = require('../helper/responseHandler');
const constants = require('../constant/allConstant');
const bcrypt = require('bcrypt');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
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

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getEmployee = async (req, res) => {
    try {
        const result = await employeeModel.find({}).select('-password');
        successHandler(res, result)
    } catch (error) {
        return errorHandler(res, constants.ERR_MSG)
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getEmpBySearching = async (req, res) => {
    try {
        let { search = '' } = req.query
        const result = await employeeModel.find({
            $or: [
                { $or: [{ name: { $regex: `${ search }`, $options: 'i' } }] },
                { $or: [{ email: { $regex: `${ search }`, $options: 'i' } }] },
                { $or: [{ designation: { $regex: `${ search }`, $options: 'i' } }] },
                { $or: [{ address: { $regex: `${ search }`, $options: 'i' } }] }
            ]
        }).select('-password')
        successHandler(res, constants.SUCCESS_SEARCHING_MSG, result)
    } catch (error) {
        return errorHandler(res, constants.ERR_MSG)
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const updateEmployee = async (req, res) => {
    try {
        const id = req.params.id
        const result = await employeeModel.findByIdAndUpdate({ _id: id }, { $set: req.body })
        successHandler(res, constants.EMP_UPDATE_MSG, result)
    } catch (error) {
        return errorHandler(res, constants.ERR_MSG)
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const delEmployee = async (req, res) => {
    try {
        const id = req.params.id
        const result = await employeeModel.findByIdAndRemove({ _id: id })
        successHandler(res, constants.EMP_DEL_MSG, result)
    } catch (error) {
        return errorHandler(res, constants.ERR_MSG)
    }
}
module.exports = { addEmployee, getEmployee, updateEmployee, delEmployee, getEmpBySearching }
