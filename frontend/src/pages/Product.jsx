import React from "react";

export default function Products() {
  const products = [
    {
      name: "The platinum collection",
      price: "₹25,000",
      image: "https://images.unsplash.com/photo-1582582621959-48d27397dc69",
    },
    {
      name: "The regular collections",
      price: "₹15,000",
      image: "https://images.unsplash.com/photo-1567016549631-3e2d2c2f9b74",
    },
    {
      name: "WPC & PVC",
      price: "₹5,000",
      image: "https://images.unsplash.com/photo-1598300056203-3f9a9d9b8f7b",
    },
    {
      name: "Luxury Sofa",
      price: "₹30,000",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
    },
  ];

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ textAlign: "center" }}>All Products</h1>

      <div className="grid">
        {products.map((item, index) => (
          <div className="card" key={index}>
            <img src={item.image} />
            <h3>{item.name}</h3>
            <p>{item.price}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}