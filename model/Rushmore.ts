import { RushmoreType } from "./RushmoreTypeEnums";

// Interface for Rushmore object
export interface Rushmore {
  rid: number; // Unique identifier for Rushmore object
  title: string;
  category: string;
  timesCompleted: number;
  icon: string;
}
