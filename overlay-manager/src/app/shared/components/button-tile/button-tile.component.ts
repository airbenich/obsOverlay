import { stringify } from '@angular/compiler/src/util';
import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button-tile',
  templateUrl: './button-tile.component.html',
  styleUrls: ['./button-tile.component.scss'],
})
export class ButtonTileComponent implements OnInit {
  @Input() id: string;
  @Input() title: string;
  @Input() subtitle: string;
  @Input() selected: boolean;

  constructor() {}

  ngOnInit(): void {}
}
