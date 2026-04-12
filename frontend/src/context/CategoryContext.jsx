// src/context/CategoryContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { DEFAULT_CATEGORIES } from "../data/categories";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState(() => {
    // Load from localStorage (admin saved data) or use defaults
    try {
      const saved = localStorage.getItem("taasa_categories");
      return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
    } catch {
      return DEFAULT_CATEGORIES;
    }
  });

  // Auto-save to localStorage whenever categories change
  useEffect(() => {
    localStorage.setItem("taasa_categories", JSON.stringify(categories));
  }, [categories]);

  // ── CRUD Operations ──────────────────────────────────────────

  // Add a brand new category → auto-generates slug & route
  const addCategory = (newCat) => {
    const slug = newCat.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    const category = {
      id:          slug,
      slug,
      name:        newCat.name,
      tagline:     newCat.tagline     || "",
      description: newCat.description || "",
      heroImage:   newCat.heroImage   || "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1800&q=85",
      badge:       newCat.badge       || "New",
      badgeColor:  newCat.badgeColor  || "#C49138",
      features:    newCat.features    || [],
      active:      true,
      order:       categories.length + 1,
      products:    [],
    };

    setCategories(prev => [...prev, category]);
    return category; // return so admin can navigate to new page
  };

  // Edit existing category
  const updateCategory = (slug, updates) => {
    setCategories(prev =>
      prev.map(cat => cat.slug === slug ? { ...cat, ...updates } : cat)
    );
  };

  // Delete category
  const deleteCategory = (slug) => {
    setCategories(prev => prev.filter(cat => cat.slug !== slug));
  };

  // Toggle category active/inactive
  const toggleCategory = (slug) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.slug === slug ? { ...cat, active: !cat.active } : cat
      )
    );
  };

  // Add product to a category
  const addProduct = (categorySlug, product) => {
    const id = `${categorySlug}-${Date.now()}`;
    const newProduct = { id, ...product };
    setCategories(prev =>
      prev.map(cat =>
        cat.slug === categorySlug
          ? { ...cat, products: [...cat.products, newProduct] }
          : cat
      )
    );
  };

  // Update product
  const updateProduct = (categorySlug, productId, updates) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.slug === categorySlug
          ? { ...cat, products: cat.products.map(p => p.id === productId ? { ...p, ...updates } : p) }
          : cat
      )
    );
  };

  // Delete product
  const deleteProduct = (categorySlug, productId) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.slug === categorySlug
          ? { ...cat, products: cat.products.filter(p => p.id !== productId) }
          : cat
      )
    );
  };

  // Reorder categories
  const reorderCategories = (orderedSlugs) => {
    setCategories(prev => {
      const map = Object.fromEntries(prev.map(c => [c.slug, c]));
      return orderedSlugs.map((slug, i) => ({ ...map[slug], order: i + 1 }));
    });
  };

  const activeCategories = categories
    .filter(c => c.active)
    .sort((a, b) => a.order - b.order);

  return (
    <CategoryContext.Provider value={{
      categories,
      activeCategories,
      addCategory,
      updateCategory,
      deleteCategory,
      toggleCategory,
      addProduct,
      updateProduct,
      deleteProduct,
      reorderCategories,
      getCategoryBySlug: (slug) => categories.find(c => c.slug === slug),
    }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => useContext(CategoryContext);