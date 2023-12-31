import { Rushmore } from "./Rushmore";

export interface UserDetail {
  id: number;
  username: string;
  name: string;
  rushmoresCompletedCount: number;
  rushmoresSolvedCount: number;
  following: number;
  followers: number;
  likes: number;
  rushmores: Rushmore[];
}
