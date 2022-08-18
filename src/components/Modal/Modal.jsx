import { Modal as BModal } from "react-bootstrap";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setModal } from "../../reducers";

// Components
import { ModalAdd, ModalDelete, ModalUpdate, ModalView } from "./";

const Modal = () => {
  const dispatch = useDispatch();

  const { modal } = useSelector((state) => state.ui);
  const { open, title, type, item } = modal;

  const handleClose = () => {
    dispatch(
      setModal({
        open: false,
        title: "",
        type: null,
        section: null,
      })
    );
  };

  return (
    <BModal
      show={open}
      onHide={() => handleClose()}
      size={
        type === "view" || type === "delete"
          ? "sm"
          : type === "update"
          ? "lg"
          : ""
      }
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <BModal.Header closeButton>
        <BModal.Title>{title}</BModal.Title>
      </BModal.Header>
      {type === "add" && <ModalAdd item={item} {...modal} />}
      {type === "delete" && <ModalDelete item={item} {...modal} />}
      {type === "update" && <ModalUpdate item={item} {...modal} />}
      {type === "view" && <ModalView item={item} {...modal} />}
    </BModal>
  );
};

export { Modal };
