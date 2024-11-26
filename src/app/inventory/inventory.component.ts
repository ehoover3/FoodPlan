import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';

const client = generateClient<Schema>();

@Component({
  selector: 'app-food-inventory',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './food-inventory.component.html',
  styleUrl: './food-inventory.component.css',
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
        quantity: quantity || '0', // Default to "0" if no value is entered
        cost: cost || '0', // Default to "0" if no value is entered
        week,
      });
      this.listFoodItems();
    } catch (error) {
      console.error('Error adding food item', error);
    }
  }

  updateFoodItem(id: string, quantity: string) {
    try {
      client.models.FoodItem.update(id, {
        quantity, // No conversion needed since it's a string now
      });
      this.listFoodItems();
    } catch (error) {
      console.error('Error updating food item', error);
    }
  }

  increaseQuantity(food: any) {
    // Convert the quantity from string to number, increment, then convert back to string
    const newQuantity = (parseInt(food.quantity, 10) + 1).toString();
    this.updateFoodItem(food.id, newQuantity);
  }

  increaseCost(food: any) {
    // Convert the cost from string to number, increment, then convert back to string
    const newCost = (parseFloat(food.cost) + 1).toString();
    this.updateFoodItem(food.id, newCost);
  }
}
