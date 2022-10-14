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
      <div
        className="card-body"
        style={{
          padding: 0,
        }}
      >
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
              <Row
                style={{
                  margin: "0",
                  flexWrap: "nowrap",
                  overflowX: "auto",
                }}
              >
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
                      style={{
                        marginBottom: "10px",
                      }}
                      onClick={() => handleModal(col.type, item)}
                    >
                      {col.title}
                    </button>
                  </Col>
                ))}
              </Row>
            </div>
          ))}
      </div>
    </div>
  );
};

CardContainer.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired || PropTypes.string.isRequired,
  section: PropTypes.string.isRequired,
};

export { CardContainer };
