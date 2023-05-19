import { Route } from "react-router-dom/cjs/react-router-dom.min";
import LoginFormPage from "./components/LoginFormPage";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { restoreLogin } from "./store/session";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function getLogin() {
      await dispatch(restoreLogin());
      setIsLoaded(true);
    }
    
    getLogin();
  }, [dispatch])

  return isLoaded && (
    <>
      <Navigation />
      <h1>Authenticate Me Project</h1>
      <Route exact path='/'>
      </Route>
      <Route path='/login'>
        <LoginFormPage />
      </Route>
      <Route path='/signup'>
        <SignupFormPage/>
      </Route>

    </>

  );
}

export default App;
