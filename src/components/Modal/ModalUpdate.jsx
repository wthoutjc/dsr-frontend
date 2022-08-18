import PropTypes from "prop-types";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

// React Hook Form
import { useForm } from "react-hook-form";

// Redux
import { useDispatch, useSelector } from "react-redux/es/exports";
import { setNotification, setModal, setRequest } from "../../reducers";

// API
import { deleteAPI, uploadAPI } from "../../api";

const ModalUpdate = ({ item }) => {
  const dispatch = useDispatch();
  const { modal } = useSelector((state) => state.ui);

  const { register, handleSubmit } = useForm();

  const [currentImage, setCurrentImage] = useState(item.image);

  const handleUpdate = async (data) => {
    // DELETE
    let response;
    const id = modal.id ? modal.id : item._id || item.id;

    if (modal.id) {
      response = await deleteAPI(id, modal.section, item);
    } else {
      response = await deleteAPI(id, modal.section);
    }
    const [success, deleteResponse] = response;
    if (success) {
      // UPLOAD
      if (modal.id) {
        response = await uploadAPI(data, modal.section, id);
      } else {
        response = await uploadAPI(data, modal.section);
      }

      const [success, uploadResponse] = response;

      if (success) {
        const payload = {
          open: true,
          title: "Success",
          message: uploadResponse,
          type: "success",
        };

        dispatch(setNotification(payload));
        dispatch(
          setModal({
            open: false,
            title: "",
            type: null,
            section: null,
          })
        );
        dispatch(setRequest(true));
      }
    } else {
      const payload = {
        open: true,
        title: "Error",
        message: deleteResponse,
        type: "danger",
      };

      dispatch(setNotification(payload));
      dispatch(
        setModal({
          open: false,
          title: "",
          type: null,
          section: null,
        })
      );
    }
  };

  if (modal.section === "servicios" && !modal.item.id) {
    return (
      <div className="container mt-5">
        <div className="card p-3">
          <Form onSubmit={handleSubmit(handleUpdate)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nombre del servicio</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del servicio"
                autoComplete="name"
                defaultValue={item.name}
                {...register("name", {
                  required: "Nombre requerido",
                })}
              />
            </Form.Group>
            <br />
            <Button type="submit">Actualizar</Button>
          </Form>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mt-5">
        <div className="card p-3">
          <form onSubmit={handleSubmit(handleUpdate)}>
            <Form.Group>
              {item.title && (
                <div className="row">
                  <Form.Label>
                    <h5> Modifique el titulo</h5>
                  </Form.Label>
                  <Form.Control
                    name="title"
                    type="text"
                    className="form-control"
                    placeholder="Ingrese el titulo"
                    autoComplete="title"
                    defaultValue={item.title}
                    {...register("title", {
                      required: "Título requerido",
                    })}
                  />
                </div>
              )}
              {item.text && (
                <div className="row">
                  <Form.Label>
                    <h5> Modifique el texto</h5>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    placeholder="Ingrese el texto"
                    autoComplete="text"
                    defaultValue={item.text}
                    {...register("text", {
                      required: "Texto requerido",
                    })}
                  />
                </div>
              )}
              {item.content && (
                <div className="row">
                  <Form.Label>
                    <h5> Modifique el contenido</h5>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    placeholder="Ingrese el contenido"
                    autoComplete="content"
                    defaultValue={item.content}
                    {...register("content", {
                      required: "Contenido requerido",
                    })}
                  />
                </div>
              )}
              {item.section && (
                <div className="row">
                  <Form.Label>
                    <h5> Modifique la sección</h5>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    placeholder="Ingrese la sección"
                    autoComplete="sectiom"
                    defaultValue={item.section}
                    {...register("section", {
                      required: "Sección requerido",
                    })}
                  />
                </div>
              )}
              {item.image && (
                <>
                  <div className="row">
                    <Form.Label>
                      <h5> Seleccione una imagen</h5>
                    </Form.Label>
                    <div className="col-10">
                      <Form.Control
                        id="fileinput"
                        className="form-control"
                        type="file"
                        {...register("image", {
                          required: "Imagen requerida",
                        })}
                        onChange={(e) => {
                          setCurrentImage(
                            URL.createObjectURL(e.target.files[0])
                          );
                        }}
                      />
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-10">
                      <img
                        src={currentImage}
                        alt="update-pic"
                        style={{
                          width: "50%",
                          height: "auto",
                        }}
                      />
                    </div>
                  </div>
                </>
              )}
              <br />
              <Button type="submit">Actualizar</Button>
            </Form.Group>
          </form>
        </div>
      </div>
    </>
  );
};

ModalUpdate.propTypes = {
  item: PropTypes.object.isRequired,
};

export { ModalUpdate };
