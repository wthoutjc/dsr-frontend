import { useEffect } from "react";
import { Container } from "react-bootstrap";
import useSWR from "swr";

// Components
import { LayoutPage } from "../Layout";
import { ServicioContainer } from "../../components/Container";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setRequest } from "../../reducers";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const ServiciosPage = () => {
  const dispatch = useDispatch();
  const { request } = useSelector((state) => state.ui);
  
  const { data, error, mutate } = useSWR(
    `${process.env.REACT_APP_API_PROD}/services`,
    fetcher
  );

  useEffect(() => {
    if (request) {
      mutate(`${process.env.REACT_APP_API_PROD}/services`, fetcher);
      dispatch(setRequest(false));
    }
  }, [request, mutate, dispatch]);

  if (error) return <div>failed to load</div>; // Acá sería bueno mostrar un mensaje de error más amigable

  return (
    <>
      <LayoutPage>
        <h1 className="title">Servicios</h1>
        <p className="text">
          lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing
          elit.
        </p>
        <Container className="container-cards">
          <div>
            <ServicioContainer
              section={"servicios"}
              title={"Servicios"}
              data={data || []}
            />
          </div>
        </Container>
      </LayoutPage>
    </>
  );
};

export { ServiciosPage };
