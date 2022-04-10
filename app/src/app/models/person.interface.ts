import { Gender } from "./gender.enum";

export interface IPerson {
  id: number;
  name: string;
  document?: string;
  email?: string;
  dateOfBirth?: Date;
  gender?: Gender;
}
