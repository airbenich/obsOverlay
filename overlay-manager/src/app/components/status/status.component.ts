import { Component, OnInit } from '@angular/core';
import { StatusService } from '../../services/status.service';
import { Status } from '../status/status';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  status: Status[];
  constructor(
    private statusService: StatusService,
  ) { }

  ngOnInit() {
    this.getStatus();
  }

  getStatus(): void {
    this.statusService.getStatus().subscribe(status => this.status = status);
  }
}
