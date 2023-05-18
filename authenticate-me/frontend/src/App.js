import { Route } from "react-router-dom/cjs/react-router-dom.min";
import LoginFormPage from "./components/LoginFormPage";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector(state => state.sessionReducer.user)

  return (
    <>
      <Route path='/'>
        <h1>Authenticate Me Project</h1>
      </Route>
      <Route path='/login'>
        <LoginFormPage />
      </Route>
    </>

  );
}

export default App;
