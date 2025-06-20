
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AppointmentsPage from "./pages/AppointmentsPage";
import BookPage from "./pages/BookPage";
import NotFound from "./pages/NotFound";
import { Toaster } from "./components/ui/sonner";
import { services } from "./data/servicesData";
import ServiceSchema from "./components/ServiceSchema";

function App() {
  return (
    <Router>
      <ServiceSchema services={services} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/book" element={<BookPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
