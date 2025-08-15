import {Company} from '../models/company.model.js';
import cloudinary from '../utils/cloudinary.js';
import getDataUri from '../utils/datauri.js';
export const  registerCompany = async (req, res) => {
    try {
        const { companyName, website, description, location } = req.body;
        if (!companyName) {
            return res.status(400).json({message: 'Company name is required', success: false});
        }
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({message: 'Company already exists', success: false});
        }
        company = await Company.create({
            name: companyName,
            website: website || '',
            description: description || '',
            location: location || '',
            userId: req.id
        });
        return res.status(201).json({message: 'Company registered successfully', success: true, company});
    } catch (error) {
        console.error(error);
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
     console.error(error);
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
    console.error(error);
    return res.status(500).json({message: 'Server error', success: false});
   }
};

export const updateCompany = async (req, res) => {
    try {
        const companyId = req.params.id;
        const {name, description, website, location} = req.body;
        
        let updateData = {name, description, website, location};
        
        // Only upload file if it exists
        if (req.file) {
            try {
                const fileUri = getDataUri(req.file);
                const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
                updateData.logo = cloudResponse.secure_url;
            } catch (uploadError) {
                console.error('File upload error:', uploadError);
                return res.status(400).json({message: 'File upload failed', success: false});
            }
        }

        const company = await Company.findByIdAndUpdate(companyId, updateData, {new: true});

        if (!company) {
            return res.status(404).json({message: 'Company not found', success: false});
        }
        
        return res.status(200).json({message: 'Company updated successfully', success: true, company});
    } catch (error) {
        console.error('Update company error:', error);
        return res.status(500).json({message: 'Server error', success: false});
    }
}
