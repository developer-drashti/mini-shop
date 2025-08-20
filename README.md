# React + Vite MiniShop

This project is a React + Vite e-commerce site with a minimal setup, supporting admin and user flows. It includes JSON Server for backend-like functionality.

## Features

- Admin Login & Dashboard
- CRUD operations for users via `db.json`
- Product listing and detail pages
- Cart functionality with multi-quantity support
- Route protection for admin and users
- Styled components using inline `style` objects
- Persistent state via JSON Server

## Project Setup

1. **Clone the repository**

git clone `<your-repo-url>`
cd `<repo-folder>`

2. **Install dependencies**

`npm install`

3. **Start JSON Server**
`npx json-server --watch db.json --port 5000`

4. **Start the Vite development server**
`npm run dev`

5. **Access the app**
User flow: `http://localhost:5173/`
Admin flow: `http://localhost:5173/admin`

# Folder structure

```
src/
├─ components/
│  ├─ Users/
│  │  ├─ CartItem.jsx
│  │  ├─ Navbar.jsx
│  │  └─ ProductCard.jsx
│  └─ Admin/
│     ├─ Navbar.jsx
│     └─ UserForm.jsx
│     └─ UserTable.jsx
├─ routes/
│  ├─ UserRoute.jsx
│  └─ AdminRoute.jsx
├─ views/
│  ├─ Users/
│  │  ├─ HomePage.jsx
│  │  ├─ ProductPage.jsx
│  │  └─ CartPage.jsx
│  └─ Admin/
│     ├─ Login.jsx
│     └─ Dashboard.jsx
├─ App.jsx
├─ main.jsx
└─ db.json

```

# Admin Flow
- Login: Use credentials from db.json (e.g., username: admin, password: admin123).
- Dashboard: View, add, edit, delete users.
- Export/Import: Persist all users data to/from JSON.
- Route Protection: `/admin` cannot be accessed if already logged in. `/admin/dashboard` cannot be accessed if not logged in.

# User Flow
- Home Page: Browse products fetched from db.json.
- Product Page: View product details and add items to the cart (single or multi-quantity).
- Cart Page: Update quantity, remove items.
- Navbar: Persistent with cart count.

# Expanding the Project
- Add TypeScript for type safety.
- Integrate real backend API instead of JSON Server.
- Enhance styling with MUI or TailwindCSS.
- Add checkout flow