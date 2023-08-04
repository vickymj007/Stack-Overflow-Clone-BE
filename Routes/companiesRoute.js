import express from 'express'
import { getCompanies, addCompany } from '../Controllers/companiesController.js';

const router = express.Router()


router.get('/',getCompanies)
router.post('/',addCompany)

export const companiesRouter = router;