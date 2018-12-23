import { Component, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'app-botonera',
  templateUrl: './botonera.component.html',
  styleUrls: ['./botonera.component.scss']
})
export class BotoneraComponent implements OnInit {

  constructor(private hostElement: ElementRef) {
    this.onChangeSection = new EventEmitter();
  }

  public section:String = 'Inmobiliario';

  @Output() public onChangeSection: EventEmitter<string>;

  public goToSection(section) {
    this.section = section;
    this.onChangeSection.emit(section);
  }

  ngOnInit() {
  }

}
