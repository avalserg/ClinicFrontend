import { ApplicationUser } from "@/Entities/ApplicationUser";

export interface Comment {
  id: string;
  user: ApplicationUser;
  text: string;
}
