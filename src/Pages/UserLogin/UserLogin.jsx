import { Button, Form, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

// React Hook Form
import { useForm } from "react-hook-form";

// Actions
import { loginAction } from "../../api";

// Redux
import { useDispatch } from "react-redux";
import { login } from "../../reducers";
import { useState } from "react";

const UserLogin = () => {
  const [error, setError] = useState({
    open: false,
    message: "",
  });

  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const handleLogin = async (data) => {
    const success = await loginAction(data);
    if (success) {
      return dispatch(login());
    }
    return setError({ open: true, message: "Invalid username or password" });
  };

  return (
    <div className="page">
      <Container className="page">
        <Form className="form" onSubmit={handleSubmit(handleLogin)}>
          <h2>LOGIN</h2>
          <Form.Group>
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              name="username"
              type="text"
              placeholder="Ingrese su usuario"
              autoComplete="username"
              {...register("username", {
                required: "Usuario requerido",
              })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Ingrese su password"
              autoComplete="current-password"
              {...register("password", {
                required: "Password requerido",
              })}
            />
          </Form.Group>

          <br></br>

          {error.open && (
            <div className="alert alert-danger" role="alert">
              {error.message}
            </div>
          )}

          <Button type="submit" className={"btn my-btn-primary"}>
            Login
          </Button>

          <br></br>

          <Link to="/create-user">Crea un nuevo usuario</Link>
        </Form>
      </Container>
    </div>
  );
};

export { UserLogin };
