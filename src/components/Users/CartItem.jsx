const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  return (
    <div
      style={{
        borderBottom: "1px solid #ccc",
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <h4>{item.name}</h4>
        <p>Price: ₹{item.price}</p>
        <p>Quantity: {item.quantity}</p>
      </div>

      <div>
        <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
        <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
        <button onClick={() => onRemove(item.id)} style={{ marginLeft: "10px" }}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
