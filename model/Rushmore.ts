import { RushmoreType } from "./RushmoreTypeEnums";

// Interface for Rushmore object
export interface Rushmore {
  rid: string; // Unique identifier for Rushmore object
  title: string;
  category: string;
  completedCount: number;
  icon: string;
  price: number;
}
