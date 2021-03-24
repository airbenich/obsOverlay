import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-toggle-switch',
  templateUrl: './toggle-switch.component.html',
  styleUrls: ['./toggle-switch.component.scss'],
})
export class ToggleSwitchComponent {
  @Input() title: string;
  @Input() isChecked: boolean;
  @Output() isCheckedChange = new EventEmitter<boolean>();
  @Input() description: string;
  @Input() disabled = false;

  constructor() {}

  public onUserClickedLabel(): void {
    if (!this.disabled) {
      this.isChecked = !this.isChecked;
      this.isCheckedChange.emit(this.isChecked);
    }
  }

  onChanged($event): void {
    this.isChecked = $event && $event.target && $event.target.checked;
    this.isCheckedChange.emit(this.isChecked);
  }
}
