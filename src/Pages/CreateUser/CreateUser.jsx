import { Form, Container, Button } from "react-bootstrap";

// React Hook Form
import { useForm } from "react-hook-form";

const CreateUser = () => {
  const { register, handleSubmit } = useForm();

  const handleRegister = async (data) => {
    console.log(data);
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
        </Form>
      </Container>
    </div>
  );
};

export { CreateUser };
