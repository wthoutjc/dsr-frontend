import { request } from "./";

const uploadAPI = async (info, section, container = null) => {
  const { section: _section, image } = info;
  let url;

  console.log(info);

  switch (section) {
    case "allies":
      url = `${process.env.REACT_APP_API_PROD}/home/upload`;
      break;
    case "clients":
      url = `${process.env.REACT_APP_API_PROD}/home/upload`;
      break;
    case "hero":
      url = `${process.env.REACT_APP_API_PROD}/home/upload`;
      break;
    case "tarjetas":
      url = `${process.env.REACT_APP_API_PROD}/about`;
      break;
    case "1":
      url = `${process.env.REACT_APP_API_PROD}/about`;
      break;
    case "contacto":
      url = `${process.env.REACT_APP_API_PROD}/contact`;
      break;
    case "services":
      url = `${process.env.REACT_APP_API_PROD}/services`;
      if (container)
        url = `${process.env.REACT_APP_API_PROD}/services/${
          container._id || container
        }/addContainer`;
      break;
    default:
      break;
  }

  let data = null;

  if (image) {
    data = new FormData();
    if (info.content) {
      data.append("content", info.content);
      data.append("title", info.title);
    }
    data.append("section", _section);
    data.append("image", image[0]);
  }

  let settings;

  settings = {
    method: `${container ? "PATCH" : "POST"}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")} `,
    },
    body: data || JSON.stringify(info),
  };

  if (!data) {
    settings["headers"]["Content-Type"] = "application/json";
  }

  if (!url) return [false, "No se reconoce una sección válida"];

  return request(url, settings);
};

export { uploadAPI };
