import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import useSWR from "swr";

// Components
import { CardContainer } from "../../components/Container";
import { LayoutPage } from "../Layout";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setRequest } from "../../reducers";
import { Loader } from "../../components/Loader";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const HomePage = () => {
  const dispatch = useDispatch();
  const { request } = useSelector((state) => state.ui);

  const { data, error, mutate } = useSWR(
    `${process.env.REACT_APP_API_PROD}/home`,
    fetcher
  );

  const { hero, clients, allies } = data || {
    hero: [],
    clients: [],
    allies: [],
  };

  useEffect(() => {
    if (request) {
      mutate(`${process.env.REACT_APP_API_PROD}/home`, fetcher);
      dispatch(setRequest(false));
    }
  }, [request, mutate, dispatch]);

  if (error) return <div>failed to load</div>; // TODO: Acá sería bueno mostrar un mensaje de error más amigable
  if (!data) return <Loader />;

  return (
    <LayoutPage>
      <h1 className="title">Home</h1>
      <Container fluid>
        <Row xs={1} md={1} lg={3}>
          <Col>
            <CardContainer section={"hero"} title={"Hero"} data={hero || []} />
          </Col>
          <Col>
            <CardContainer
              section={"clients"}
              title={"Clientes"}
              data={clients || []}
            />
          </Col>
          <Col>
            <CardContainer
              section={"allies"}
              title={"Aliados"}
              data={allies || []}
            />
          </Col>
        </Row>
      </Container>
    </LayoutPage>
  );
};

export { HomePage };
