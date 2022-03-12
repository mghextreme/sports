import { ITeam } from "./team.interface";

export interface IMatch {
  id: number;
  started: boolean;
  finished: boolean;
  name?: string;
  teams?: ITeam[];
}
