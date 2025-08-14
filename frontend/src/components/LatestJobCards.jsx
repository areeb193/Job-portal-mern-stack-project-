import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";



const LatestJobCards = ({ job }) => {

const navigate = useNavigate();
  return (
    <div onClick={()=>navigate(`/description/${job._id}`)}  className="p-5 rounded-xl shadow-lg bg-white border border-gray-100 cursor-pointer hover:shadow-xl hover:-translate-y-0.5 hover:scale-[1.01] transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#6A38C2]/10 to-[#F83002]/10 ring-1 ring-black/5 flex items-center justify-center text-sm font-semibold text-[#6A38C2]">
            {(job?.company?.name || 'I')[0]}
          </div>
          <div>
            <h1 className="text-lg font-bold">{job?.company?.name}</h1>
            <p className="text-gray-500 text-xs">Pakistan</p>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <h1 className="text-base font-semibold">{job?.title}</h1>
        <p className="text-gray-600 text-sm line-clamp-3">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4 flex-wrap">
        <Badge className="bg-blue-50 text-blue-700 border border-blue-100" variant="secondary">
          {job?.positions} Position
        </Badge>
        <Badge className="bg-orange-50 text-[#F83002] border border-orange-100" variant="secondary">
          {job?.jobType}
        </Badge>
        <Badge className="bg-purple-50 text-[#7209b7] border border-purple-100" variant="secondary">
          {job?.salary} lpa
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
