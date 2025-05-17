
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

export interface CartItem {
  id: string;
  title: string;
  price: number;
  coverImageUrl: string | null;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  
  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: CartItem) => {
    setItems(currentItems => {
      // Check if the item already exists in the cart
      const existingItemIndex = currentItems.findIndex(item => item.id === newItem.id);
      
      if (existingItemIndex > -1) {
        // Item exists, increment quantity
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex].quantity += 1;
        toast.success(`${newItem.title} quantity increased`, {
          description: `Cart updated to ${updatedItems[existingItemIndex].quantity} copies`
        });
        return updatedItems;
      } else {
        // Add new item with quantity 1
        toast.success(`${newItem.title} added to cart`, {
          description: "Book added to your cart"
        });
        return [...currentItems, { ...newItem, quantity: 1 }];
      }
    });
  };

  const removeItem = (id: string) => {
    setItems(currentItems => {
      const itemToRemove = currentItems.find(item => item.id === id);
      const updatedItems = currentItems.filter(item => item.id !== id);
      if (itemToRemove) {
        toast.info(`${itemToRemove.title} removed from cart`);
      }
      return updatedItems;
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    
    setItems(currentItems => 
      currentItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast.info("Cart cleared");
  };

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  );

  return (
    <CartContext.Provider value={{ 
      items, 
      addItem, 
      removeItem, 
      updateQuantity, 
      clearCart, 
      itemCount,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
