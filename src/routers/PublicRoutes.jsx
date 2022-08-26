import { Routes, Route, Navigate } from "react-router-dom";

// Components
import { UserLogin, CreateUser } from "../Pages";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<UserLogin />} />
      <Route path="/create-user" element={<CreateUser />} />
      <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export { PublicRoutes };
