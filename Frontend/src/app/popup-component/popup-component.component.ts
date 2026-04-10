import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChartComponent } from '../chart-component/chart-component.component';

@Component({
  selector: 'app-popup-component',
  templateUrl: './popup-component.component.html',
  styleUrls: ['./popup-component.component.scss'],
})
export class PopupComponentComponent implements OnInit {
  @ViewChild(ChartComponent) chartComponent: ChartComponent;

  overLimit: boolean;
  warningMessage: String;
  efficientAlgorithmLabel: String;

  constructor(
    public dialogRef: MatDialogRef<PopupComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.warningMessage = data.warningMessage;
    this.overLimit = data.overLimit;
  }

  ngOnInit(): void {
    setTimeout(() => {
      if (this.chartComponent && !this.overLimit) {
        this.chartComponent.labels = this.data.labels;
        this.chartComponent.data = this.data.chartData;
        this.chartComponent.buildChart();

        const indexOfEfficientAlgorithm = this.data.chartData.reduce(
          (lowestIndex, currentValue, currentIndex, array) => {
            return currentValue < array[lowestIndex]
              ? currentIndex
              : lowestIndex;
          },
          0
        );

        this.efficientAlgorithmLabel =
          this.data.labels[indexOfEfficientAlgorithm];
      }
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
