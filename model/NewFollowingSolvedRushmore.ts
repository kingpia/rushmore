import { RushmoreType } from "./RushmoreTypeEnums";
import { UserRushmore } from "./UserRushmore";

// Interface for Rushmore object
export interface NewFollowingSolvedRushmore {
  solvedUserRushmore: UserRushmore; //users rushmore that you solved
  username: string; //solved
  name: string; //the name of the user
  type: RushmoreType; // Type of the Rushmore object (enum)
  completedDt: Date;
  score: number;
  icon: string;
}
