import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { DataBoxComponent } from "./data-box/data-box.component";
import { KeyBoxComponent } from "./key-box/key-box.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, DataBoxComponent, KeyBoxComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "acro-companion";
}
