import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaticContentComponent } from './static-content/static-content.component';

// Define the routes for your application
const routes: Routes = [
  // Define other routes here

  // Route for displaying the "Terms" page
  { path: 'terms', component: StaticContentComponent },

  // Route for displaying the "Privacy" page
  { path: 'privacy', component: StaticContentComponent },
];

/**
 * The main routing module for your Angular application.
 * It configures the application's routes and sets up the router module.
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
