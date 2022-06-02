import { IRoundRobinStageStart } from "./round-robin-stage-start.interface";

export interface IStageStart {
  id: number;
  teamIds: number[];
  roundRobin?: IRoundRobinStageStart;
}
