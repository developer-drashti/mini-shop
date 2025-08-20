import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, onAddToCart }) => {
  const navigate = useNavigate();

  const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: "16px",
    padding: "16px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    transition: "0.3s",
    cursor: "pointer",
  };

  const cardHoverStyle = {
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  };

  const buttonStyle = {
    padding: "8px 16px",
    borderRadius: "12px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    cursor: "pointer",
    marginLeft: "8px",
  };

  const priceStyle = {
    fontWeight: "600",
  };

  return (
    <div
      style={cardStyle}
      onMouseOver={(e) => (e.currentTarget.style.boxShadow = cardHoverStyle.boxShadow)}
      onMouseOut={(e) => (e.currentTarget.style.boxShadow = cardStyle.boxShadow)}
    >
      <h3 style={{ fontSize: "18px", fontWeight: "600" }}>{product.name}</h3>
      <p style={{ color: "#555", fontSize: "14px" }}>{product.description}</p>
      <div style={{ marginTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={priceStyle}>₹ {product.price}</span>
        <div>
          <button style={buttonStyle} onClick={() => navigate(`/product/${product.id}`)}>
            View
          </button>
          <button style={buttonStyle} onClick={() => onAddToCart({ ...product, quantity: 1 })}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
