import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
const filterData=[
 {
        filterType: "Location",
        array: ["lahore", "Multan", "Okara", "Karachi", "Islamabad", "Faisalabad", "Sialkot", "Gujranwala", "Peshawar"]
    },
    {
        filterType: "Industry",
        array: ["Frontend", "Backend", "Fullstack"]
    },
    {
        filterType: "Salary",
        array: ["0-10k", "10k-20k", "20k-30k", "30k-40k", "40k-50k", "50k-60k", "60k-70k", "70k-80k", "80k-90k", "90k-100k"]
    }
]
const FilterCard = () => {
  return (
    <div className="bg-white rounded-lg shadow p-4 w-[180px] min-w-[140px]">
      <h1 className="text-lg font-semibold">Filter Jobs</h1>
      <hr className='mt-3'/>
      <RadioGroup>
        {
          filterData.map((data, index) => (
            <div key={index} className="mt-4">
              <h1 className="">{data.filterType}</h1>
              {
                data.array.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 mb-1">
                    <RadioGroupItem value={item} id={`${data.filterType}-${item}`} />
                    <Label htmlFor={`${data.filterType}-${item}`}>{item}</Label>
                  </div>
                ))
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCard