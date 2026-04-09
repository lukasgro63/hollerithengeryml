/**
 * Interface representing prediction results for different models.
 */
export interface PredictionResults {
  DecisionTree_energy: number;
  GaussianNB_energy: number;
  KNN_energy: number;
  LogisticRegression_energy: number;
  RandomForest_energy: number;
}
