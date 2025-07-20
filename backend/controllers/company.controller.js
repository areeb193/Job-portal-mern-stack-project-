import {Company} from '../models/company.model.js';
export const  registerCompany = async (req, res) => {
    try {
        const { companyName, website, description, location } = req.body;
        if (!companyName || !website || !description) {
            return res.status(400).json({message: 'Company name, website, and description are required', success: false});
        }
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({message: 'Company already exists', success: false});
        }
        company = await Company.create({
            name: companyName,
            website,
            description,
            location,
            userId: req.id
        });
        return res.status(201).json({message: 'Company registered successfully', success: true, company});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Server error', success: false});
    }
};

export const getCompany = async (req, res) => {
   try {
    const userId = req.id;
    const companies = await Company.find({userId});
    if (!companies) {
        return res.status(404).json({message: 'No companies found', success: false});
    }
    return res.status(200).json({message: 'Companies retrieved successfully', success: true, companies});
   } catch (error) {
    console.log(error);
    return res.status(500).json({message: 'Server error', success: false});
   }

};

export const getCompanyById = async (req, res) => {
   try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
        return res.status(404).json({message: 'Company not found', success: false});
    }
    return res.status(200).json({message: 'Company retrieved successfully', success: true, company});
   } catch (error) {
    console.log(error);
    return res.status(500).json({message: 'Server error', success: false});
   }
};

export const updateCompany = async (req, res) => {
    try {
        const companyId = req.params.id;
        const {name, description, website, location, logo} = req.body;
        const file = req.file;
        const updateData= {name, description, website, location};
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, {new: true});

        if (!company) {
            return res.status(404).json({message: 'Company not found', success: false});
        }
        
        return res.status(200).json({message: 'Company updated successfully', success: true, company});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Server error', success: false});
    }
}
