import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from "@angular/core";
import { KeyBoxComponent } from "../key-box/key-box.component";
import { DataService } from "../data.service";

@Component({
  selector: "key-bloc",
  standalone: true,
  imports: [KeyBoxComponent],
  templateUrl: "./key-bloc.component.html",
  styleUrl: "./key-bloc.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyBlocComponent {
  @Input() title!: string;
  @Input() keysValues: [string, number][] = [];

  dataService = inject(DataService);

  handleClick(event: { key: string; value: number }): void {
    this.dataService.setSelectedKeyValue(event.key, event.value);
  }
}
