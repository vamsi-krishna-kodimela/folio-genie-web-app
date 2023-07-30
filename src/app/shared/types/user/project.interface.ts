export interface Project {
  _id: string;
  userId: string;
  title: string;
  startDate: string;
  endDate: string;
  projectLink?: string;
  description: string;
  technologies: any[];
  isPresent: boolean;
  isVisible: boolean;
  __v: number;
}

