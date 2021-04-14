import { Component, OnInit } from '@angular/core';
import isElectron from 'is-electron';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  iselectron = false;
  constructor() {
    this.iselectron = isElectron();
   }

  ngOnInit(): void {
  }



}
