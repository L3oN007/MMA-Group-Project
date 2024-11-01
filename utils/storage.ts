import AsyncStorage from "@react-native-async-storage/async-storage";

import { IFish } from "@/types/fish.type";

const CART_KEY = "user_cart";

// Get cart items from storage
export const getCartItems = async (): Promise<IFish[]> => {
  const jsonValue = await AsyncStorage.getItem(CART_KEY);
  return jsonValue ? JSON.parse(jsonValue) : [];
};

// Save cart items to storage
export const saveCartItems = async (items: IFish[]) => {
  const jsonValue = JSON.stringify(items);
  await AsyncStorage.setItem(CART_KEY, jsonValue);
};

// Add item to cart
export const addToCart = async (fish: IFish) => {
  const cart = await getCartItems();
  const updatedCart = [...cart, fish];
  await saveCartItems(updatedCart);
};

// Remove item from cart
export const removeFromCart = async (fishId: number) => {
  const cart = await getCartItems();
  const updatedCart = cart.filter((item) => item.id !== fishId);
  await saveCartItems(updatedCart);
};
