import PropTypes from "prop-types";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setNotification, setModal, setRequest } from "../../reducers";

// React Hook Form
import { useForm } from "react-hook-form";

// API
import { uploadAPI } from "../../api";

const SectionADAPTER = {
  clientes: "clients",
  aliados: "allies",
};

const ModalAdd = ({ item }) => {
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();
  const { modal } = useSelector((state) => state.ui);
  const [currentImage, setCurrentImage] = useState(null);

  const handleUpload = async (data) => {
    const [success, uploadResponse] = await uploadAPI(
      modal.section === "services" ? data : { ...data, section: modal.section },
      modal.section,
      item
    );

    if (success) dispatch(setRequest(true));
    const payload = {
      open: true,
      title: success ? "Éxito" : "Error",
      message: uploadResponse,
      type: success ? "success" : "danger",
    };
    dispatch(setNotification(payload));

    dispatch(
      setModal({
        open: false,
        title: "",
        type: null,
        section: SectionADAPTER[modal.section],
      })
    );
  };

  return (
    <>
      <div className="container mt-5">
        <div className="card p-3">
          <form onSubmit={handleSubmit(handleUpload)}>
            {modal.section === "services" && !item && (
              <>
                <div className="row">
                  <h5>Nombre del servicio </h5>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre del servicio"
                    autoComplete="name"
                    {...register("name", {
                      required: "Nombre requerido",
                    })}
                  />
                </div>

                <br />
              </>
            )}
            {(modal.section === "tarjetas" ||
              modal.section === "contacto" ||
              item) && (
              <>
                <div className="row">
                  <h5>Agrege un titulo</h5>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Titulo"
                    autoComplete="title"
                    {...register("title", {
                      required: "Título requerido",
                    })}
                  />
                </div>

                <br />

                <div className="row">
                  <h5>Agrege el texto/contenido</h5>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Texto"
                    autoComplete="content"
                    {...register("content", {
                      required: "Texto/contenido requerido",
                    })}
                  />
                </div>

                <br />
              </>
            )}
            {(modal.section === "hero" ||
              modal.section === "allies" ||
              modal.section === "clients" ||
              modal.section === "tarjetas" ||
              item) && (
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
                        setCurrentImage(URL.createObjectURL(e.target.files[0]));
                      }}
                    />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-10">
                    {currentImage ? (
                      <img
                        src={currentImage}
                        alt="update-pic"
                        style={{
                          width: "50%",
                          height: "auto",
                        }}
                      />
                    ) : (
                      "No hay una imagen seleccionada"
                    )}
                  </div>
                </div>
                <br />
              </>
            )}

            <Button type="submit">Añadir</Button>
          </form>
        </div>
      </div>
    </>
  );
};

ModalAdd.propTypes = {
  item: PropTypes.object,
};

export { ModalAdd };
