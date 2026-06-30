"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Course, seedCourses } from "@/data/seedCourses";

type CourseStore = {
  courses: Course[];
  isHydrated: boolean;
  addCourse: (c: Course) => void;
  updateCourse: (id: string, patch: Partial<Course>) => void;
  removeCourse: (id: string) => void;
  resetToSeed: () => void;
  setHydrated: () => void;
};

export const useCourseStore = create<CourseStore>()(
  persist(
    (set) => ({
      courses: seedCourses,
      isHydrated: false,
      addCourse: (c) =>
        set((state) => ({ courses: [c, ...state.courses] })),
      updateCourse: (id, patch) =>
        set((state) => ({
          courses: state.courses.map((c) =>
            c.id === id ? { ...c, ...patch } : c
          ),
        })),
      removeCourse: (id) =>
        set((state) => ({
          courses: state.courses.filter((c) => c.id !== id),
        })),
      resetToSeed: () => set({ courses: seedCourses }),
      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: "codern-courses-v1",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);

type AuthStore = {
  isAdmin: boolean;
  login: () => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAdmin: false,
      login: () => set({ isAdmin: true }),
      logout: () => set({ isAdmin: false }),
    }),
    { name: "codern-auth-v1" }
  )
);

export type CartItem = { courseId: string; addedAt: string };

type CartStore = {
  items: CartItem[];
  addToCart: (courseId: string) => void;
  removeFromCart: (courseId: string) => void;
  clearCart: () => void;
  has: (courseId: string) => boolean;
  count: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (courseId) =>
        set((state) =>
          state.items.some((i) => i.courseId === courseId)
            ? state
            : {
                items: [
                  ...state.items,
                  { courseId, addedAt: new Date().toISOString() },
                ],
              }
        ),
      removeFromCart: (courseId) =>
        set((state) => ({
          items: state.items.filter((i) => i.courseId !== courseId),
        })),
      clearCart: () => set({ items: [] }),
      has: (courseId) => get().items.some((i) => i.courseId === courseId),
      count: () => get().items.length,
    }),
    { name: "codern-cart-v1" }
  )
);
