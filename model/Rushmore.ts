import { RushmoreType } from "./RushmoreTypeEnums";

// Interface for Rushmore object
export interface Rushmore {
  rid: number; // Unique identifier for Rushmore object
  title: string;
  rushmoreCategory: string;
  type: RushmoreType; // Type of the Rushmore object (enum)
  timesCompleted: number;
}
