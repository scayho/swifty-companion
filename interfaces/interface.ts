export interface UserImage {
    link: string;
  }
  
  export interface Skill {
    name: string;
    level: number;
  }
  
  export interface Cursus {
    slug: string;
  }
  
  export interface CursusUser {
    cursus_id: number;
    cursus: Cursus;
    level: number;
    skills: Skill[];
  }
  
  export interface Project {
    name: string;
  }
  
  export interface ProjectUser {
    final_mark: number | null;
    "validated?": boolean;
    project: Project;
    cursus_ids: number[];
  }
  
  export interface CursusSectionProps {
    cursus: CursusUser;
    cursusProjects: ProjectUser[];
  }

  export interface User {
    email: string;
    login: string;
    displayname: string;
    phone: string;
    location: string | null;
    kind: string;
    image: UserImage;
    correction_point: number;
    wallet: number;
    cursus_users: CursusUser[];
    projects_users: ProjectUser[];
  }