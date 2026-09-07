import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  bookId: string;
  slug: string;
  title: string;
  coverImage: string;
  type: "standard" | "custom";
  quantity: number;
  unitPrice: number;
  customDraft?: string;
};

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (bookId: string, type: "standard" | "custom") => void;
  updateQuantity: (bookId: string, type: "standard" | "custom", quantity: number) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const existing = get().items.find(
          (i) => i.bookId === item.bookId && i.type === item.type
        );
        if (existing && item.type === "standard") {
          set({
            items: get().items.map((i) =>
              i.bookId === item.bookId && i.type === item.type
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          });
        } else {
          set({ items: [...get().items, item] });
        }
      },
      removeItem: (bookId, type) =>
        set({
          items: get().items.filter(
            (i) => !(i.bookId === bookId && i.type === type)
          ),
        }),
      updateQuantity: (bookId, type, quantity) =>
        set({
          items: get().items.map((i) =>
            i.bookId === bookId && i.type === type ? { ...i, quantity } : i
          ),
        }),
      clear: () => set({ items: [] }),
    }),
    { name: "cuentos-arav-cart" }
  )
);
