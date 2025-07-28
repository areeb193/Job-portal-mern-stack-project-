import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from './ui/badge'


const AppliedJobTable = () => {
  return (
    <div>
        <Table>
            <TableCaption>List of applied jobs</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    
                    <TableHead>Job Role</TableHead>
                    
                    <TableHead>Company</TableHead>
                    
                    <TableHead className='text-right'>Date</TableHead>
                    </TableRow>
            </TableHeader>
            <TableBody>
                {
                    [1,2,3,4].map((item,index)=>(
                        <TableRow>
                            <TableCell className='font-semibold'>12/10/2023</TableCell>
                            <TableCell className='font-semibold'>Full Stack Developer</TableCell>
                            <TableCell className='font-semibold'>Tech Company</TableCell>
                            <TableCell className='text-right'><Badge>Selected</Badge></TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    </div>
  )
  
}

export default AppliedJobTable