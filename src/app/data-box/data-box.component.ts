import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from "@angular/core";
import { DataService } from "../data.service";

@Component({
  selector: "data-box",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./data-box.component.html",
  styleUrl: "./data-box.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataBoxComponent {
  @Input() num!: number;

  dataService = inject(DataService);

  handleClick(): void {
    this.dataService.setKeysAreShown(true);
    this.dataService.setSelectedBoxIndex(this.num);
  }
}
