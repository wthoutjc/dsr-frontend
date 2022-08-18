import { request } from "./";

const deleteAPI = async (id, section, container = null) => {
  let url;

  switch (section) {
    case "home":
      url = `${process.env.REACT_APP_API_PROD}/home/${id}`;
      break;
    case "hero":
      url = `${process.env.REACT_APP_API_PROD}/home/${id}`;
      break;
    case "tarjetas":
      url = `${process.env.REACT_APP_API_PROD}/about/${id}`;
      break;
    case "1":
      url = `${process.env.REACT_APP_API_PROD}/about/${id}`;
      break;
    case "contacto":
      url = `${process.env.REACT_APP_API_PROD}/contact/${id}`;
      break;
    case "servicios":
      url = `${process.env.REACT_APP_API_PROD}/services/${id}`;
      if (container)
        url = `${process.env.REACT_APP_API_PROD}/services/${id}/${container.id}`;
      break;
    default:
      break;
  }

  const settings = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")} `,
    },
  };

  if (!url) return [false, "No se reconoce una sección válida"];

  return request(url, settings);
};

export { deleteAPI };
