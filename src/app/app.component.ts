import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { DataBoxComponent } from "./data-box/data-box.component";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { DataService } from "./data.service";
import { CommonModule } from "@angular/common";
import { KeyBlocComponent } from "./key-bloc/key-bloc.component";
import { mergeMap, of, Subject, takeUntil, withLatestFrom } from "rxjs";

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
export class AppComponent implements OnInit, OnDestroy {
  dataService = inject(DataService);
  cdr = inject(ChangeDetectorRef);

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

        const totalScore = Array.from(this.dataService.dataMap.values()).reduce(
          (acc, element) => acc + element.value,
          0
        );

        this.dataService.setTotalScore(parseFloat(totalScore.toFixed(2)));

        this.dataService.setSelectedBoxIndex(
          index < this.dataService.boxes.length ? index + 1 : index
        );
      });

    this.dataService.selectedBoxIndex$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((index) => {
        if (this.dataService.dataMap.has(index)) {
          const keyValue = this.dataService.dataMap.get(index);
          if (keyValue) {
            this.dataService.setAssignedKey(keyValue.key + keyValue.value);
          }
        } else {
          this.dataService.setAssignedKey(null);
        }
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
