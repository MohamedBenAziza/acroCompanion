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

  private destroyed$ = new Subject<void>();

  ngOnInit(): void {
    this.dataService.selectedkeyValue$
      .pipe(
        takeUntil(this.destroyed$),
        withLatestFrom(this.dataService.selectedBoxIndex$),
        mergeMap(([keyValue, selectedBoxIndex]) => {
          return of({
            index: selectedBoxIndex,
            key: keyValue.key,
            value: keyValue.value,
          });
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

        const totalScore = Array.from(this.dataService.dataMap.values()).reduce(
          (acc, element) => acc + element.value,
          0
        );

        this.dataService.setTotalScore(parseFloat(totalScore.toFixed(2)));

        this.dataService.setSelectedBoxIndex(
          index < this.dataService.boxes.length ? index + 1 : index
        );
      });
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
