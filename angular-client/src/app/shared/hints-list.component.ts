import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
} from '@angular/core';
import { IHint } from '../core/interfaces';

@Component({
  selector: 'hts-hints-list',
  templateUrl: './hints-list.component.html',
  styleUrls: ['./hints-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HintsListComponent implements OnInit {
  @Input() hints: IHint[];
  @Input() showActions: boolean = false;

  @Output() onUpdate = new EventEmitter<string>();
  @Output() onDelete = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  update(id: string) {
    this.onUpdate.emit(id);
  }

  delete(id: string) {
    this.onDelete.emit(id);
  }
}
