import { Companies } from "../Model/companyModel.js"

export const getCompanies = async (req,res)=>{
    try {
        const companies = await Companies.find()
        res.status(200).json(companies)
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
}
export const addCompany = async (req,res)=>{
    try {
        const company = await Companies.create(req.body)
        res.status(200).json(company)
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
}