import { Component } from "@angular/core";
import { FontWeightResizerDirective } from "../../directives/fontWeightResizer.directive";

@Component({
  imports: [FontWeightResizerDirective],
  standalone: true,
  template: ` <h2 fontWeightResizer="bold">Test Directive</h2> `
})

export class TestFontWeightResizerDirectiveComponent {

}
