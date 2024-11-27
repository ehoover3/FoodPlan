import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FoodInventoryComponent } from './inventory/inventory.component'; // Correct import
import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';

Amplify.configure(outputs);

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, FoodInventoryComponent], // Correct component import
})
export class AppComponent {
  title = 'food-plan-app';
}
