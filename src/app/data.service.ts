import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DataService {
  boxes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  keysAreShown = new BehaviorSubject<boolean>(false);

  private _selectedBoxIndex = new Subject<number>();
  selectedBoxIndex$ = this._selectedBoxIndex.asObservable();

  private _selectedkeyValue = new Subject<{ key: string; value: number }>();
  selectedkeyValue$ = this._selectedkeyValue.asObservable();

  dataMap = new Map<number, { key: string; value: number }>([]);

  setSelectedBoxIndex(index: number): void {
    this._selectedBoxIndex.next(index);
  }

  setSelectedKeyValue(key: string, value: number): void {
    this._selectedkeyValue.next({ key, value });
  }
}
