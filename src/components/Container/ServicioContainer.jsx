import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

// Redux
import { useDispatch } from "react-redux";
import { setModal } from "../../reducers";

const ServicioContainer = ({ title, data, section }) => {
  const dispatch = useDispatch();

  const handleModal = (type, item = null, id = null) => {
    dispatch(
      setModal({
        open: true,
        title,
        type,
        item,
        section,
        id,
      })
    );
  };

  return (
    <>
      <Button
        onClick={() => handleModal("add")}
        style={{
          marginBottom: "1rem",
        }}
      >
        Agregar Servicio
      </Button>
      <div
        style={{
          display: "flex",
          flexWrap: "nowrap",
          justifyContent: "space-between",
        }}
      >
        {Array.isArray(data) &&
          data?.map((card, index) => {
            const { name, containers } = card;
            return (
              <div
                className="card"
                key={index}
                style={{
                  margin: "1rem",
                  maxHeight: "600px",
                  width: "360px",
                  overflow: "auto",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <button
                    type="button"
                    className="btn btn-outline-warning"
                    onClick={() => handleModal("update", card)}
                  >
                    Actualizar
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => handleModal("delete", card)}
                  >
                    Eliminar
                  </button>
                </div>
                <div className="card-body">
                  <div>
                    <h1>{name}</h1>
                    <div>
                      {containers.length > 0
                        ? containers.map((container, index) => {
                            return (
                              <div
                                key={index}
                                className="card"
                                style={{
                                  filter:
                                    "drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.55))",
                                }}
                              >
                                <h3>Title: {container.title}</h3>
                                <p>Content: {container.content}</p>
                                <p>Section: {container.section}</p>
                                <p>Location: {container.location}</p>
                                <button
                                  type="button"
                                  className="btn btn-outline-warning"
                                  style={{
                                    marginBottom: "1rem",
                                  }}
                                  onClick={() =>
                                    handleModal("update", container, card._id)
                                  }
                                >
                                  Actualizar subservicio
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-outline-danger"
                                  onClick={() =>
                                    handleModal("delete", container, card._id)
                                  }
                                >
                                  Eliminar Subservicio
                                </button>
                              </div>
                            );
                          })
                        : "No hay servicios"}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => handleModal("add", card)}
                >
                  Agregar Sub-servicio
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
};

ServicioContainer.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  section: PropTypes.string.isRequired,
};

export { ServicioContainer };
