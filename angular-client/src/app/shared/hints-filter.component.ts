import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

import { fromEvent } from 'rxjs';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators/';

@Component({
  selector: 'hts-hints-filter',
  templateUrl: './hints-filter.component.html',
  styleUrls: ['./hints-filter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HintsFilterComponent implements OnInit {
  @ViewChild('filterField', { static: true }) filterField: ElementRef;
  @Output() filterFieldInput = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {
    fromEvent(this.filterField.nativeElement, 'input')
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((_) => {
        const value = this.filterField.nativeElement.value;
        console.log('here');
        this.filterFieldInput.emit(value);
      });
  }
}
