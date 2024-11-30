import Job from "@/types/Job"
import jobs from "@/data/jobs.json"

interface JobPostingPageProps {
  job: Job;
}

export default function JobPostingPage({job}: JobPostingPageProps) {

  const jobList: Job[] = JSON.parse(JSON.stringify(jobs));

  jobList.forEach(job => {
    job.PostedDate = new Date(job.PostedDate);
  });

  jobList.sort((a, b) => b.PostedDate.getTime() - a.PostedDate.getTime());

  const currentJobIndex = jobList.findIndex((j) => j.JobID === job.JobID);

  let prevJob: Job | undefined;
  let nextJob: Job | undefined;

  if(jobList[currentJobIndex - 1]){
    prevJob = jobList[currentJobIndex - 1];
  }

  if(jobList[currentJobIndex + 1]){
    nextJob = jobList[currentJobIndex + 1];
  }

  return (
    <>
      <div className="flex flex-col mb-10 ">
        <div className="grow bg-gray-300 sticky top-0">
          <div className="md:w-11/12 md:m-auto p-2 font-bold flex items-center justify-between ">
            {prevJob ? (
              <a href={`/jobs/${prevJob.JobID}`}>
                <button className="text-xs sm:text-lg">
                  &lt; Previous Job
                </button>
              </a>
            ) : (
              <button className="mx-3 text-gray-300" disabled>
                Previous Job
              </button>
            )}
            <h1 className="absolute text-center left-1/2 transform -translate-x-1/2">
              {job.JobTitle}
            </h1>
            <div>
              <button className="bg-secondary text-white font-semibold p-2 mr-2 rounded-md hover:bg-black hidden sm:inline-block">
                Apply for Job
              </button>
              {nextJob ? (
                <a href={`/jobs/${nextJob.JobID}`}>
                  <button className="text-xs sm:text-lg">
                    Next Job &gt;
                  </button>
                </a>
              ) : (
                <button className="mx-3 text-gray-300" disabled>
                  Next Job
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col m-auto w-11/12">
          <div className="p-4">
            <div className="fixed bottom-4 right-4 inline-block sm:hidden">
              <button className="bg-secondary text-white font-semibold p-2 rounded-md hover:bg-black ">
                Apply for Job
              </button>
            </div>
            <div className="my-2">
              <h2 className="text-4xl font-bold">
                Position Summary
              </h2>
              <p className="md:text-center font-bold">
                To be considered for this role, applications MUST be submitted online, by clicking on the &#39;Apply&#39; button above.
              </p>
              <ul className="list-disc py-4 pl-10">
                <li>Join one of BC&#39;s Top Employers!</li>
                <li>Be part of an exceptional company culture with great employee benefits and a healthy work/life balance!</li>
              </ul>
              <p className="font-semibold text-red-500">
                BC Housing thanks all applications for their interest; only those selected for an interview will be contacted. This position is only open to those legally entitled to work in Canada.
              </p>
            </div>
            <div className="my-2">
              <h3 className="text-xl font-semibold text-headercolor">THE ORGANIZATION</h3>
              <p className="py-2">
                BC Housing is a provincial Crown Corporation that develops, manages and administers a wide range of subsidized housing options for those most in need across the province to address critical gaps across the housing continuum ranging from emergency shelter through to rent assistance in the private market and affordable home ownership. <span className="italic">Share in the rewards of working with an organization that offers challenging work and competitive compensation and supports the growth and development of its people.</span>
              </p>
              <p className="pb-2">
                <span className="font-bold">Our mission</span> is to provide access to safe, quality, accessible, and affordable housing options. We do this to promote strong, inclusive communities where people can thrive. 
              </p>
              <p className="pb-2">
                BC Housing offers competitive salaries and an excellent benefits package. But a job is more than a pay cheque. We also offer our staff the opportunity to work together to make a difference. When employees go home at the end of the day, they experience the satisfaction of knowing they&#39;ve helped provide safe, affordable housing for British Columbians.  And while they&#39;re here, employees can take advantage of many opportunities:
              </p>
              <ul className="list-disc py-4 pl-10">
                <li>
                  In-house training, and training at other institutions, for courses related to employees’ current positions or to prepare them for advancement within BC Housing.
                </li>
                <li>
                  Wellness programs including physical fitness, programs to help employees quit smoking, free flu shots, mental health resources, and lunch-and-learn lectures and seminars.
                </li>
                <li>
                  Recognition programs including long-term service awards, idea recognition and outstanding performance awards.
                </li>
                <li>
                  Livegreen incentives include an employee transit pass program, and other initiatives that encourage alternative, sustainable transportation (even a bike purchase program!).
                </li>
                <li>
                  An active Social Club that organizes special events like seasonal parties and arranges group discounts to other events.
                </li>
                <li>
                  Participation in community and charitable events.
                </li>
              </ul>
              <p className="italic">
                ** Please note: Eligibility for benefits offered is based on employment status **
              </p>
            </div>
            <div className="my-2">
              <h3 className="text-xl font-semibold text-headercolor">SALARY</h3>
              <p className="py-2">${job.SalaryMin} - ${job.SalaryMax} Annually</p>
            </div>
            <div className="my-2">
              <h3 className="text-xl font-semibold text-headercolor">JOB SUMMARY</h3>
              <ul className="py-1 pl-10">
                <li>
                  <span className="font-semibold">Job ID:</span> {job.JobID}
                </li>
                <li>
                <span className="font-semibold">Department:</span> {job.Department}
                </li>
                <li>
                  <span className="font-semibold">{job.JobStatus} {job.Hours}</span>
                </li>
                <li>
                <span className="font-semibold">Location:</span> {job.JobLocation}
                </li>
              </ul>
              <p className="py-1">{job.JobSummary}</p>
            </div>
            <h2 className="text-4xl font-bold mb-2">
                CANDIDATE PROFILE
            </h2>
            <p>
              The successful candidate will have the following:
            </p>
            <div className="my-2">
              <h3 className="text-xl font-semibold text-headercolor">EDUCATION & EXPERIENCE</h3>
              <ul className="list-disc py-4 pl-10">
                {job.EducationExperience.map((education) => (
                  <li key={education}>{education}</li>
                ))}
              </ul>
            </div>
            <div className="my-2">
              <h3 className="text-xl font-semibold text-headercolor">KNOWLEDGE, SKILLS, AND ABILITIES</h3>
              <ul className="list-disc py-4 pl-10">
                {job.SkillRequirements.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
            <h2 className="text-4xl font-bold">
                HOW TO APPLY:
            </h2>
            <p className="py-2">
              Please review the attached job description for a complete list of duties, qualifications and competencies. To be considered for this competition, applicants must submit a cover letter and resume clearly identifying how they meet the qualifications necessary for this position. This information will be used as part of the selection process.
            </p>
            <p className="pb-2 text-center font-semibold text-red-500">
              Your cover letter and resume should be submitted as one document in your profile when applying for this position. Please add your cover letter to your resume and submit both documents as your resume.
            </p>
            <p className="pb-2 text-center font-semibold text-blue-700">
              Please review the Job Description prior to applying.
            </p>
            <p className="pb-2">
              As part of the application process, you will be prompted to fill out a questionnaire which must be completed in order for your application to be considered. Please allot up to 5 minutes to fill it out after submitting your resume and cover letter as one single document.
            </p>
            <p className="pb-2 font-semibold">
              Only applications submitted using the Online Recruitment System at <a href="https://www.bchousing.org/careers" className="text-blue-700">www.bchousing.org/careers</a> will be accepted
            </p>
            <p className="pb-2">
              If you are passionate about what you do and want to use your expertise to engage in meaningful and challenging work, please apply to join our team today at <a href="https://www.bchousing.org/careers" className="text-blue-700">www.bchousing.org/careers.</a>
            </p>
            <p className="pb-2">
              At BC Housing, we&#39;re committed to providing a healthy, safe and inclusive workplace where respect and diversity are recognized assets. We invite and welcome applications from women, visible minorities, Indigenous People, People with Disabilities, people of all sexual orientations and gender identities, and all people committed to meaningful work that makes a difference.  We are committed to providing an inclusive and barrier-free work environment, starting with the hiring process. If you require accommodations at any point during the application and hiring process, please contact <a href="mailto:hr_admin@bchousing.org" className="text-blue-700">hr_admin@bchousing.org.</a>
            </p>
            <p className="pb-2">
              We didn&#39;t become one of BC&#39;s Top Employers and one of Canada&#39;s Greenest Employers without a lot of thought, care and consideration for our team and environment. Our supportive and collaborative workplace balances engaging and challenging work with personal development and wellness initiatives.
            </p>
            <p className="pb-2">
              Indigenous candidates are welcome to connect with an Indigenous team member in our organization to discuss the recruitment process and our workplace, please contact <a href="mailto:hr_admin@bchousing.org" className="text-blue-700">hr_admin@bchousing.org</a> to arrange a call.
            </p>
            <p className="pb-2 font-semibold">
              Have questions/issues about the application process? Please see our <a href="https://www.bchousing.org/publications/ERecruit-FAQ.pdf" className="text-blue-700">FAQ&#39;s</a> for some useful information.
            </p>
          </div>
        </div>
      </div>
    </>
  )

}