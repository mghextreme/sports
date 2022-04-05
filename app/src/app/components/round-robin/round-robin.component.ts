import { Component, Input } from '@angular/core';
import { IRoundRobinRow } from 'src/app/models';
import { StagesService } from 'src/app/services';

@Component({
  selector: 'round-robin',
  templateUrl: './round-robin.component.html',
  styleUrls: ['./round-robin.component.scss']
})
export class RoundRobinComponent {

  standings: IRoundRobinRow[];

  @Input('stageId') public set stageId(stageId: number) {
    this.stagesService.getRoundRobinStandings(stageId).subscribe(standings => {
      this.standings = standings;
    })
  }

  constructor(
    private readonly stagesService: StagesService
  ) {
    this.standings = [];
  }

}

