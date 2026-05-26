# App Outline

# General

> **Food Planner & Inventory** — I want to create a web application that helps me track the food and amounts I’m eating in a day, similar to the existing app, MyFitnessPal. It also allows me to maintain an inventory of my pantry, storage pantry, fridge, and freezer.

# Features

1. I would like to be able to enter in a food item or ingredient and enter in the amounts for macro nutrients and calories. For example: If I were to enter in a new item, I could name it “Ranch Dressing,” and set the calories at `140` for `2` tablespoons. I could then enter the macro-nutrient values: `fat` amount, `carbohydrate` amount, and `protein`.
2. I want to be able to see this list of food item/ingredients in an “Inventory” view where I can simply check \(checkbox\) whether I have that ingredient available in my house at any given time.
3. I would like to have “today” view where it is a split column view that shows my inventory list, and a “today” list pane, where I’m able to drag the food list-item into the “today” pane, and that pane will total up the amount of calories, fat, protein, and carbohydrates for that day.
4. I should be able to click on the list items in the “today” pane to update the “amount” of that specific food item that I’m eating—such as if I dragged over “Peanut Butter” I could say it was `1.5` or `2` servings/amount, and the total for the day would update appropriately.

# Structure

The application will be built in React, and Typescript. I will eventually create an API, but still set-up the back-end using Typescript and instead of saving to a database, we will save to localStorage for now.

# Models

## `FoodItem`

Example model for the food item. Create or update models as necessary to what I’m asking.

```Typescript
// 1. Define the Nutritional Information structure
export interface NutritionalInfo {
  calories: number;       // e.g., kcal per serving or per 100g
  fat: number;            // in grams
  protein: number;        // in grams
  carbohydrates: number;  // in grams
}

// 2. Define the main Food Item interface for your inventory
export interface FoodItem {
  id: string;               // Unique identifier \(UUID or database ID\)
  name: string;             // Name of the food \(e.g., "Greek Yogurt"\)
  brand?: string;           // Optional brand name \(e.g., "Chobani"\)
  category: FoodCategory;   // Enum or string literal for sorting
  
  unit: MeasurementUnit;    // e.g., "grams", "pieces", "ounces"
  
  // Nutrition & Serving Data
  servingSize: number;      // The amount that the nutrition info is based on
  servingUnit: string;      // e.g., "g", "ml", "cup"
  nutrition: NutritionalInfo; 
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
}

// 3. Supporting types/enums to enforce strict typing
export type MeasurementUnit = 'g' | 'kg' | 'oz' | 'lbs' | 'ml' | 'l' | 'piece' | 'pack';

export type FoodCategory = 
  | 'Produce' 
  | 'Dairy & Eggs' 
  | 'Meat & Seafood' 
  | 'Bakery' 
  | 'Pantry' 
  | 'Frozen' 
  | 'Beverages';
```
