import Filters from "@/types/Filters";
import Job from "@/types/Job"
import jobs from "@/data/jobs.json"

import { useState } from "react";

interface FilterProps {
  filters: Filters;
  onFilterChange: (updatedFilters: Filters) => void;
}

const countLocations = (jobs: Job[]) => {

  const locations: string[] = [];
  const counts: number[] = [];

  jobs.forEach((job) => {
    if(locations.includes(job.JobLocation)) {
      const position = locations.indexOf(job.JobLocation);
      counts[position] = counts[position] + 1;
    } else {
      locations.push(job.JobLocation);
      counts.push(1);
    }
  })

  const combinedArray = locations.map((value, index) => ({
    location: value,
    count: counts[index]
  }))

  combinedArray.sort((a, b) => b.count - a.count);

  return combinedArray

}

const countDepartment = (jobs: Job[]) => {

  const departments: string[] = [];
  const counts: number[] = [];

  jobs.forEach((job) => {
    if(departments.includes(job.Department)) {
      const position = departments.indexOf(job.Department);
      counts[position] = counts[position] + 1;
    } else {
      departments.push(job.Department);
      counts.push(1);
    }
  })

  const combinedArray = departments.map((value, index) => ({
    department: value,
    count: counts[index]
  }))

  combinedArray.sort((a, b) => b.count - a.count);

  return combinedArray

}


export default function Filter({filters, onFilterChange}: FilterProps) {

  //Job Location
  //Job Posted Date
  //Job Department
  //Job Minimum Salary

  const [salaryMin, setSalaryMin] = useState<number>(filters.minimumSalary ? Number(filters.minimumSalary) : 0);;

  const jobList = JSON.parse(JSON.stringify(jobs));

  const listOfLocationsFromJobsListed = countLocations(jobList)
  const listOfDepartmentsFromJobsListed = countDepartment(jobList)

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setSalaryMin(value);
    onFilterChange({...filters, minimumSalary: value})
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, filterType: "locations" | "departments") => {
    const value = event.target.value;
    const newFilterList = filters[filterType];

    if(event.target.checked) {
      onFilterChange({...filters, [filterType]: [...newFilterList, value]});
    } else {
      onFilterChange({...filters, [filterType]: newFilterList.filter((item) => item !== value)});
    }

  }

  return (
    <div>
      <div className="m-2 px-2 max-h-50 w-64 overflow-y-auto border-2 border-gray-400">
        <div className="text-xl text-amber-700 sticky top-0 bg-white z-10">
          Job Location
        </div>
        <div>
          {listOfLocationsFromJobsListed.map((location) => (
            <div key={location.location} className="flex flex-row">
              <label className="flex items-center">
                <div className="mr-2">
                  <input
                    type="checkbox"
                    value={location.location}
                    checked={filters.locations.includes(location.location)}
                    onChange={(e) => handleCheckboxChange(e, "locations")}
                  />
                </div>
                <div>
                  {location.location} ({location.count})
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="m-2 px-2 max-h-50 w-64 overflow-y-auto border-2 border-gray-400">
        <div className="text-xl text-amber-700 sticky top-0 bg-white z-10">
          Department
        </div>
        <div>
          {listOfDepartmentsFromJobsListed.map((department) => (
            <div key={department.department}>
              <label className="flex items-center">
              <div className="mr-2">
                <input
                  type="checkbox"
                  value={department.department}
                  checked={filters.departments.includes(department.department)}
                  onChange={(e) => handleCheckboxChange(e, "departments")}
                />
              </div>
              <div>
                {department.department} ({department.count})
              </div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="m-2 px-2 max-h-50 w-64 overflow-y-auto border-2 border-gray-400">
        <div className="text-xl text-amber-700 sticky top-0 bg-white z-10">
          Minimum Salary
        </div>
        <div>
          ${salaryMin}
        </div>
        <div>
          <input
            type="range"
            id="salarymin"
            name="salarymin"
            min="0"
            max="200000"
            value={salaryMin}
            onChange={handleRangeChange}
          />
        </div>
      </div>
    </div>
  )

}