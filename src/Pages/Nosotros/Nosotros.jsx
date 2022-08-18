import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import useSWR from "swr";

// Components
import { LayoutPage } from "../Layout";
import { CardContainer } from "../../components/Container";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setRequest } from "../../reducers";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const NosotrosPage = () => {
  const dispatch = useDispatch();
  const { request } = useSelector((state) => state.ui);

  const { data: tarjetas, mutate } = useSWR(
    `${process.env.REACT_APP_API_PROD}/about`,
    fetcher
  );

  const { data: contacts } = useSWR(
    `${process.env.REACT_APP_API_PROD}/contact`,
    fetcher
  );

  useEffect(() => {
    if (request) {
      mutate(`${process.env.REACT_APP_API_PROD}/home`, fetcher);
      dispatch(setRequest(false));
    }
  }, [request, mutate, dispatch]);

  if (!tarjetas) return <div>loading...</div>; // TODO: Acá sería bueno mostrar un mensaje de error más amigable
  if (!contacts) return <div>loading...</div>;

  return (
    <LayoutPage>
      <h1 className="title">Nosotros</h1>
      <p className="text">
        lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
      <Container className="container-cards">
        <Row xs={1} md={1} lg={2}>
          <Col>
            <CardContainer
              section={"tarjetas"}
              title={"Tarjetas"}
              data={tarjetas || []}
            />
          </Col>
          <Col>
            <CardContainer
              section={"contacto"}
              title={"Contacto"}
              data={contacts || []}
            />
          </Col>
        </Row>
      </Container>
    </LayoutPage>
  );
};

export { NosotrosPage };
