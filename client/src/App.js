
import NavBar from "react-bootstrap/Navbar"
import NavbarBrand from "react-bootstrap/esm/NavbarBrand";
import {LinkContainer} from "react-router-bootstrap";
import {Routes,Route} from "react-router-dom"

import './App.css';
import { HomeScreen } from "./pages/HomeScreen";
import { ProductScreen } from "./pages/ProductScreen";
import { useContext } from "react";
import { Store } from "./Store";
import { Badge, Nav, NavDropdown } from "react-bootstrap";
import { CartScreen } from "./pages/CartScreen";
import { SignInScreen } from "./pages/SignInScreen";
import { Link } from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { ShippingAddressScreen } from "./pages/ShippingAddressScreen";
import { SignUpScreen } from "./pages/SignUpScreen";
import { PaymentMethodScreen } from "./pages/PaymentMethodScreen";
import PlaceOrderScreen from "./pages/PlaceOrderScreen";
import OrderScreen from "./pages/OrderScreen";
import { OrderHistoryScreen } from "./pages/OrderHistoryScreen";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import { ProfileScreen } from "./pages/ProfileScreen";

function App() {
  const {state:{cart,userInfo},dispatch:cxtDispatch}=useContext(Store)
  const signOutHandler=()=>{
    cxtDispatch({type:"USER_SIGNOUT"});
    localStorage.removeItem("user");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("paymentMethod")
    window.location.href='/signin';
  }
  return (
    <div className="d-flex flex-column site-container">
      <header>
        <ToastContainer position="bottom-center" limit={1}/>
        <NavBar bg="dark" variant="dark" expand="lg">
          <LinkContainer to="/">
            <NavbarBrand>
              amazona 
            </NavbarBrand>
          </LinkContainer>
          <NavbarToggle aria-controls="basic-navbar-nav"/>
          <NavbarCollapse id="basic-navbar-nav">
          <Nav className="me-auto w-100 justify-content-end">
            <Link to="/cart">
            Cart {cart.cartItems.length>0 && <Badge bg="danger" pill>{cart.cartItems.reduce((a,c)=>a+c.quantity,0)}</Badge> }
            </Link>
            {userInfo ? (
              <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                <LinkContainer to="/profile">
                <NavDropdown.Item>User Profile</NavDropdown.Item>
                </LinkContainer>
                  
                <LinkContainer to="/orderhistory">
                <NavDropdown.Item>Order history</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider/>
                <Link className="dropdown-item" to="#signout" onClick={signOutHandler}>Sign Out</Link>
              </NavDropdown>
            ):(
              <Link to="/signin" className="nav-link">Sign in</Link>
            )
          }
          </Nav>
          </NavbarCollapse>
        </NavBar>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomeScreen/>}/>
          <Route path="/products/:id" element={<ProductScreen/>}/>
          <Route path="/signin" element={<SignInScreen/>}/>
          <Route path="/signup" element={<SignUpScreen/>}/>
          <Route path="/cart" element={<CartScreen/>}/>
          <Route path="/payment" element={<PaymentMethodScreen/>}/>
          <Route path="/shipping" element={<ShippingAddressScreen/>}/>
          <Route path="/placeorder" element={<PlaceOrderScreen/>}/>
          <Route path="/orderhistory" element={<OrderHistoryScreen/>}/>
          <Route path="/order/:id" element={<OrderScreen/>}/>
          <Route path="/profile" element={<ProfileScreen/>}/>
        </Routes>
      </main>
      <footer className="text-center">
        All rights reserved
      </footer>
    </div>
  );
}

export default App;
