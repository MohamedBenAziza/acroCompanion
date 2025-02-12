import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DataService {
  keysAreShown = new BehaviorSubject<boolean>(false);

  selectedBoxIndex = new BehaviorSubject<number | null>(null);

  constructor() {}
}
