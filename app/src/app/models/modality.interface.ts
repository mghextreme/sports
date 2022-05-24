import { IEvent } from "./event.interface";
import { ISport } from "./sport.interface";

export interface IModality {
  id: number;
  name: string;
  sportId: number;
  finished: boolean;
  maxTeamSize?: number;
  maxTeamsPerGroup: number;
  eventId: number;

  sport?: ISport;
  event?: IEvent;
}
