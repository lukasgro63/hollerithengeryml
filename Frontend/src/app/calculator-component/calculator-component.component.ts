import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { PredictionParameters } from '../../models/predicton-parameters';
import { CalculationsService } from '../../services/calculations.service';
import { PopupComponentComponent } from '../popup-component/popup-component.component';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator-component.component.html',
  styleUrls: ['./calculator-component.component.scss'],
})
export class CalculatorComponent {
  displayedColumns: string[] = ['key', 'value'];
  dataSource: RowElement[] = [];

  inputForm = this.fb.group({
    numFeatures: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    catFeatures: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    dataSize: ['', [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]],
  });

  @ViewChild('myTable') myTable!: MatTable<any>;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private calculationsService: CalculationsService
  ) {}

  calculate() {
    const params: PredictionParameters = {
      num_cat_features: +this.inputForm.value.catFeatures,
      num_num_features: +this.inputForm.value.numFeatures,
      number_of_instances: +this.inputForm.value.dataSize,
    };

    let overLimit = false;
    let warningMessage =
      'The input values are within the range of the trained HollerithEnergyML predictor model. The prediction is accurate for the data trained by the model.';

    if (
      params.num_cat_features > 25 ||
      params.num_num_features > 25 ||
      params.number_of_instances > 350000
    ) {
      overLimit = true;
      warningMessage =
        'The input values are outside the range of the trained HollerithEnergyML predictor model and thus no output will be generated. Further information can be found in the usage description.';
      // warningMessage =
      //   'The input values are outside the range of the trained HollerithEnergyML predictor model. This could lead to less accurate energy predictions. Further information can be found in the usage description.';
    }

    this.calculationsService.postCalculationParams(params).subscribe(
      (response) => {
        this.dataSource = Object.entries(response).map(([key, value]) => ({
          key,
          value: +value,
        }));

        this.myTable?.renderRows();

        this.dialog.open(PopupComponentComponent, {
          data: {
            labels: Object.keys(response),
            chartData: Object.values(response).map(Number),
            warningMessage: warningMessage,
            overLimit: overLimit,
          },
        });
      },
      (error) => console.error(error)
    );
  }
}

interface RowElement {
  key: string;
  value: number;
}
