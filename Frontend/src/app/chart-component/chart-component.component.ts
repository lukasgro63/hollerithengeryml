import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Chart, ChartType, registerables } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-chart',
  template: '<canvas #chartCanvas></canvas>',
})
export class ChartComponent implements AfterViewInit, OnChanges {
  @ViewChild('chartCanvas') chartCanvas: ElementRef<HTMLCanvasElement>;
  @Input() labels: string[];
  @Input() data: number[];
  chart: Chart | null = null;

  constructor(private renderer: Renderer2) {
    Chart.register(...registerables, annotationPlugin);
  }

  ngAfterViewInit() {
    this.adjustCanvasSize();
    // Fügen Sie hier Ihren Chart-Initialisierungscode hinzu.
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['labels'] || changes['data']) {
      this.buildChart();
    }
  }

  adjustCanvasSize() {
    const canvasContainer = this.chartCanvas.nativeElement.parentElement;
    const screenWidth = window.innerWidth;

    // Verwenden Sie Media Queries, um die Breite je nach Bildschirmgröße anzupassen
    if (screenWidth >= 800) {
      // Wenn der Bildschirm breit genug ist (z. B. 1200px oder größer)
      const canvasWidth = canvasContainer.offsetWidth * 4;
      const canvasHeight = Math.min(500, canvasWidth);
      this.renderer.setAttribute(
        this.chartCanvas.nativeElement,
        'width',
        canvasWidth.toString()
      );
      this.renderer.setAttribute(
        this.chartCanvas.nativeElement,
        'height',
        canvasHeight.toString()
      );
    } else {
      // Wenn der Bildschirm kleiner ist, verwenden Sie eine andere Breite
      const canvasWidth = canvasContainer.offsetWidth * 1.6;
      const canvasHeight = Math.min(300, canvasWidth);
      this.renderer.setAttribute(
        this.chartCanvas.nativeElement,
        'width',
        canvasWidth.toString()
      );
      this.renderer.setAttribute(
        this.chartCanvas.nativeElement,
        'height',
        canvasHeight.toString()
      );
    }
  }

  buildChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (ctx) {
      const { sortedLabels, sortedValues } = this.sortData(
        this.labels,
        this.data
      );
      const gradient = this.generateGradient(ctx);
      const averageValue = this.calculateAverage(this.data);

      this.chart = new Chart(ctx, {
        type: 'bar' as ChartType,
        data: {
          labels: sortedLabels,
          datasets: [
            {
              label: 'Consumed Energy (%)',
              data: sortedValues,
              borderWidth: 1,
              backgroundColor: gradient,
              hoverBackgroundColor: 'rgba(254, 199, 0, 0.8)',
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Relative Energy Consumption (%)',
              },
              ticks: { color: '#666' },
              grid: { color: 'rgba(0, 0, 0, 0.1)' },
            },
            x: {
              ticks: {
                color: '#666',
                maxRotation: 45,
              },
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
                    content: `Durchschnitt: ${averageValue.toFixed(2)}`,
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
        },
      });
    }
  }

  private calculateAverage(values: number[]): number {
    return values.reduce((a, b) => a + b, 0) / values.length;
  }

  private generateGradient(ctx: CanvasRenderingContext2D) {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(254, 203, 47, 1)');
    gradient.addColorStop(1, 'rgba(254, 203, 47, 0.2)');
    return gradient;
  }

  private sortData(
    labels: string[],
    data: number[]
  ): { sortedLabels: string[]; sortedValues: number[] } {
    const combinedData = labels.map((label, index) => ({
      label,
      value: data[index],
    }));

    combinedData.sort((a, b) => a.value - b.value);

    const updatedLabels = combinedData.map(
      (d, index) => `${index + 1}. ${d.label}`
    );
    const sortedValues = combinedData.map((d) => d.value);

    return {
      sortedLabels: updatedLabels,
      sortedValues: sortedValues,
    };
  }
}

// Helper function for formatting energy units
function formatEnergy(valueInKWh: number): string {
  if (valueInKWh >= 1) {
    return `${valueInKWh.toFixed(2)}`;
  } else if (valueInKWh >= 0.001) {
    return `${(valueInKWh * 1000).toFixed(2)}`;
  } else if (valueInKWh >= 0.000001) {
    return `${(valueInKWh * 1000000).toFixed(2)}`;
  } else {
    return `${(valueInKWh * 1000000000).toFixed(2)}`;
  }
}
