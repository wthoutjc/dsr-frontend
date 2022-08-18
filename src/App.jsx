import { Router } from "./routers";

// Redux
import { Provider } from "react-redux";

// Store
import { store } from "./store";

// Acá se carga modales, portales, notificaciones - Dado su nivel de jerarquia.
// Modal
import { Modal } from "./components/Modal";

function App() {
  return (
    <Provider store={store}>
      <Modal />
      <Router />
    </Provider>
  );
}

export default App;
