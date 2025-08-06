import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosConfig";
import { COMPANY_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../../redux/companySlice";
import { Loader2 } from "lucide-react";

const CompanyCreate = () => {
  const navigate = useNavigate();
  
  const dispatch = useDispatch();
  const [companyName , setCompanyName] = useState();
  const [loading, setLoading] = useState(false);
  const registerNewCompany = async ()=>{
    if (!companyName || companyName.trim() === '') {
      toast.error("Please enter a company name");
      return;
    }
    setLoading(true);
    try {
      const res =await axiosInstance.post(`${COMPANY_API_END_POINT}/register`,{companyName: companyName.trim()});
      if (res?.data?.success){
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyID = res?.data?.company?._id;
        navigate (`/admin/companies/${companyID}`);
      }
      
    } catch (error) {
      console.log (error)
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="text-2xl font-bold"> Company Name</h1>
          <p className="text-gray-500">
            What would you like to give your company name ? you can change this
            later
          </p>
        </div>
        <Label> Comapny name </Label>
        <Input type="text" className="my-2" placeholder="Jobhunt" onChange={(e)=> setCompanyName(e.target.value)}/>
        <div className="flex items-center gap-2 my-10">
          <Button variant="outline" onClick={() => navigate("/admin/companies")}>
            Cancel
          </Button>
          <Button onClick={registerNewCompany} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Continue"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
