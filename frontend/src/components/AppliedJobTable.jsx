import React, { useCallback, useMemo, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector } from 'react-redux';
import ChatButton from './chat/ChatButton';
import { Phone, Mail, ChevronDown } from 'lucide-react';
import api from '../utils/axiosConfig';

const AppliedJobTable = () => {
  const { allAppliedJobs = [] } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);
  // UI state for filter pills (visual only, no data change)
  const [activeFilter, setActiveFilter] = useState('All');
  const sortedLabel = useMemo(() => 'Newest', []);

  // Helpers for unread badge (student side)
  const fetchUnreadCount = useCallback(async ({ applicationId }) => {
    if (!applicationId || !user?._id) return 0;
    try {
      const res = await api.get(`/api/v1/chat/chats/application/${applicationId}`);
      const chat = res.data?.chat;
      if (!chat) return 0;
      const me = user._id;
      if (chat?.student?._id === me) return chat?.unreadCount?.student ?? 0;
      if (chat?.recruiter?._id === me) return chat?.unreadCount?.recruiter ?? 0;
      return 0;
    } catch {
      return 0;
    }
  }, [user?._id]);

  const markSeen = useCallback(async ({ applicationId }) => {
    if (!applicationId || !user?._id) return;
    try {
      const res = await api.get(`/api/v1/chat/chats/application/${applicationId}`);
      const chat = res.data?.chat;
      if (!chat?._id) return;
      await api.put(`/api/v1/chat/chats/${chat._id}/read`);
    } catch {
      /* ignore */
    }
  }, [user?._id]);

  // Build filtered and sorted lists (functional pills)
  const filteredJobs = useMemo(() => {
    const target = (activeFilter || 'All').toLowerCase();
    if (target === 'all') return allAppliedJobs || [];
    return (allAppliedJobs || []).filter((job) => {
      const base = (job?.status || '').toLowerCase();
      if (target === 'pending') return base === 'applied';
      
      if (target === 'interviewed') return base === 'interviewed';
      if (target === 'rejected') return base === 'rejected';
      if (target === 'candidate') return base === 'offered';
      return true;
    });
  }, [allAppliedJobs, activeFilter]);

  const sortedJobs = useMemo(() => {
    return [...filteredJobs].sort((a, b) => {
      const ta = a?.createdAt ? new Date(a.createdAt).getTime() : 0;
      const tb = b?.createdAt ? new Date(b.createdAt).getTime() : 0;
      return tb - ta; // newest first
    });
  }, [filteredJobs]);

  // Map backend statuses to the new visual scheme
  const getStatusMeta = (status) => {
    const s = (status || '').toLowerCase();
    switch (s) {
      case 'applied':
        return { label: 'Pending', className: 'bg-gray-100 text-gray-800' };
      case 'interviewed':
        return { label: 'Interviewed', className: 'bg-orange-100 text-orange-800' };
      case 'offered':
        return { label: 'Candidate', className: 'bg-green-100 text-green-800' };
      case 'rejected':
        return { label: 'Rejected', className: 'bg-red-100 text-red-800' };
      default:
        return { label: 'Pending', className: 'bg-gray-100 text-gray-800' };
    }
  };

  const totalCount = allAppliedJobs?.length || 0;

  return (
    <div className="space-y-4">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Applications</h2>
          <p className="text-sm text-gray-500">Total: {totalCount}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {['All', 'Pending', 'Interviewed', 'Rejected','Candidate'].map((pill) => (
            <button
              key={pill}
              onClick={() => setActiveFilter(pill)}
              className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                activeFilter === pill
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {pill}
            </button>
          ))}
          <div className="ml-auto md:ml-0">
            <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border text-sm bg-white">
              <span>Sort:</span>
              <span className="font-medium">{sortedLabel}</span>
              <ChevronDown size={16} className="text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
              </TableHead>
              
              <TableHead>Date & Time</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Job Type</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead className="text-right">Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedJobs.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} className="text-center text-sm text-gray-500 py-6">
                  No applications found.
                </TableCell>
              </TableRow>
            )}
            {sortedJobs.map((appliedJob) => {
              
              const dateTime = appliedJob?.createdAt
                ? new Date(appliedJob.createdAt).toLocaleString()
                : 'N/A';
              const companyName = appliedJob?.job?.company?.name || 'N/A';
              const companyCategory = appliedJob?.job?.company?.category || appliedJob?.job?.company?.industry || 'Company';
              const jobType = appliedJob?.job?.type || appliedJob?.job?.employmentType || 'Full-time';
              const position = appliedJob?.job?.title || 'N/A';
              const statusMeta = getStatusMeta(appliedJob?.status);

              return (
                <TableRow key={appliedJob._id} className="hover:bg-gray-50/80">
                  <TableCell>
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                  </TableCell>
                  
                  <TableCell className="text-gray-600">{dateTime}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 text-xs font-semibold">
                        {companyName?.charAt(0) || 'C'}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">{companyName}</div>
                        <div className="text-xs text-gray-500">{companyCategory}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-700">{jobType}</TableCell>
                  <TableCell className="text-gray-700">{position}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-gray-600 justify-start">
                      <button className="p-1.5 rounded-md border bg-white hover:bg-gray-50" title="Phone">
                        <Phone size={16} />
                      </button>
                      <button className="p-1.5 rounded-md border bg-white hover:bg-gray-50" title="Email">
                        <Mail size={16} />
                      </button>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusMeta.className}`}>
                      {statusMeta.label}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <ChatButton
                      applicationId={appliedJob._id}
                      chatPartner={appliedJob.job?.company?.recruiter}
                      jobTitle={appliedJob.job?.title}
                      variant="text"
                      className="text-sm"
                      userId={user?._id}
                      role={user?.role}
                      pollInterval={0}
                      fetchUnreadCount={fetchUnreadCount}
                      markSeen={markSeen}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 p-3 border-t bg-white">
          <button className="px-3 py-1.5 text-sm rounded-lg border bg-white hover:bg-gray-50">Previous</button>
          <button className="px-3 py-1.5 text-sm rounded-lg border bg-gray-900 text-white">1</button>
          <button className="px-3 py-1.5 text-sm rounded-lg border bg-white hover:bg-gray-50">2</button>
          <button className="px-3 py-1.5 text-sm rounded-lg border bg-white hover:bg-gray-50">Next</button>
        </div>
      </div>
    </div>
  );
};

export default AppliedJobTable;
