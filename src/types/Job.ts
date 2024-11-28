export default interface Job {
  JobTitle: string;
  JobID: string;
  PostedDate: Date;
  InterviewLocation: string;
  JobLocation: string;
  Department: string;
  Hours: "Full-Time" | "Part-Time";
  JobStatus: "Regular" | "Temporary";
  SalaryMin: number;
  SalaryMax: number;
  JobSummary: string;
  EducationExperience: string[];
  SkillRequirements: string[];
}