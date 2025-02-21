import {
  ChangeDetectionStrategy,
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
import {
  delay,
  map,
  mergeMap,
  of,
  Subject,
  takeUntil,
  withLatestFrom,
} from "rxjs";
import { storageEnum } from "./enum";

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

  private destroyed$ = new Subject<void>();

  ngOnInit(): void {
    this.dataService.selectedkeyValue$
      .pipe(
        takeUntil(this.destroyed$),
        withLatestFrom(this.dataService.selectedBoxIndex$),
        map(([keyValue, selectedBoxIndex]) => {
          return {
            index: selectedBoxIndex,
            key: keyValue.key,
            value: keyValue.value,
          };
        })
      )
      .subscribe(({ index, key, value }) => {
        const map = this.dataService.dataMap;
        map.set(index, {
          key,
          value,
          keyValue: `${key}${value}`,
        });

        this.dataService.setDataMap(map);

        this.dataService.setStorageData(
          storageEnum.dataMap,
          JSON.stringify(Array.from(map.entries()))
        );

        const totalScore = Array.from(this.dataService.dataMap.values()).reduce(
          (acc, element) => acc + element.value,
          0
        );

        const formattedTotalScore = parseFloat(totalScore.toFixed(2));

        this.dataService.setTotalScore(formattedTotalScore);

        this.dataService.setStorageData(
          storageEnum.totalScore,
          formattedTotalScore.toString()
        );

        this.dataService.setSelectedBoxIndex(
          index < this.dataService.boxes.length ? index + 1 : index
        );
      });

    this.dataService.keysAreShown$
      .pipe(
        takeUntil(this.destroyed$),
        withLatestFrom(this.dataService.selectedBoxIndex$),
        map(([_, selectedBoxIndex]) => selectedBoxIndex),
        // Shifts Execution to the Next Microtask (Async Behavior)
        delay(0)
      )
      .subscribe((selectedBoxIndex) => {
        this.dataService.setSelectedBoxIndex(selectedBoxIndex);
      });

    const storedMap = localStorage.getItem(storageEnum.dataMap);
    if (storedMap) {
      const myMap = new Map<
        number,
        { key: string; value: number; keyValue: `${string}${number}` }
      >(JSON.parse(storedMap));
      this.dataService.setDataMap(myMap);
    }

    const storedTotalScore = localStorage.getItem(storageEnum.totalScore);
    if (storedTotalScore) {
      this.dataService.setTotalScore(parseFloat(storedTotalScore));
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  handleDelete(): void {
    this.dataService.clearDataMap();
    this.dataService.setTotalScore(0);
  }
}
