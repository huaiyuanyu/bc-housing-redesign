import Job from "@/types/Job";

import { useState, useEffect } from "react";

import JobPostingModal from "./jobpostingmodal";

interface JobListingProps {
  jobList: Job[];
}

export default function JobListing({jobList}: JobListingProps) {

  //next step would be to add:
  //the ability to actually have filters do hijinks
  //a modal that pops up to the side, which gives detailed job information

  jobList.sort((a, b) => b.PostedDate.getTime() - a.PostedDate.getTime());

  const [currentJob, setCurrentJob] = useState(jobList[0] || null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateWindowSize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);

    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  const handleJobClick = (clickedJob: Job) => {
    if (window.innerWidth >= 640) {
      setCurrentJob(clickedJob);
    }
  }

  return (
    <div className="mt-2 w-full">

      <div className="border-b-2 border-slate-500 sticky top-0 bg-white z-10 pb-1 pl-1">
        {jobList.length} jobs found.
      </div>

      <div className="flex w-full h-screen">
        <div className="w-full md:w-1/2 h-5/6 overflow-y-scroll border-r border-gray-300">
          {jobList.map((job) => (
            <div 
              key={job.JobID}
              className={`
                pl-4 border-b-2 border-black cursor-pointer hover:bg-gray-300
                ${job.JobID === currentJob.JobID && !isMobile ? 'bg-gray-300' : ''}
                sm:${job.JobID === currentJob.JobID ? 'bg-gray-300' : ''}
              `}
              onClick={() => handleJobClick(job)}
            >
              <a 
                href={`/jobs/${job.JobID}`}
                className="sm:pointer-events-none"
              >
                <div className="font-bold">
                  {job.JobTitle}
                </div>
                <div className="pl-4">
                  <span className="text-headercolor font-semibold">Job ID</span> {job.JobID}
                </div>
                <div className="pl-4">
                  <span className="text-headercolor font-semibold">Location</span> {job.JobLocation}
                </div>
                <div className="pl-4">
                  <span className="text-headercolor font-semibold">Department</span> {job.Department}
                </div>
                <div className="pl-4">
                  <span className="text-headercolor font-semibold">Posted Date</span> {new Date(job.PostedDate).toLocaleDateString()}
                </div>
              </a>
            </div>
          ))}
        </div>
        <div className="w-1/2 sticky top-0 hidden sm:block">
          <JobPostingModal job={currentJob} />
        </div>
      </div>
    </div>
  )

}