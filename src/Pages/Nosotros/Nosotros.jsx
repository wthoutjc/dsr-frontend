import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import useSWR from "swr";

// Components
import { LayoutPage } from "../Layout";
import { CardContainer } from "../../components/Container";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setRequest } from "../../reducers";
import { Loader } from "../../components/Loader";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const NosotrosPage = () => {
  const dispatch = useDispatch();
  const { request } = useSelector((state) => state.ui);

  const { data: tarjetas, mutate } = useSWR(
    `${process.env.REACT_APP_API_PROD}/about`,
    fetcher
  );

  const { data: contacts, mutate: mutate2 } = useSWR(
    `${process.env.REACT_APP_API_PROD}/contact`,
    fetcher
  );

  useEffect(() => {
    if (request) {
      mutate(`${process.env.REACT_APP_API_PROD}/about`, fetcher);
      mutate2(`${process.env.REACT_APP_API_PROD}/contact`, fetcher);
      dispatch(setRequest(false));
    }
  }, [request, mutate, mutate2, dispatch]);

  useEffect(() => {
    console.log(tarjetas);
    console.log(contacts);
  }, [tarjetas, contacts]);

  if (!tarjetas) return <Loader />;
  if (!contacts) return <Loader />;

  return (
    <LayoutPage>
      <h1 className="title">Nosotros</h1>
      <Container fluid>
        <Row xs={1} md={1} lg={2}>
          <Col
            style={{
              position: "relative",
            }}
          >
            {Array.isArray(tarjetas) && (
              <CardContainer
                section={"tarjetas"}
                title={"Tarjetas"}
                data={tarjetas || []}
              />
            )}
          </Col>
          <Col>
            {Array.isArray(contacts) && (
              <CardContainer
                section={"contacto"}
                title={"Contacto"}
                data={contacts || []}
              />
            )}
          </Col>
        </Row>
      </Container>
    </LayoutPage>
  );
};

export { NosotrosPage };
