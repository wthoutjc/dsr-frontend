import swal from "sweetalert";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { login, setNotification } from "../reducers";

// Components
import { PublicRoutes, PrivateRoutes } from "./";

const Router = () => {
  const dispatch = useDispatch();

  const { loading, notification } = useSelector((state) => state.ui);
  const { open, title, message, type } = notification;

  const { user } = useSelector((state) => state.auth);
  const { logged } = user;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(login());
    }
  }, [dispatch]);

  useEffect(() => {
    if (open) {
      swal({
        title,
        message,
        icon: type ? "success" : "success",
        button: type ? "OK" : "OK",
      });
      dispatch(
        setNotification({
          open: false,
          title: "",
          message: "",
          type: null,
        })
      );
    }
  }, [dispatch, open, type, message, title]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {logged ? (
          <Route path="/*" element={<PrivateRoutes />} />
        ) : (
          <Route path="/*" element={<PublicRoutes />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export { Router };
