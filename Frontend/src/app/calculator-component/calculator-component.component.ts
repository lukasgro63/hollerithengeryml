import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  LinearScale,
  Title,
} from 'chart.js';
import { CalculationsService } from '../../services/calculations.service';
import { PopupComponentComponent } from '../popup-component/popup-component.component';

/**
 * Angular component responsible for energy calculations and visualization.
 */
@Component({
  selector: 'app-calculator',
  templateUrl: './calculator-component.component.html',
  styleUrls: ['./calculator-component.component.scss'],
})
export class CalculatorComponent {
  // Define displayed columns for the data table
  displayedColumns: string[] = ['key', 'value'];

  // Data source for the result table
  dataSource: RowElement[] = [];

  // Chart instance for visualization
  chart: any;

  // Labels for chart data
  labels: string[] = [];

  // Data for chart
  chartData: any = [];

  // Form group for input fields
  inputForm: FormGroup;

  // Reference to the MatTable component
  @ViewChild('myTable') myTable!: MatTable<any>;

  /**
   * Constructs an instance of CalculatorComponent.
   *
   * @param calculationsService - Service for making calculations
   * @param elementRef - Reference to the current component's element
   * @param formbuilder - FormBuilder for managing form controls
   * @param dialog - MatDialog for opening pop-up dialogs
   */
  constructor(
    private calculationsService: CalculationsService,
    private elementRef: ElementRef,
    private formbuilder: FormBuilder,
    private dialog: MatDialog
  ) {
    // Initialize the input form with validation rules
    this.inputForm = formbuilder.group({
      numFeatures: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      catFeatures: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      dataSize: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }

  /**
   * Calculate energy consumption and display results.
   */
  calculate() {
    // Register Chart.js components
    Chart.register(
      BarController,
      BarElement,
      CategoryScale,
      LinearScale,
      Title
    );

    // Create a parameters object for prediction
    let params = <PredictionParameters>{};
    params.num_cat_features = this.inputForm.controls['catFeatures'].value;
    params.num_num_features = this.inputForm.controls['numFeatures'].value;
    params.number_of_instances = this.inputForm.controls['dataSize'].value;

    // Make a POST request to the calculations service
    this.calculationsService.postCalculationParams(params).subscribe(
      (response) => {
        // Handle the response from the service
        console.log('response:', response);

        // Reset the chart and data if it already exists
        if (this.chart) {
          this.reset();
        }

        // Process the response data and update chart and table
        for (const key in response) {
          this.dataSource.push({ key, value: response[key] });
          this.labels.push(key);
          this.chartData.push(response[key]);
        }

        // Update the table
        this.updateTable();

        // Create a new chart
        let ctx = this.elementRef.nativeElement.querySelector(`#myChart`);
        this.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: this.labels,
            datasets: [
              {
                label: 'Amount of energy',
                data: this.chartData,
                borderWidth: 1,
                backgroundColor: '#fec700',
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
            indexAxis: 'y',
          },
        });

        // Open a popup with the results
        const dialogRef = this.dialog.open(PopupComponentComponent, {
          width: '600px',
          data: {
            labels: this.labels,
            chartData: this.chartData,
            numFeatures: params.num_num_features,
            catFeatures: params.num_cat_features,
            dataSize: params.number_of_instances,
            // Add additional calculated data to display in the popup
          },
        });
      },
      (error) => {
        // Handle errors
        console.log(error);
      }
    );
  }

  /**
   * Update the table to reflect changes in data source.
   */
  updateTable() {
    this.myTable?.renderRows();
  }

  /**
   * Reset the chart and data.
   */
  reset() {
    this.chart.destroy();
    this.labels = [];
    this.chartData = [];
    this.dataSource = [];
  }
}

/**
 * Interface for row elements in the result table.
 */
export interface RowElement {
  key: string;
  value: string;
}

/**
 * Interface for prediction parameters.
 */
interface PredictionParameters {
  num_cat_features: number;
  num_num_features: number;
  number_of_instances: number;
}
