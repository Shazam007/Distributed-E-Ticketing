import ScrollToTop from "@/components/common/ScrollTop";
import "../public/assets/scss/index.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages";
import ScrollTopBehaviour from "./components/common/ScrollTopBehaviour";
import NotFoundPage from "./pages/not-found";
import LoginPage from "./pages/others/login";
import RegisterPage from "./pages/others/register";
import PaymentSuccess from "./pages/payment-success";
import Port from "./pages/port";
import EventDetails from "./pages/event-details";
import PaymentPage from "./pages/others/payment";

if (typeof window !== "undefined") {
  import("bootstrap");
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route
              path="event-details/:id"
              element={<EventDetails />}
            />
            <Route path="404" element={<NotFoundPage />} />
            <Route path="payment" element={<PaymentPage />} />
            <Route path="payment/results" element={<PaymentSuccess />} />
            <Route path="port" element={<Port />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
        <ScrollToTop />
        <ScrollTopBehaviour />
      </BrowserRouter>
    </>
  );
}

export default App;
