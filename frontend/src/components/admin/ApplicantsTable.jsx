import React, { useState } from "react";
import {
  Table,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { APPLICATION_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import axios from "axios";
import { setApplications } from "../../redux/applicationSlice";

const shortlistingStatus = ["applied", "interviewed", "offered", "rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((state) => state.application);
  const dispatch = useDispatch();
  const [openPopover, setOpenPopover] = useState(null);

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );
      
      if (res.data.success) {
        toast.success(res.data.message);
        
        // Update the local state to reflect the status change
        const updatedApplicants = applicants.map(applicant => 
          applicant._id === id 
            ? { ...applicant, status: status }
            : applicant
        );
        
        dispatch(setApplications(updatedApplicants));
        setOpenPopover(null); // Close the popover
      }
    } catch (error) {
      console.error("Status update error:", error);
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  console.log("Applicants data:", applicants); // Debug log to see actual data structure

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent allied users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants.map((item) => {
              console.log("Individual item:", item); // Debug individual item
              const resumeUrl = item?.applicant?.profile?.resume?.[0] || null;
              const resumeName = item?.applicant?.profile?.resumeOriginalName?.[0] || "View Resume";
              
              return (
                <TableRow key={item._id}>
                  <TableCell>{item?.applicant?.fullname}</TableCell>
                  <TableCell>{item?.applicant?.email}</TableCell>
                  <TableCell>{item?.applicant?.phoneNumber || "N/A"}</TableCell>
                  <TableCell className="text-blue-600">
                    {resumeUrl ? (
                      <a
                        href={`https://docs.google.com/viewer?url=${encodeURIComponent(resumeUrl)}&embedded=true`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline cursor-pointer"
                      >
                        {resumeName}
                      </a>
                    ) : (
                      "No Resume"
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(item?.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === 'applied' ? 'bg-blue-100 text-blue-800' :
                      item.status === 'interviewed' ? 'bg-yellow-100 text-yellow-800' :
                      item.status === 'offered' ? 'bg-green-100 text-green-800' :
                      item.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.status || 'applied'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right cursor-pointer">
                    <Popover open={openPopover === item._id} onOpenChange={(open) => setOpenPopover(open ? item._id : null)}>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent>
                        {shortlistingStatus.map((status, index) => (
                          <div 
                            onClick={() => statusHandler(status, item._id)} 
                            key={index} 
                            className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                          >
                            <span className="capitalize">{status}</span>
                          </div>
                        ))}
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
