import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-acordeon',
  templateUrl: './acordeon.component.html',
  styleUrls: ['./acordeon.component.scss']
})
export class AcordeonComponent implements OnInit {
  constructor() {
    this.onAcordeonSelected = new EventEmitter();
  }

  @Input() public color:string;
  @Input() public titulo:string;
  @Input() public contentHide:boolean;
  @Input() public id;

  @Output() public onAcordeonSelected: EventEmitter<string>;
  
  public hexaColor:string;
  public fontColor:string;

  private opacity:string;

  public getBgColor():string {
    this.opacity = this.contentHide ? '.7' : '1';
    return this.hexaColor.replace(/[^,]+(?=\))/, this.opacity);
  }

  ngOnInit() {
    this.hexaColor =  this.color === 'rojo' ? 'rgba(230,120,100,' + this.opacity + ')' :
                      this.color === 'celeste' ? 'rgba(117,196,198,'+ this.opacity + ')' :
                      this.color === 'verde' ? 'rgba(110,190,100,'+ this.opacity +')' :
                      this.color === 'azul' ? 'rgba(0,81,155,'+ this.opacity +')' :
                      'rgba(221,221,221,'+ this.opacity +')'; 
          
    this.fontColor = this.color !== 'azul' ? '#ffffff' : '#E7D218'
  }

  public desplegarAcordeon(event):void {
    this.onAcordeonSelected.emit(this.id);
    this.contentHide = this.contentHide ? false : true;
  }

}
