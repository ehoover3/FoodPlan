import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';

const client = generateClient<Schema>();

@Component({
  selector: 'app-food-inventory',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class FoodInventoryComponent implements OnInit {
  foodItems: any[] = [];

  ngOnInit(): void {
    this.listFoodItems();
  }

  listFoodItems() {
    try {
      client.models.FoodItem.observeQuery().subscribe({
        next: ({ items }) => {
          this.foodItems = items;
        },
        error: (error) => {
          console.error('Error fetching food items:', error);
        },
      });
    } catch (error) {
      console.error('Error fetching food items', error);
    }
  }

  addFoodItem() {
    const name = window.prompt('Enter food name');
    const quantity = window.prompt('Enter quantity (as string)');
    const cost = window.prompt('Enter cost per unit (as string)');
    const week = window.prompt('Enter week (e.g., Week 1)');

    try {
      client.models.FoodItem.create({
        name,
        quantity: quantity || '0', // Default to "0" if no value entered
        cost: cost || '0', // Default to "0" if no value entered
        week,
      });
      this.listFoodItems(); // Refresh the list after adding
    } catch (error) {
      console.error('Error adding food item', error);
    }
  }

  updateFoodItem(id: string, quantity: string) {
    try {
      // Fetch the food item first to ensure we have all fields
      const foodItem = this.foodItems.find((item) => item.id === id);
      if (!foodItem) {
        console.error('Food item not found');
        return;
      }

      // Ensure we're passing an object with the correct structure
      const updatedFoodItem = {
        id, // Pass the ID to update the correct item
        name: foodItem.name, // Keep the existing name
        quantity, // Pass the new quantity as a string
        cost: foodItem.cost, // Keep the existing cost
        week: foodItem.week, // Keep the existing week
      };

      // Update the food item in the database
      client.models.FoodItem.update(updatedFoodItem);

      this.listFoodItems(); // Refresh the list after updating
    } catch (error) {
      console.error('Error updating food item', error);
    }
  }

  increaseQuantity(food: any) {
    // Increase the quantity by 1 (convert to number, increment, convert back to string)
    const newQuantity = (parseInt(food.quantity, 10) + 1).toString();
    this.updateFoodItem(food.id, newQuantity);
  }

  increaseCost(food: any) {
    // Increase the cost by 1 (convert to number, increment, convert back to string)
    const newCost = (parseFloat(food.cost) + 1).toString();
    this.updateFoodItem(food.id, newCost);
  }
}
