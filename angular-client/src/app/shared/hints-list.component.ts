import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
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

  constructor() {}

  ngOnInit() {}
}
