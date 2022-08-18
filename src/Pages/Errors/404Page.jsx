import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <>
      <div className="page">
        <div className="form">
          <h1>404</h1>
          <h2>Page not found</h2>
          <Link to="/">Regresar</Link>
        </div>
      </div>
    </>
  );
};

export { NoMatch };
