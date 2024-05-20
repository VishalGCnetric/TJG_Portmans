import React, { lazy, Suspense } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Backdrop, CircularProgress, Skeleton } from "@mui/material";
import { customerTheme } from "../Admin/them/customeThem";
import NotFound from "../Pages/Notfound";
import NavBrand from "../customer/Components/Navbar/NavBrand";
import Navbar from "../customer/Components/Navbar/Navbar";
import Footer from "../customer/Components/footer/Footer";
import { useSelector } from "react-redux";
import { Toaster } from 'react-hot-toast'; // Importing Toaster for notifications

const ProductDetails = lazy(() =>
  import("../customer/Components/Product/ProductDetails/ProductDetails")
);
const Product = lazy(() => import("../customer/Components/Product/Product/Product"));
const Contact = lazy(() => import("../Pages/Contact"));
const TermsCondition = lazy(() => import("../Pages/TearmsCondition"));
const PrivacyPolicy = lazy(() => import("../Pages/PrivacyPolicy"));
const About = lazy(() => import("../Pages/About"));
const Homepage = lazy(() => import("../Pages/Homepage"));
const Cart = lazy(() => import("../customer/Components/Cart/Cart"));
const Order = lazy(() => import("../customer/Components/orders/Order"));
const OrderDetails = lazy(() =>
  import("../customer/Components/orders/OrderDetails")
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
  return (
    <>
      <Skeleton animation="wave" variant="rectangular" width="100%" height="100vh" />
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: '100vw',
          height: '100vh',
        }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector(state => state.auth.auth);
  const location = useLocation();

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/sign-in" state={{ from: location }} replace />
  );
};

const CustomerRoutes = () => {
  const location = useLocation();
  const showNavigation = location.pathname !== "*";

  return (
    <div>
      <ThemeProvider theme={customerTheme}>
        <Toaster /> {/* Adding Toaster for notifications */}
        <NavBrand />
        <Navbar />
        <Routes>
          <Route path="/" element={<Suspense fallback={<LoadingIndicator />}><Homepage /></Suspense>} />
          <Route path="/home" element={<Suspense fallback={<LoadingIndicator />}><Homepage /></Suspense>} />
          <Route path="/about" element={<Suspense fallback={<LoadingIndicator />}><About /></Suspense>} />
          <Route path="/privacy-policy" element={<Suspense fallback={<LoadingIndicator />}><PrivacyPolicy /></Suspense>} />
          <Route path="/terms-condition" element={<Suspense fallback={<LoadingIndicator />}><TermsCondition /></Suspense>} />
          <Route path="/sign-up" element={<Suspense fallback={<LoadingIndicator />}><SignUp /></Suspense>} />
          <Route path="/sign-in" element={<Suspense fallback={<LoadingIndicator />}><SignIn /></Suspense>} />
          {/* Private routes */}
          <Route path="/my-account" element={<PrivateRoute><Suspense fallback={<LoadingIndicator />}><MyAccount /></Suspense></PrivateRoute>} />
          <Route path="/contact" element={<Suspense fallback={<LoadingIndicator />}><Contact /></Suspense>} />
          <Route path="/:lavelOne/:lavelTwo/:lavelThree" element={<PrivateRoute><Suspense fallback={<LoadingIndicator />}><Product /></Suspense></PrivateRoute>} />
          <Route path="/product/:productId" element={<Suspense fallback={<LoadingIndicator />}><ProductDetails /></Suspense>} />
          <Route path="/cart" element={<PrivateRoute><Suspense fallback={<LoadingIndicator />}><Cart /></Suspense></PrivateRoute>} />
          <Route path="/account/order" element={<Suspense fallback={<LoadingIndicator />}><Order /></Suspense>} />
          <Route path="/account/order/:orderId" element={<PrivateRoute><Suspense fallback={<LoadingIndicator />}><OrderDetails /></Suspense></PrivateRoute>} />
          <Route path="/checkout" element={<PrivateRoute><Suspense fallback={<LoadingIndicator />}><Checkout /></Suspense></PrivateRoute>} />
          <Route path="/payment/:orderId" element={<Suspense fallback={<LoadingIndicator />}><PaymentSuccess /></Suspense>} />
          <Route path="/shops" element={<Suspense fallback={<LoadingIndicator />}><Product /></Suspense>} />
          {/* Not found route */}
          <Route path="*" element={<Suspense fallback={<LoadingIndicator />}><NotFound /></Suspense>} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </div>
  );
};

export default CustomerRoutes;
