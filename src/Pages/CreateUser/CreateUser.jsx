import { Form, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

// React Hook Form
import { useForm } from "react-hook-form";

// Redux
import { useDispatch } from "react-redux";
import { loginAction } from "../../api";
import { login, setNotification } from "../../reducers";

const CreateUser = () => {
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const handleRegister = async (data) => {
    const response = await fetch(
      `
    ${process.env.REACT_APP_API_PROD}/users/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (response.status !== 201) {
      return dispatch(
        setNotification({
          open: true,
          title: "Error",
          message: "No se pudo crear el usuario",
          type: "error",
        })
      );
    }
    const success = await loginAction(data);
    if (success) {
      return dispatch(login());
    }
  };

  return (
    <div className="page">
      <Container className="page">
        <Form className="form" onSubmit={handleSubmit(handleRegister)}>
          <h2>CREACION DE USUARIO</h2>
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
          <Form.Group>
            <Form.Label>Clave de seguridad</Form.Label>
            <Form.Control
              name="securityKey"
              type="text"
              placeholder="Ingrese su clave de seguridad"
              autoComplete="current-password"
              {...register("securityKey", {
                required: "Security Key requerido",
              })}
            />
          </Form.Group>

          <br></br>

          <Button type="submit" className={"btn my-btn-primary"}>
            Crear
          </Button>

          <br></br>

          <Link to="/login">Iniciar sesión</Link>
        </Form>
      </Container>
    </div>
  );
};

export { CreateUser };
