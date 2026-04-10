import { Component } from '@angular/core';

interface FAQ {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent {
  faqs: FAQ[] = [
    {
      question:
        'For which machine learning algorithms can energy consumption be predicted?',
      answer:
        "Currently, HollerithEnergyML's predictions are limited to classification algorithms. The model has been trained on sklearn library algorithms including Random Forest, KNN, GaussianNB, Decision Tree, and Logistic Regression.",
    },
    {
      question:
        'How is energy consumption predicted with the HollerithEnergyML model?',
      answer:
        'Energy consumption is estimated based on the known training data of the model, providing a relative output in % of the highest energy consumption.',
    },
    {
      question: 'How was energy consumption measured during model training?',
      answer:
        'The energy consumption for the training data was measured using the Python library mlco2/codecarbon.',
    },
    {
      question: 'Which model was used to predict energy consumption?',
      answer:
        'The HollerithEnergyML employs a Random Forest regressor from the sklearn library for data prediction.',
    },
    {
      question:
        'How many data points were used to train the Energy Predictor Model?',
      answer:
        'Three datasets were utilized, with a variation of up to 20 numerical and categorical features and up to 300,000 data samples.',
    },
  ];
}
