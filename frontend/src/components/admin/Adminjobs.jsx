import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "../../hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setsearchCompanyByText } from "../../redux/companySlice";
import { useState } from "react";
import AdminJobsTable from "./AdminJobsTable";
const Adminjobs = () => {
  const navigate = useNavigate();
  
  const [input , setinput] = useState("");
  const dispatch = useDispatch();
  useEffect(()=>{
         dispatch(setsearchCompanyByText(input));
  },[input])
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input className="w-fit" placeholder="Filter by name "v
           onChange={(e) => setinput(e.target.value)}
           />
          <Button onClick={() => navigate("/admin/companies/create")}>
            New jobs
          </Button>
        </div>
        <AdminJobsTable/>
      </div>
    </div>
  );
};

export default Adminjobs;
