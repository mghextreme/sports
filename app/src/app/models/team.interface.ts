import { IGroup } from "./group.interface";

export interface ITeam {
  id: number;
  name: string;
  group?: IGroup;
  seed?: number;
  score?: number;
  placing?: number;
}
