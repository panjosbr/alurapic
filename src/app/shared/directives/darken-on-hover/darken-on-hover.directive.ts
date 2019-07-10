import { Directive, ElementRef, HostListener, Renderer, Input } from '@angular/core';

@Directive({
  selector: '[apDarkenOnHover]'
})
export class DarkenOnHoverDirective {

  @Input() brightness = '70%';

  constructor(
    private element: ElementRef,
    private render: Renderer
  ) {}

  @HostListener('mouseover')
  darkenOn() {
    this.render.setElementStyle(this.element.nativeElement, 'filter', `brightness(${this.brightness})`);
    this.render.setElementStyle(this.element.nativeElement, 'cursor', 'pointer');
  }

  @HostListener('mouseleave')
  darkenOff() {
    this.render.setElementStyle(this.element.nativeElement, 'filter', 'brightness(100%)');
  }
}
