import { Link } from "react-router-dom";

const NavBar = ({ cartCount }) => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        background: "#282c34",
        color: "white",
      }}
    >
      <div>
        <Link to="/" style={{ color: "white", marginRight: "20px" }}>
          Home
        </Link>
      </div>
      <div>
        <Link to="/cart" style={{ color: "white" }}>
          🛒 Cart ({cartCount})
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
