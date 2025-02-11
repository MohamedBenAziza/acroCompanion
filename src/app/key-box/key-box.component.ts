import { Component, Input } from "@angular/core";
import { MatTooltipModule } from "@angular/material/tooltip";

@Component({
  selector: "key-box",
  standalone: true,
  imports: [MatTooltipModule],
  templateUrl: "./key-box.component.html",
  styleUrl: "./key-box.component.scss",
})
export class KeyBoxComponent {
  @Input() key!: string;
}
