import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
  const { allAppliedJobs = [] } = useSelector(store => store.job);

  // Handle case where allAppliedJobs is undefined or null
  if (!allAppliedJobs || allAppliedJobs.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">You haven't applied to any jobs yet</p>
      </div>
    );
  }

  // Function to get status color classes
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'applied':
        return 'bg-blue-100 text-blue-800';
      case 'interviewed':
        return 'bg-yellow-100 text-yellow-800';
      case 'offered':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>List of applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Applied Date</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead className='text-right'>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.map((appliedJob) => (
            <TableRow key={appliedJob._id}>
              <TableCell className='font-semibold'>
                {appliedJob?.createdAt ? new Date(appliedJob.createdAt).toLocaleDateString() : 'N/A'}
              </TableCell>
              <TableCell className='font-semibold'>{appliedJob.job?.company?.name || 'N/A'}</TableCell>
              <TableCell className='font-semibold'>{appliedJob.job?.title || 'N/A'}</TableCell>
              <TableCell className='text-right'>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appliedJob.status)}`}>
                  {appliedJob.status || 'applied'}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
