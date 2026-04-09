import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Chart, ChartDataset, ChartType, registerables } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(...registerables, annotationPlugin);

@Component({
  selector: 'app-popup-component',
  templateUrl: './popup-component.component.html',
  styleUrls: ['./popup-component.component.scss'],
})
export class PopupComponentComponent implements OnInit {
  chart: Chart | null = null;

  constructor(
    public dialogRef: MatDialogRef<PopupComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    const canvas = document.getElementById('barChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      interface CombinedData {
        label: string;
        value: number;
      }

      let combinedData: CombinedData[] = this.data.labels.map(
        (label: string, index: number) => {
          return { label: label, value: this.data.chartData[index] };
        }
      );
      combinedData.sort((a, b) => b.value - a.value);

      let sortedLabels = combinedData.map((data) => data.label);
      let sortedValues = combinedData.map((data) => data.value);

      let averageValue =
        sortedValues.reduce((a, b) => a + b, 0) / sortedValues.length;

      Chart.defaults.elements.bar.borderRadius = 10;
      this.chart = new Chart(ctx, {
        type: 'bar' as ChartType,
        data: {
          labels: sortedLabels,
          datasets: [
            {
              label: 'Energy used',
              data: sortedValues,
              borderWidth: 1,
              backgroundColor: this.generateGradient(ctx),
              hoverBackgroundColor: 'rgba(254, 199, 0, 0.8)',
            },
          ] as ChartDataset[],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Energy consumption in khW',
              },
              ticks: { color: '#666' },
              grid: { color: 'rgba(0, 0, 0, 0.1)' },
            },
            x: {
              ticks: { color: '#666' },
            },
          },
          plugins: {
            legend: {
              position: 'bottom',
              labels: { color: '#666' },
            },
            annotation: {
              annotations: {
                averageLine: {
                  type: 'line',
                  yMin: averageValue,
                  yMax: averageValue,
                  borderColor: 'black',
                  borderWidth: 1,
                  borderDash: [6, 6],
                  label: {
                    content: `Durchschnitt: ${averageValue.toFixed(2)} kWh`,
                    position: 'start',
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  },
                },
              },
            },
            tooltip: {
              enabled: true,
              callbacks: {
                label: function (context) {
                  let label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed.y !== null) {
                    label += formatEnergy(context.parsed.y);
                  }
                  return label;
                },
              },
            },
          },
          animation: {
            duration: 800,
            easing: 'easeOutCubic',
          },
        },
      });
    }
  }

  generateGradient(ctx: CanvasRenderingContext2D) {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(254, 203, 47, 1)');
    gradient.addColorStop(1, 'rgba(254, 203, 47, 0.2)');
    return gradient;
  }

  onClose(): void {
    if (this.chart) {
      this.chart.destroy();
    }
    this.dialogRef.close();
  }
}

function formatEnergy(valueInKWh: number): string {
  if (valueInKWh >= 1) {
    return `${valueInKWh.toFixed(2)} kWh`;
  } else if (valueInKWh >= 0.001) {
    return `${(valueInKWh * 1000).toFixed(2)} Wh`;
  } else if (valueInKWh >= 0.000001) {
    return `${(valueInKWh * 1000000).toFixed(2)} mWh`;
  } else {
    return `${(valueInKWh * 1000000000).toFixed(2)} µWh`;
  }
}
