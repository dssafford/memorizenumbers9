// import {Directive, ElementRef, EventEmitter, Inject, Input, OnInit, Renderer2} from '@angular/core';
//
// @Directive({
//   selector: '[appFocus]'
// })
// export class FocusDirective implements OnInit{
//   @Input('appFocus') focusEvent: EventEmitter<boolean>
//
//   constructor(@Inject(ElementRef) private element: ElementRef, private renderer: Renderer2) { }
//
//   ngOnInit() {
//     this.focusEvent.subscribe(event => {
//      this.renderer.selectRootElement'#domElementId', true).scrollIntoView();
//     });
//
//
//   }
//
// }



import {Directive, AfterViewInit, ElementRef, OnInit, Input, EventEmitter, Inject} from '@angular/core';

@Directive({
  selector: '[appFocus]'
})
export class FocusDirective implements OnInit {
  @Input('appFocus') focusEvent: EventEmitter<boolean>

  constructor(@Inject(ElementRef) private host: ElementRef) {}

  ngOnInit() {
    this.host.nativeElement.focus();
  }
}
