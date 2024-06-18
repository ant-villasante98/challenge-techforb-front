import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appCustomBtn]',
  standalone: true
})
export class CustomBtnDirective implements OnInit {
  domElement!: HTMLElement;

  @Input({ required: true }) color: "primary" | "secundary" | "outline" = "primary"
  @Input() text: "white" | "black" = "black"

  constructor(private elmentRef: ElementRef<HTMLElement>, private renderer: Renderer2) {
  }

  ngOnInit() {
    // Primera opcion
    // this.renderer.addClass(
    //   this.elmentRef.nativeElement,
    //   `bg-[--color-${this.color}]`
    // );
    // console.log(this.color)
    this.domElement = this.elmentRef.nativeElement;
    // this.domElement.style.backgroundColor = `var(--color-${this.color})`;
    this.domElement.className += ` px-8 py-4 rounded-2xl border`;
    this.domElement.className += ` bg-[--color-${this.color}] border-[--color-${this.color}] text-${this.text} `;
  }

}
