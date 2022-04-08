import { IGroup } from "./group.interface";
import { IModality } from "./modality.interface";

export interface ITeam {
  id: number;
  name: string;
  group?: IGroup;
  seed?: number;
  score?: number;
  placing?: number;
  modality?: IModality;
}
