"use client"

import { useParams } from "next/navigation";

import Job from "@/types/Job";

import Header from "@/components/common/header";
import NavBar from "@/components/common/navbar";
import JobPostingPage from "@/components/jobpostingpage";

import jobs from "@/data/jobs.json"

export default function JobPage() {
  const params = useParams();
  const { jobid } = params;

  const jobList: Job[] = JSON.parse(JSON.stringify(jobs));

  jobList.forEach(job => {
    job.PostedDate = new Date(job.PostedDate);
  });

  jobList.sort((a, b) => b.PostedDate.getTime() - a.PostedDate.getTime());


  const selectedJob = jobList.find((job) => job.JobID === jobid);

  return (
    <>
      <Header />
      <NavBar content="Job Posting"/>
      {
        selectedJob ? <JobPostingPage job={selectedJob} /> : <h1>No Job Found</h1>
      }
    </>
  )
}