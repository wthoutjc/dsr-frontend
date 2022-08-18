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
      <div className="card-servicios-header">
        <Button onClick={() => handleModal("add")}>Agregar Servicio</Button>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {Array.isArray(data) &&
          data?.map((card, index) => {
            const { name, containers } = card;
            return (
              <div className="card card-personalizada" key={index}>
                <div className="card">
                  <div className="card-body">
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
                      <h1 className="card-servicios-title">{name}</h1>
                      <div className="card-servicios-body">
                        {containers.length > 0
                          ? containers.map((container, index) => {
                              return (
                                <div key={index} className="card">
                                  <h3 className="card-servicios-item-title">
                                    Title: {container.title}
                                  </h3>
                                  <p className="card-servicios-item-text">
                                    Content: {container.content}
                                  </p>
                                  <p className="card-servicios-item-text">
                                    Section: {container.section}
                                  </p>
                                  <p className="card-servicios-item-text">
                                    Location: {container.location}
                                  </p>
                                  <button
                                    type="button"
                                    className="btn btn-outline-warning"
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
