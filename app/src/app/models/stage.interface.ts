import { StageType } from "./stage-type.enum";

export interface IStage {
  id: number;
  started: boolean;
  finished: boolean;
  type: StageType;
  name?: string;
}
