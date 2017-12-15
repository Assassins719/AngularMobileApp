import { Component, OnInit, Input } from '@angular/core';
import {CardBox} from '../models/card-box.model';
import { CardBoxType } from '../models/card-box-type.enum';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor() { }

  @Input() cardBoxes: Array<CardBox>;

  public cardBoxType=CardBoxType;

  ngOnInit() {
  

  }

}
