import Job from "@/types/Job"
import NewWindowIcon from "@/assets/icons/newwindowicon.svg"

import Image from "next/image";

interface JobPostingModalProps {
  job: Job;
}

export default function JobPostingModal({job}: JobPostingModalProps) {

  //JobTitle
  //JobLocation
  //JobStatus
  //Hours
  //SalaryMin
  //SalaryMax
  //JobSummary
  //EducationExperience
  //SkillRequirements

  //general look would be...
  //top div is dark blue background, serving as a header
  //bottom div is the actual contents itself, in relatively simple text.

  return (
    <div className="flex flex-col">
      <div className="grow bg-headercolor text-white font-bold flex items-center justify-between">
        <h1 className="pl-4">{job.JobTitle}</h1>
        <div className="flex items-center ml-auto">
          <a href={`/jobs/${job.JobID}`}>
            <Image src={NewWindowIcon} alt="Open in New Tab" height={20} />
          </a>
          <button className="ml-3 mb-1 bg-secondary hover:bg-black py-1 px-2 rounded-md">
              Apply to Job
          </button>
        </div>
      </div>
      <div className="grow px-4 py-2">
        <div>
          <h2 className="text-2xl font-bold">
            Position Summary
          </h2>
          <p>
            {job.JobSummary}
          </p>
        </div>
        <div className="my-2">
          <h3 className="text-xl font-semibold text-headercolor">Salary</h3>
          <p>${job.SalaryMin} - ${job.SalaryMax} Annually</p>
        </div>
        <div className="my-2">
          <h3 className="text-xl font-semibold text-headercolor">Education & Experience</h3>
          <ul>
            {job.EducationExperience.map((education) => (
              <li key={education}>{education}</li>
            ))}
          </ul>
        </div>
        <div className="my-2">
          <h3 className="text-xl font-semibold text-headercolor">Knowledge, Skills and Abilities</h3>
          <ul>
            {job.SkillRequirements.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}