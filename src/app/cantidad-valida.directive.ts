/* eslint-disable @angular-eslint/directive-selector */
import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[CantidadValida]'
})
export class CantidadValidaDirective {

  constructor() { }
@HostListener('keydown',['$event'])
onKeyDown(e: KeyboardEvent){
  if(e.key === "-"){
    e.preventDefault();
  }
}
}
