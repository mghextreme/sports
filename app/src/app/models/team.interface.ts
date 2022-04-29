import { IGroup } from "./group.interface";
import { IModality } from "./modality.interface";

export interface ITeam {
  id: number;
  name: string;
  groupId: number;
  seed?: number;
  score?: number;
  placing?: number;
  modalityId: number;

  group?: IGroup;
  modality?: IModality;
}
