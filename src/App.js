import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout";
import "./sass/main.scss";
import Search from "./pages/Search";
import Faq from "./pages/Faq";
import Login from "./pages/Login";
import MovieDetail from "./pages/MovieDetail";
import NotFound from "./pages/NotFound";
import Show from "./pages/Show";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import AllMovies from "./pages/AllMovies";
import SignUp from "./pages/SignUp";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "./app/userSlice";

function App() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  console.log("APP OUTNER", user);
  useEffect(() => {
    const auth = getAuth();

    const unscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("APP INNER", user);

        dispatch(
          userActions.login({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          })
        );
      } else {
        // User is signed out
        // ...
        console.log("SIGN OUT");
        dispatch(userActions.signout());
        console.log("OnAuthStateChanged:", "NOT USER");
      }
    });
    return unscribe;
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/movie" exact>
              <Movie />
            </Route>
            <Route path="/allmovies">
              <AllMovies />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/tv" exact>
              <Show />
            </Route>
            <Route path="/faq">
              <Faq />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/movie/:slug">
              <MovieDetail />
            </Route>
            <Route path="/tv/:slug">
              <MovieDetail />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
