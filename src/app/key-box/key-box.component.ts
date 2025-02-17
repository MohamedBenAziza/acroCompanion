import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from "@angular/core";
import { MatTooltipModule } from "@angular/material/tooltip";
import { DataService } from "../data.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "key-box",
  standalone: true,
  imports: [CommonModule, MatTooltipModule],
  templateUrl: "./key-box.component.html",
  styleUrl: "./key-box.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyBoxComponent {
  @Input() key!: string;
  @Input() value!: number;

  dataService = inject(DataService);

  handleClick(): void {
    this.dataService.setSelectedKeyValue(this.key, this.value);
  }
}
