import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DataService {
  boxes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  private _keysAreShown = new BehaviorSubject<boolean>(false);
  keysAreShown$ = this._keysAreShown.asObservable();

  get keysAreShown() {
    return this._keysAreShown.value;
  }

  private _selectedBoxIndex = new Subject<number>();
  selectedBoxIndex$ = this._selectedBoxIndex.asObservable();

  private _selectedkeyValue = new Subject<{ key: string; value: number }>();
  selectedkeyValue$ = this._selectedkeyValue.asObservable();

  private _dataMap = new BehaviorSubject(
    new Map<
      number,
      { key: string; value: number; keyValue: `${string}${number}` }
    >([])
  );

  dataMap$ = this._dataMap.asObservable();

  get dataMap() {
    return this._dataMap.value;
  }

  totalScore$ = this.dataMap$.pipe(
    map((dataMap) => {
      const totalScore = Array.from(dataMap.values()).reduce(
        (acc, element) => acc + element.value,
        0
      );

      return parseFloat(totalScore.toFixed(2));
    })
  );

  setKeysAreShown(value: boolean): void {
    this._keysAreShown.next(value);
  }

  setSelectedBoxIndex(index: number): void {
    this._selectedBoxIndex.next(index);
  }

  setSelectedKeyValue(key: string, value: number): void {
    this._selectedkeyValue.next({ key, value });
  }

  setDataMap(
    newMap: Map<
      number,
      { key: string; value: number; keyValue: `${string}${number}` }
    >
  ) {
    this._dataMap.next(newMap);
  }

  clearDataMap() {
    this.setDataMap(new Map());
  }

  setStorageData(key: string, value: string): void {
    localStorage.setItem(key, value);
  }
}
