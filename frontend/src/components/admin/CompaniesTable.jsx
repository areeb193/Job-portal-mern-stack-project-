import React from "react";
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
const CompaniesTable = () => {
  const { companies } = useSelector((store) => store.company);
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
              {companies.map((company) => {
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
                          <div className="flex items-center gap-2 w-fit ">
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
