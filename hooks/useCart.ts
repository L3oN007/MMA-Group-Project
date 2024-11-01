import { useEffect, useState } from "react";

import useAuthStore from "@/stores/useAuthStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { IFish } from "@/types/fish.type";

type UseCartReturn = {
  cart: IFish[];
  addToCart: (fish: IFish) => Promise<void>;
  removeFromCart: (fishId: number) => Promise<void>;
  isInCart: (fishId: number) => boolean;
  clearCart: () => Promise<void>;
  loadCart: () => Promise<void>;
};

export function useCart(): UseCartReturn {
  const { user } = useAuthStore();
  const [cart, setCart] = useState<IFish[]>([]);
  const storageKey = `cart_${user?.id}`;

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const cartData = await AsyncStorage.getItem(storageKey);
      setCart(cartData ? JSON.parse(cartData) : []);
    } catch (error) {
      console.error("Failed to load cart:", error);
    }
  };

  const saveCart = async (newCart: IFish[]) => {
    try {
      await AsyncStorage.setItem(storageKey, JSON.stringify(newCart));
      setCart(newCart);
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  };

  const addToCart = async (fish: IFish) => {
    if (!isInCart(fish.id)) {
      const newCart = [...cart, fish];
      await saveCart(newCart);
    }
  };

  const removeFromCart = async (fishId: number) => {
    const newCart = cart.filter((fish) => fish.id !== fishId);
    await saveCart(newCart);
  };

  const isInCart = (fishId: number) => cart.some((fish) => fish.id === fishId);

  const clearCart = async () => {
    await AsyncStorage.removeItem(storageKey);
    setCart([]);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    isInCart,
    clearCart,
    loadCart,
  };
}
