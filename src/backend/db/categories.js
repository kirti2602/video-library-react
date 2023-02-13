import { v4 as uuid } from "uuid";
import {
  AdventureCatg,
  HorrorCatg,
  ActionCatg,
  SimulationCatg,
  WalkthroughCatg,
} from "assets";
/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Adventure",
    categoryImg: AdventureCatg,
    description:
      "Adventure games include open world adventures throughout different genres and time periods",
  },
  {
    _id: uuid(),
    categoryName: "Horror",
    categoryImg: HorrorCatg,
    description:
      "Horror games include a variety of scary and bone chilling video games",
  },
  {
    _id: uuid(),
    categoryName: "Action",
    categoryImg: ActionCatg,
    description:
      "Action games include thrilling real world based type games where missions need to be completed",
  },
  {
    _id: uuid(),
    categoryName: "Simulation",
    categoryImg: SimulationCatg,
    description:
      "Simulation games include games with option of role playing and controlling the players and their lives",
  },
  {
    _id: uuid(),
    categoryName: "Walkthrough",
    categoryImg: WalkthroughCatg,
    description:
      "Walkthrough includes helpuful tips and walkthroughs to complete missions and quests",
  },
];
