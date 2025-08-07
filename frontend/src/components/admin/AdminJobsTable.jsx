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
import { Edit2, MoreHorizontal } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import store from "../../redux/store";
import useGetAllAdminJobs from "../../hooks/useGetAllAdminJobs";
const AdminJobsTable = () => {
  // Fetch admin jobs
  useGetAllAdminJobs();
  
  const { companies, searchCompanyByText } = useSelector((store) => store.company);
  const {allAdminJobs , searchJobByText} = useSelector(store => store.job)
  const [filterjobs , setfilterjobs] =useState(allAdminJobs || []);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(()=>{
    setIsLoading(false);
    if (!allAdminJobs || allAdminJobs.length === 0) {
      setfilterjobs([]);
      return;
    }
    
    const filteredJobs = allAdminJobs.filter((job)=>{
      if(!searchJobByText){
        return true
      };
      return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase()) ;
    });
    setfilterjobs(filteredJobs);
  },[allAdminJobs,searchJobByText])
  return (
    <div>
      <Table>
        <TableCaption>A List of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead> Company Name</TableHead>
            <TableHead> Role</TableHead>
            <TableHead> Date</TableHead>
            <TableHead className="text-right"> Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                Loading jobs...
              </TableCell>
            </TableRow>
          ) : !filterjobs || filterjobs.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No jobs found
              </TableCell>
            </TableRow>
          ) : (
            <>
              {filterjobs.map((job) => {
                return (
                  <TableRow key={job._id}>
                    <TableCell>{job?.company?.name || 'N/A'}</TableCell>
                    <TableCell>{job?.title || 'N/A'}</TableCell>
                    <TableCell>{job?.createdAt ? job.createdAt.split("T")[0] : 'N/A'}</TableCell>
                    <TableCell className="text-right ">
                      <Popover>
                        <PopoverTrigger className="cursor-pointer">
                          <MoreHorizontal />
                        </PopoverTrigger>
                        <PopoverContent className="w-32">
                          <div onClick={()=> navigate(`/admin/jobs/${job._id}`)} className="flex items-center gap-2 w-fit ">
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

export default AdminJobsTable;
