import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";

// Redux
import { useDispatch } from "react-redux";
import { setModal } from "../../reducers";

const CardContainer = ({ title, data, section }) => {
  const dispatch = useDispatch();

  const handleModal = (type, item = null) => {
    dispatch(
      setModal({
        open: true,
        title,
        type,
        item,
        section,
      })
    );
  };

  return (
    <div className="card card-personalizada">
      <div className="card-body">
        <Row>
          <Col>
            <button
              className="btn btn-primary"
              onClick={() => handleModal("add")}
            >
              Agregar
            </button>
          </Col>
          <Col md="7">
            <h5 className="card-title">{title}</h5>
          </Col>
        </Row>
        <br />

        {Array.isArray(data) &&
          data?.map((item, index) => (
            <div className="card" key={index}>
              <div className="card-body">
                <Row>
                  {[
                    {
                      title: "Ver",
                      type: "view",
                      className: "btn-outline-primary",
                    },
                    {
                      title: "Actualizar",
                      type: "update",
                      className: "btn-outline-warning",
                    },
                    {
                      title: "Borrar",
                      type: "delete",
                      className: "btn-outline-danger",
                    },
                  ].map((col, index) => (
                    <Col key={index}>
                      <button
                        className={`btn ${col.className}`}
                        onClick={() => handleModal(col.type, item)}
                      >
                        {col.title}
                      </button>
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

CardContainer.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  section: PropTypes.string.isRequired,
};

export { CardContainer };
