import { ITeam } from "./team.interface";

export interface IMatchTeam {
  id: number;
  score: number;
  team: ITeam;
}
