import { Component, OnInit } from '@angular/core';
import { Status } from './status';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  status: Status[];
  constructor() { }

  ngOnInit(): void {
    this.getStatus();
  }

  getStatus(): void {
    // this.statusService.getStatus().subscribe(status => this.status = status);
  }
}
