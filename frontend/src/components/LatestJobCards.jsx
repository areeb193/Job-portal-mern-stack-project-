import React from "react";
import { Badge } from "./ui/badge";
const LatestJobCards = ({ job }) => {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold">{job?.company?.name}</h1>
          <p className="text-gray-500 text-sm">Pakistan</p>
        </div>
      </div>
      <div>
        <h1 className="text-base font-semibold">{job?.title}</h1>
        <p className="text-gray-600">{job?.description}</p>
      </div>
      <div className="flex item-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.positions} Position
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          {job?.jobtype}
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">
          {job?.salary} lpa
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
