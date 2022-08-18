import { Routes, Route, Navigate } from "react-router-dom";

// Components
import { ServiciosPage, NosotrosPage, HomePage } from "../Pages";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/nosotros" element={<NosotrosPage />} />
      <Route path="/servicios" element={<ServiciosPage />} />
      <Route path="/*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export { PrivateRoutes };

// <Navigate to="/" />
