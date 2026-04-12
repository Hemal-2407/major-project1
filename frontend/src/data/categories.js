// src/data/categories.js
// This is the DEFAULT data. Admin can add/edit/delete via AdminPanel.
// Data is saved to localStorage so it persists between sessions.

export const DEFAULT_CATEGORIES = [
  {
    id: "platinum-collection",
    slug: "/PlatinumCollection",          // used in URL: /products/platinum-collection
    name: "The Platinum Collection",
    tagline: "Premium Grade uPVC",
    description:
      "Our finest grade uPVC profiles — ultra-gloss, UV-stabilised, and engineered for luxury residential and commercial interiors.",
    heroImage:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1800&q=85",
    badge: "Premium",
    badgeColor: "#C49138",
    features: ["UV Stabilised", "Ultra Gloss", "18–25mm Thick", "25+ Year Colour"],
    active: true,
    order: 1,
    products: [
      {
        id: "tsp-5007",
        code: "TSP-5007",
        name: "Ivory White Panel",
        color: "#F5F0E0",
        img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
        type: "solid",
        thickness: "18mm",
        inStock: true,
      },
      {
        id: "tsp-116",
        code: "TSP-116",
        name: "Matte White",
        color: "#EEE9DC",
        img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&q=80",
        type: "solid",
        thickness: "18mm",
        inStock: true,
      },
      {
        id: "tsp-504",
        code: "TSP-504",
        name: "Sand Beige",
        color: "#D9C9A8",
        img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?w=400&q=80",
        type: "solid",
        thickness: "20mm",
        inStock: true,
      },
    ],
  },
  {
    id: "regular-collection",
    slug: "regular-collection",
    name: "The Regular Collection",
    tagline: "Best Value uPVC",
    description:
      "High-performance uPVC products at accessible price points — without compromising on quality or durability.",
    heroImage:
      "https://images.unsplash.com/photo-1585128792020-803d29415281?w=1800&q=85",
    badge: "Value",
    badgeColor: "#4A7C59",
    features: ["Cost Effective", "12–18mm Thick", "10–15 Year Colour", "Termite Proof"],
    active: true,
    order: 2,
    products: [
      {
        id: "tsr-101",
        code: "TSR-101",
        name: "Classic White",
        color: "#F0EDE4",
        img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400&q=80",
        type: "solid",
        thickness: "12mm",
        inStock: true,
      },
      {
        id: "tsr-202",
        code: "TSR-202",
        name: "Light Gray",
        color: "#C8C4BC",
        img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80",
        type: "solid",
        thickness: "15mm",
        inStock: true,
      },
    ],
  },
  {
    id: "wpc-pvc-louvers",
    slug: "wpc-pvc-louvers",
    name: "WPC & PVC Louvers",
    tagline: "Ventilation & Décor",
    description:
      "Elegant WPC and PVC louver panels for partitions, facades, and decorative ventilation — combining style with function.",
    heroImage:
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1800&q=85",
    badge: "Décor",
    badgeColor: "#5B4FCF",
    features: ["Weather Resistant", "Easy Install", "Custom Sizes", "Multiple Finishes"],
    active: true,
    order: 3,
    products: [
      {
        id: "wpc-301",
        code: "WPC-301",
        name: "Natural Wood Louver",
        color: "#8B6914",
        img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
        type: "wpc",
        thickness: "10mm",
        inStock: true,
      },
    ],
  },
];