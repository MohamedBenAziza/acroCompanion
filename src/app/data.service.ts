import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DataService {
  boxes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  private _keysAreShown = new BehaviorSubject<boolean>(false);
  keysAreShown$ = this._keysAreShown.asObservable();

  private _selectedBoxIndex = new Subject<number>();
  selectedBoxIndex$ = this._selectedBoxIndex.asObservable();

  private _selectedkeyValue = new Subject<{ key: string; value: number }>();
  selectedkeyValue$ = this._selectedkeyValue.asObservable();

  private _totalScore = new BehaviorSubject<number>(0);
  totalScore$ = this._totalScore.asObservable();

  dataMap = new Map<
    number,
    { key: string; value: number; keyValue: `${string}${number}` }
  >([]);

  setKeysAreShown(value: boolean): void {
    this._keysAreShown.next(value);
  }

  setSelectedBoxIndex(index: number): void {
    this._selectedBoxIndex.next(index);
  }

  setSelectedKeyValue(key: string, value: number): void {
    this._selectedkeyValue.next({ key, value });
  }

  setTotalScore(value: number): void {
    this._totalScore.next(value);
  }
}
