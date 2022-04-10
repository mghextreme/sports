import { IEvent } from "./event.interface";
import { ISport } from "./sport.interface";

export interface IModality {
  id: number;
  name: string;
  sport: ISport;
  finished: boolean;
  maxTeamSize?: number;
  maxTeamsPerGroup: number;
  event?: IEvent;
}
