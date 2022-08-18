import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";

const ModalView = ({ item }) => {
  const { image, title, text, content, location, section } = item;

  return (
    <Modal.Body>
      {title && <h4>Title: {title}</h4>}
      {text && <p>Text: {text}</p>}
      {content && <p>Content: {content}</p>}
      {content && <p>Location: {location}</p>}
      {content && <p>Section: {section}</p>}
      {image && (
        <img
          src={image}
          alt="pic-hero"
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      )}
    </Modal.Body>
  );
};

ModalView.propTypes = {
  item: PropTypes.object.isRequired,
};

export { ModalView };
