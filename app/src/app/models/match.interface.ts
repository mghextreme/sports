import { IMatchTeam } from "./match-team.interface";

export interface IMatch {
  id: number;
  started: boolean;
  finished: boolean;
  name?: string;

  teams: IMatchTeam[];
}
