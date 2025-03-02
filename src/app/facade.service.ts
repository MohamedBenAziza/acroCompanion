import { inject, Injectable, OnDestroy } from "@angular/core";
import { DataService } from "./data.service";
import { delay, map, Subject, takeUntil, withLatestFrom } from "rxjs";
import { storageEnum } from "./enum";

@Injectable({
  providedIn: "root",
})
export class FacadeService implements OnDestroy {
  dataService = inject(DataService);

  private destroyed$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  setupKeyValueSubscription(): void {
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

        this.dataService.setSelectedBoxIndex(
          index < this.dataService.boxes.length ? index + 1 : index
        );
      });
  }

  setupKeysShownSubscription(): void {
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
  }

  restoreDataMapFromStorage(): void {
    const storedMap = localStorage.getItem(storageEnum.dataMap);
    if (storedMap) {
      const myMap = new Map<
        number,
        { key: string; value: number; keyValue: `${string}${number}` }
      >(JSON.parse(storedMap));
      this.dataService.setDataMap(myMap);
    }
  }
}
