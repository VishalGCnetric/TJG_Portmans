import React, { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, Skeleton } from "@mui/material";
import { customTheme, customerTheme } from "../Admin/them/customeThem";
import NotFound from "../Pages/Notfound"; // Corrected import path
import NavBrand from "../customer/Components/Navbar/NavBrand";
import Navbar from "../customer/Components/Navbar/Navbar";
import Footer from "../customer/Components/footer/Footer"; // Corrected import path

// Lazy load your components
const ProductDetails = lazy(() =>
  import("../customer/Components/Product/ProductDetails/ProductDetails")
);
const Product = lazy(() => import("../customer/Components/Product/Product/Product"));
const Contact = lazy(() => import("../Pages/Contact"));
const TermsCondition = lazy(() => import("../Pages/TearmsCondition")); // Corrected import path
const PrivacyPolicy = lazy(() => import("../Pages/PrivacyPolicy"));
const About = lazy(() => import("../Pages/About"));
const Homepage = lazy(() => import("../Pages/Homepage"));
const Cart = lazy(() => import("../customer/Components/Cart/Cart"));
const Order = lazy(() => import("../customer/Components/orders/Order")); // Corrected import path
const OrderDetails = lazy(() =>
  import("../customer/Components/orders/OrderDetails") // Corrected import path
);
const Checkout = lazy(() => import("../customer/Components/Checkout/Checkout"));
const PaymentSuccess = lazy(() =>
  import("../customer/Components/paymentSuccess/PaymentSuccess") 
);
const RateProduct = lazy(() =>
  import("../customer/Components/ReviewProduct/RateProduct")
);
const SignUp = lazy(() => import("../Pages/SignUp"));
const SignIn = lazy(() => import("../Pages/SignIn"));
const MyAccount = lazy(() => import("../Pages/MyAccount"));

const LoadingIndicator = () => {
  return <Skeleton animation="wave" variant="rectangular" width="100%" height="auto" />;
};

const CustomerRoutes = () => {
  const location = useLocation();

  // Only show Navigation component when not on the NotFound page
  const showNavigation = location.pathname !== "*";

  return (
    <div>
      <ThemeProvider theme={customerTheme}>
        <NavBrand />
        <Navbar />
        {/* {showNavigation && <Navigation />} */}
        <Routes>
          {/* Wrap the lazy-loaded components with Suspense */}
          
            <Route path="/" element={<Suspense fallback={<LoadingIndicator />}><Homepage /></Suspense>} />
            <Route path="/home" element={<Suspense fallback={<LoadingIndicator />}><Homepage /></Suspense>} />
            <Route path="/about" element={<Suspense fallback={<LoadingIndicator />}><About /></Suspense>} />
            <Route path="/privacy-policy" element={<Suspense fallback={<LoadingIndicator />}><PrivacyPolicy /></Suspense>} />
            <Route path="/terms-condition" element={<Suspense fallback={<LoadingIndicator />}><TermsCondition /></Suspense>} />
            <Route path="/sign-up" element={<Suspense fallback={<LoadingIndicator />}><SignUp /></Suspense>} />
            <Route path="/sign-in" element={<Suspense fallback={<LoadingIndicator />}><SignIn /></Suspense>} />
            <Route path="/my-account" element={<Suspense fallback={<LoadingIndicator />}><MyAccount /></Suspense>} />
            <Route path="/contact" element={<Suspense fallback={<LoadingIndicator />}><Contact /></Suspense>} />
            <Route path="/:lavelOne/:lavelTwo/:lavelThree" element={<Suspense fallback={<LoadingIndicator />}><Product /></Suspense>} />
            <Route path="/product/:productId" element={<Suspense fallback={<LoadingIndicator />}><ProductDetails /></Suspense>} />
            <Route path="/cart" element={<Suspense fallback={<LoadingIndicator />}><Cart /></Suspense>} />
            <Route path="/account/order" element={<Suspense fallback={<LoadingIndicator />}><Order /></Suspense>} />
            <Route path="/account/order/:orderId" element={<Suspense fallback={<LoadingIndicator />}><OrderDetails /></Suspense>} />
            <Route path="/checkout" element={<Suspense fallback={<LoadingIndicator />}><Checkout /></Suspense>} />
            <Route path="/payment/:orderId" element={<Suspense fallback={<LoadingIndicator />}><PaymentSuccess /></Suspense> }/>
            <Route path="/shops" element={<Suspense fallback={<LoadingIndicator />}><Product /></Suspense>} />
            <Route path="*" element={<Suspense fallback={<LoadingIndicator />}><NotFound/></Suspense>} />
          
        </Routes>
        <Footer />
      </ThemeProvider>
    </div>
  );
};

export default CustomerRoutes;
