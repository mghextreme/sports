import { StageMode } from "./stage-mode.enum";

export interface IStage {
  id: number;
  started: boolean;
  finished: boolean;
  mode: StageMode;
  name?: string;
}
