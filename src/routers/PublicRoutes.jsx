import { Routes, Route, Navigate } from "react-router-dom";

// Components
import { UserLogin, CreateUser } from "../Pages";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLogin />} />
      <Route path="/create-user" element={<CreateUser />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export { PublicRoutes };
