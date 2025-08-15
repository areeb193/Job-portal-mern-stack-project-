import React, { useEffect, useState } from "react";
import {
  Table,
  TableCaption,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Edit2, MoreHorizontal } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector((store) => store.company);
  const [filterCompany , setfilterCompany] = useState(Array.isArray(companies) ? companies : []);
  const navigate = useNavigate();
  useEffect(()=>{
    if (!Array.isArray(companies)) {
      setfilterCompany([]);
      return;
    }
    const text = (searchCompanyByText || '').toLowerCase();
    const filteredCompany = companies.filter((company)=>{
      if (!text) return true;
      return company?.name?.toLowerCase().includes(text);
    });
    setfilterCompany(filteredCompany);
  },[companies,searchCompanyByText])
  return (
    <div>
      <Table>
        <TableCaption>A List of your companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead> logo</TableHead>
            <TableHead> Name</TableHead>
            <TableHead> Date</TableHead>
            <TableHead className="text-right"> Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!companies || companies.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                You have not registered any company yet
              </TableCell>
            </TableRow>
      ) : (
            <>
        {(filterCompany || []).map((company) => {
                return (
                  <TableRow key={company._id}>
                    <TableCell>
                      <Avatar>
                        <AvatarImage src={company.logo} />
                      </Avatar>
                    </TableCell>
                    <TableCell>{company.name}</TableCell>
                    <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                    <TableCell className="text-right ">
                      <Popover>
                        <PopoverTrigger className="cursor-pointer">
                          <MoreHorizontal />
                        </PopoverTrigger>
                        <PopoverContent className="w-32">
                          <div onClick={()=> navigate(`/admin/companies/${company._id}`)} className="flex items-center gap-2 w-fit ">
                            <Edit2 className="w-4 " />
                            <span>Edit</span>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                );
              })}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
