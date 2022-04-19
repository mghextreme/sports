import { StageMode } from "./stage-mode.enum";

export interface IStage {
  id: number;
  started: boolean;
  finished: boolean;
  mode: StageMode;
  maxTeams?: number;
  name?: string;
}
