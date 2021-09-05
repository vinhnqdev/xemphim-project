import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { Suspense, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { userActions } from "./app/userSlice";
import "./sass/main.scss";
import Layout from "./components/layout/Layout";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import Loading from "./components/UI/Loading";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";

import PrivateRoute from "./components/UI/PrivateRoute";

const Movie = React.lazy(() => import("./pages/Movie"));
const Show = React.lazy(() => import("./pages/Show"));
const MovieDetail = React.lazy(() => import("./pages/MovieDetail"));
const Home = React.lazy(() => import("./pages/Home"));
const AllMovies = React.lazy(() => import("./pages/AllMovies"));
const Faq = React.lazy(() => import("./pages/Faq"));
const Login = React.lazy(() => import("./pages/Login"));
const SignUp = React.lazy(() => import("./pages/SignUp"));
const Search = React.lazy(() => import("./pages/Search"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    const unscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("UPDATE REDUX ");
        dispatch(
          userActions.login({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
      } else {
        // User is signed out
        // ...
        console.log("LOGOUT!!");
        dispatch(userActions.signout());
      }
    });
    return unscribe;
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/movie" exact>
                <Movie />
              </Route>
              <Route path="/tv" exact>
                <Show />
              </Route>
              <Route path="/allmovies">
                <AllMovies />
              </Route>
              <Route path="/search">
                <Search />
              </Route>
              <Route path="/faq">
                <Faq />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/forgot-password">
                <ForgotPassword />
              </Route>
              <PrivateRoute
                path="/change-password"
                component={ChangePassword}
              />
              {/* <ChangePassword /> */}
              {/* </PrivateRoute> */}
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
          </Suspense>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
