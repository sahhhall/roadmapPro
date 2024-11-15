
export interface ProfileData {
  name: string;
  userId?: {
    name: string;
    email: string;
    avatar: string;
  };
  email?: string;
  avatar?: string;
  headline?: string;
  bio?: string;
  expirience?: string;
  languages: string[];
  assessedSkills: string[];
}

export interface FormDataa {
  name: string;
  headline: string;
  bio: string;
  expirience: string;
}

export interface FormErrors {
  headline: string;
  expirience: string;
  bio: string;
}
