"use client"

import { useState, useEffect } from "react";

import Filters from "@/types/Filters";
import Job from "@/types/Job";

import jobs from "@/data/jobs.json"

import Header from "../components/common/header";
import NavBar from "@/components/common/navbar";
import Filter from "@/components/searchfilters";
import JobListing from "@/components/joblisting";

export default function Home() {

  const jobList: Job[] = JSON.parse(JSON.stringify(jobs));

  jobList.forEach(job => {
    job.PostedDate = new Date(job.PostedDate);
  });

  jobList.sort((a, b) => b.PostedDate.getTime() - a.PostedDate.getTime());

  const [filters, setFilters] = useState<Filters>({
    locations: [],
    departments: [],
    years: [],
    months: [],
    minimumSalary: 0,
  })

  const updateFilters = (newFilters: Filters) => {
    setFilters((prevFilters) => ({...prevFilters, ...newFilters}))
    console.log(filters)
  }

  const [filteredJobList, setFilteredJobList] = useState(jobList);
  const [isMobileFilterVisible, setMobileFilterVisible] = useState(false);
  
  useEffect(() => {
    const newFilteredJobList = jobList.filter(job => {
      const matchesLocation = filters.locations.length === 0 || filters.locations.includes(job.JobLocation);
      const matchesDepartment = filters.departments.length === 0 || filters.departments.includes(job.Department);
      const matchesSalary = job.SalaryMin >= filters.minimumSalary;
  
      return matchesLocation && matchesDepartment && matchesSalary;
    });
  
    setFilteredJobList(newFilteredJobList);
  }, [filters]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setMobileFilterVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize)
    };
  }, []);

  return (
    <>
      <Header />
      <NavBar content="Search Jobs"/>
      <div className="flex flex-row h-screen md:w-11/12 md:m-auto">
        <div className="inline-flex flex-col">
          <div className="sticky top-0 hidden sm:block">
            <Filter filters={filters} onFilterChange={updateFilters} />
          </div>
        </div>
        {isMobileFilterVisible && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg w-5/6 h-5/6 max-w-md overflow-y-scroll">
              <button
                  className="absolute top-8 right-6 bg-red-500 text-white p-2 rounded-full"
                  onClick={() => setMobileFilterVisible(false)}
              >
                X
              </button>
              <Filter filters={filters} onFilterChange={updateFilters} />
            </div>
          </div>
        )}
        <div className="w-full">
            <div className="flex justify-end h-0 sticky top-14 inline-block sm:hidden z-10">
              <button
                className="bg-secondary text-white font-semibold p-2 hover:bg-black relative -translate-y-11"
                onClick={() => setMobileFilterVisible(true)}  
              >
                Show Filters
              </button>
            </div>
          <JobListing jobList={filteredJobList} />
        </div>
      </div>
    </>
  );
}
