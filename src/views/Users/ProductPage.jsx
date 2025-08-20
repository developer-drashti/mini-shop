import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductPage = ({ onAddToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return <div style={{ padding: 40, textAlign: "center" }}>Loading...</div>;

  if (error)
    return (
      <div style={{ padding: 40, textAlign: "center", color: "#ff4d4f" }}>
        <h3>{error}</h3>
      </div>
    );

  const containerStyle = {
    padding: 40,
    maxWidth: 600,
    margin: "50px auto",
    border: "1px solid #ddd",
    borderRadius: 16,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  };

  const titleStyle = { fontSize: 28, fontWeight: 700, marginBottom: 16 };
  const descStyle = { fontSize: 16, color: "#555", marginBottom: 12 };
  const priceStyle = { fontSize: 20, fontWeight: 600, marginBottom: 20 };
  const qtyButtonStyle = {
    padding: "6px 12px",
    borderRadius: 12,
    border: "1px solid #ccc",
    background: "#fff",
    cursor: "pointer",
    fontSize: 16,
    fontWeight: 600,
  };
  const qtyDisplayStyle = {
    padding: "6px 12px",
    minWidth: 40,
    textAlign: "center",
    fontSize: 16,
    fontWeight: 600,
  };
  const addButtonStyle = {
    padding: "10px 20px",
    fontSize: 16,
    fontWeight: 600,
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    backgroundColor: "#000",
    color: "#fff",
    marginLeft: 12,
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>{product.name}</h2>
      <p style={descStyle}>{product.description}</p>
      <p style={priceStyle}>Price: ₹{product.price}</p>

      <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
        <label style={{ marginRight: 8, fontWeight: 600 }}>Quantity:</label>
        <button
          style={qtyButtonStyle}
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
        >
          −
        </button>
        <span style={qtyDisplayStyle}>{quantity}</span>
        <button
          style={qtyButtonStyle}
          onClick={() => setQuantity((q) => q + 1)}
        >
          +
        </button>
        <button
          style={addButtonStyle}
          onClick={() => onAddToCart({ ...product, quantity })}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
