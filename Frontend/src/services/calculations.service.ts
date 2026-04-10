import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PredictionParameters } from '../models/predicton-parameters';

@Injectable({
  providedIn: 'root',
})
export class CalculationsService {
  constructor(private client: HttpClient) {}

  postCalculationParams(
    predictionParameters: PredictionParameters
  ): Observable<any> {
    console.log('Sending POST request to calculate energy predictions...');

    const url = 'http://128.140.13.162:8001/predictions';

    // Local Host für docker Lokal
    // const url = 'http://127.0.0.1:8000/predictions';

    return this.client.post(url, predictionParameters);
  }
}
