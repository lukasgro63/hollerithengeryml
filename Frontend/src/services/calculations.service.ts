import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PredictionParameters } from '../models/predicton-parameters';

/**
 * Service for making calculations-related HTTP requests.
 */
@Injectable({
  providedIn: 'root',
})
export class CalculationsService {
  /**
   * Constructs an instance of CalculationsService.
   *
   * @param client - The HttpClient used to make HTTP requests.
   */
  constructor(private client: HttpClient) {}

  /**
   * Send a POST request to calculate energy predictions based on prediction parameters.
   *
   * @param predictionParameters - The prediction parameters to be used for calculations.
   * @returns An Observable that resolves to the calculation results.
   */
  postCalculationParams(
    predictionParameters: PredictionParameters
  ): Observable<any> {
    // Log a message indicating that a POST request is being made
    console.log('Sending POST request to calculate energy predictions...');

    // Define the URL where the request will be sent
    const url = 'http://127.0.0.1:8000/predictions';

    // Send a POST request with the prediction parameters to the specified URL
    return this.client.post(url, predictionParameters);
  }
}
