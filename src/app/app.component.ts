import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from "@angular/core";
import { DataBoxComponent } from "./data-box/data-box.component";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { DataService } from "./data.service";
import { CommonModule } from "@angular/common";
import { KeyBlocComponent } from "./key-bloc/key-bloc.component";
import { FacadeService } from "./facade.service";

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
export class AppComponent implements OnInit {
  dataService = inject(DataService);
  facadeService = inject(FacadeService);

  ngOnInit(): void {
    this.facadeService.setupKeyValueSubscription();
    this.facadeService.setupKeysShownSubscription();
    this.facadeService.restoreDataMapFromStorage();
  }

  handleDelete(): void {
    this.dataService.clearDataMap();
    this.dataService.clearStorageData();
  }
}
