import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import {
  combineLatest,
  concatMap,
  exhaustMap,
  map,
  mergeMap,
  of,
  Subject,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from "rxjs";

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
  cdr = inject(ChangeDetectorRef);

  value = 0;
  private destroyed$ = new Subject<void>();

  ngOnInit(): void {
    this.dataService.selectedkeyValue$
      .pipe(
        takeUntil(this.destroyed$),
        withLatestFrom(this.dataService.selectedBoxIndex$),
        mergeMap(([keyValue, selectedBoxIndex]) => {
          console.log("selectedKeyValue changed:", keyValue);
          console.log("Latest selectedBoxIndex:", selectedBoxIndex);
          return of({
            index: selectedBoxIndex,
            keyValue: keyValue,
          });
        })
      )
      .subscribe(({ keyValue, index }) => {
        this.dataService.dataMap.set(index, keyValue);
        if (index < this.dataService.boxes.length) {
          this.dataService.setSelectedBoxIndex(index + 1);
        } else {
          this.dataService.setSelectedBoxIndex(index);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
