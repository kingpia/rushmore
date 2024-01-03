import { RushmoreType } from "./RushmoreTypeEnums";

// Interface for Rushmore object
export interface Rushmore {
  rid: number; // Unique identifier for Rushmore object
  title: string;
  rushmoreCategory: string;
  timesCompleted: number;
  icon: string;
}
