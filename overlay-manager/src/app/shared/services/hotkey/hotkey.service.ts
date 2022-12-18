import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Input } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { Observable } from 'rxjs';

type Options = {
  element: any;
  keys: string;
};

@Injectable({ providedIn: 'root' })
export class HotkeyService {
  defaults: Partial<Options> = {
    element: this.document,
  };

  @Input() lockTypingHotkeys = false;

  constructor(
    private eventManager: EventManager,
    @Inject(DOCUMENT) private document: Document
  ) {}

  addShortcut(
    options: Partial<Options>,
    preventDefault = true,
    deactivateWhenTypingHotkeyAreInUse = false
  ): Observable<unknown> {
    const merged = { ...this.defaults, ...options };
    const event = `keydown.${merged.keys}`;

    return new Observable((observer) => {
      const handler = (e) => {
        if (preventDefault) {
          e.preventDefault();
        }
        if (!(deactivateWhenTypingHotkeyAreInUse && this.lockTypingHotkeys)) {
          observer.next(e);
        }
      };

      const dispose = this.eventManager.addEventListener(
        merged.element,
        event,
        handler
      );

      return () => {
        dispose();
      };
    });
  }
}
