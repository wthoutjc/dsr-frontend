import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setNotification, setModal, setRequest } from "../../reducers";

// API
import { deleteAPI } from "../../api";

/**
 * @param { item }
 * @param { open, title, type, item }
 * @returns { ModalDelete }
 */

const ModalDelete = ({ item, title }) => {
  const dispatch = useDispatch();
  const { modal } = useSelector((state) => state.ui);

  const { image, title: name } = item;

  const handleDelete = async () => {
    const success = item._id
      ? await deleteAPI(item._id, modal.section)
      : await deleteAPI(modal.id, modal.section, item.id);

    if (success) {
      dispatch(
        setModal({
          open: false,
          title: "",
          type: null,
          section: null,
        })
      );
      dispatch(
        setNotification({
          open: true,
          title: "Éxito",
          message: "Se ha eliminado correctamente",
          type: "success",
        })
      );
      dispatch(setRequest(true));
    }
  };

  return (
    <>
      <Modal.Body>
        <h4>
          Desea borrar {title} - {name || item.name} - {item.content}
        </h4>
        {image && (
          <img
            src={image}
            alt="pic-herp"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleDelete}>
          Borrar
        </Button>
      </Modal.Footer>
    </>
  );
};

ModalDelete.propTypes = {
  item: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export { ModalDelete };
