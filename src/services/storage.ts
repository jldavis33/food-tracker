import type { FoodItem, ConsumedItem } from '../types';

const STORAGE_KEYS = {
  FOOD_ITEMS: 'food_tracker_items',
  CONSUMED_ITEMS: 'food_tracker_consumed',
};

export const storageService = {
  getFoodItems: (): FoodItem[] => {
    const data = localStorage.getItem(STORAGE_KEYS.FOOD_ITEMS);
    return data ? JSON.parse(data) : [];
  },

  saveFoodItems: (items: FoodItem[]): void => {
    localStorage.setItem(STORAGE_KEYS.FOOD_ITEMS, JSON.stringify(items));
  },

  getConsumedItems: (): ConsumedItem[] => {
    const data = localStorage.getItem(STORAGE_KEYS.CONSUMED_ITEMS);
    return data ? JSON.parse(data) : [];
  },

  saveConsumedItems: (items: ConsumedItem[]): void => {
    localStorage.setItem(STORAGE_KEYS.CONSUMED_ITEMS, JSON.stringify(items));
  },
};
