export type MeasurementUnit = 'g' | 'kg' | 'oz' | 'lbs' | 'ml' | 'l' | 'piece' | 'pack' | 'tbsp' | 'tsp' | 'cup';

export type FoodCategory = 
  | 'Produce' 
  | 'Dairy & Eggs' 
  | 'Meat & Seafood' 
  | 'Bakery' 
  | 'Pantry' 
  | 'Frozen' 
  | 'Beverages';

export interface NutritionalInfo {
  calories: number;       // e.g., kcal per serving or per 100g
  fat: number;            // in grams
  protein: number;        // in grams
  carbohydrates: number;  // in grams
}

export interface FoodItem {
  id: string;               // Unique identifier (UUID)
  name: string;             // Name of the food (e.g., "Greek Yogurt")
  brand?: string;           // Optional brand name
  category: FoodCategory;   // Enum or string literal for sorting
  
  unit: MeasurementUnit;    // e.g., "grams", "pieces", "ounces"
  
  // Nutrition & Serving Data
  servingSize: number;      // The amount that the nutrition info is based on
  servingUnit: string;      // e.g., "g", "ml", "cup"
  nutrition: NutritionalInfo; 
  
  // Metadata
  createdAt: string; // Using string for Date to simplify JSON serialization
  updatedAt: string;
  
  // Inventory status
  isInInventory: boolean;
}

export interface ConsumedItem extends FoodItem {
  consumedId: string; // Unique ID for this specific consumption instance
  amount: number;     // Number of servings consumed
  date: string;       // ISO date string
}
