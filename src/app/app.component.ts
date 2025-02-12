import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { DataBoxComponent } from "./data-box/data-box.component";
import { KeyBoxComponent } from "./key-box/key-box.component";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { DataService } from "./data.service";
import { CommonModule } from "@angular/common";
import { KeyBlocComponent } from "./key-bloc/key-bloc.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    DataBoxComponent,
    KeyBlocComponent,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  dataService = inject(DataService);

  value = 0;
  title = "acro-companion";
  constructor() {
    this.dataService.keysAreShown.subscribe((value) => {
      console.log(value);
    });
  }
}
