import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IOverlay } from '../../../models/ioverlay';
import { OverlayServerService } from 'src/app/shared/services/overlay-server/overlay-server.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-overlay-list',
  templateUrl: './overlay-list.component.html',
  styleUrls: ['./overlay-list.component.scss'],
})
export class OverlayListComponent implements OnInit {
  showFavorites = false;
  @Input() selectedOverlay: IOverlay;
  searchTerm = '';
  searchResults: IOverlay[] = [];

  @Output() selectOverlay = new EventEmitter<IOverlay>();

  constructor(public overlayServerService: OverlayServerService) {}

  onClick(selectedoverlay: IOverlay): void {
    this.selectOverlay.emit(selectedoverlay);
  }

  ngOnInit(): void {}

  delete(overlay: IOverlay): void {
    // this.overlays = this.overlays.filter((o) => o !== overlay);
    // this.overlaysApiService.deleteOverlay(overlay).subscribe();
  }

  showPinnedToTopDivider(): boolean {
    return (
      this.overlayServerService.overlays.filter((e) => e.pinnedToTop).length > 0
    );
  }

  showAllDivider(): boolean {
    return (
      this.overlayServerService.overlays.filter((e) => !e.pinnedToTop).length >
      0
    );
  }

  public onUserClickedOnNewOverlay(): void {
    if (this.overlayServerService.draftOverlay) {
      this.switchToDraftOverlay();
    } else {
      this.createDraftOverlayandSwitch();
    }
  }

  public onUserClickedOnFavorites(): void {
    this.showFavorites = !this.showFavorites;
  }

  private switchToDraftOverlay(): void {
    this.onClick(this.overlayServerService.draftOverlay);
  }

  private createDraftOverlayandSwitch(): void {
    this.overlayServerService.draftOverlay = {
      id: null,
      design: '',
      lastChange: Date.now().toString(),
      favorit: false,
      pinnedToTop: false,
      readOnly: false,
      title: 'Titel des neue Overlays',
      subtitle: 'Untertitel',
    } as IOverlay;
    this.onClick(this.overlayServerService.draftOverlay);
  }

  public onUserTypedInSearchBar(): void {
    this.searchResults = this.searchForOverlay(this.searchTerm);
  }

  public searchForOverlay(term: string): IOverlay[] {
    term = term.toLowerCase();
    return this.overlayServerService.overlays.filter(
      (e) => e.title.toLowerCase().includes(term) || e.subtitle.toLowerCase().includes(term)
    );
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
