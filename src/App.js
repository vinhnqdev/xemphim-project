import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userActions } from "./app/userSlice";
import Layout from "./components/layout/Layout";
import Loading from "./components/UI/Loading";
import PrivateRoute from "./components/UI/PrivateRoute";
import ChangePassword from "./pages/ChangePassword";
import Contact from "./pages/Contact";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home.js";
import NotFound from "./pages/NotFound";
import Watch from "./pages/Watch";
import "./sass/main.scss";

const Movie = React.lazy(() => import("./pages/Movie"));
const Show = React.lazy(() => import("./pages/Show"));
const MovieDetail = React.lazy(() => import("./pages/MovieDetail"));
// const Home = React.lazy(() => import("./pages/Home"));
const AllMovies = React.lazy(() => import("./pages/AllMovies"));
const Faq = React.lazy(() => import("./pages/Faq"));
const Login = React.lazy(() => import("./pages/Login"));
const SignUp = React.lazy(() => import("./pages/SignUp"));
const Search = React.lazy(() => import("./pages/Search"));
const Profile = React.lazy(() => import("./pages/Profile"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    const unscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
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
        dispatch(userActions.signout());
      }
    });
    return unscribe;
  }, [dispatch]);

  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Layout>
          {/* Sử dụng thư viện React Toastify */}
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
              <PrivateRoute path="/change-password" component={ChangePassword} />
              <PrivateRoute path="/profile" component={Profile} />
              {/* <ChangePassword /> */}
              {/* </PrivateRoute> */}

              <Route path="/signup">
                <SignUp />
              </Route>
              <Route path="/contact">
                <Contact />
              </Route>
              <Route path="/watch/:movieId">
                <Watch />
              </Route>
              <Route path="/movie/:slug">
                <MovieDetail />
              </Route>
              <Route path="/tv/:slug">
                <MovieDetail />
              </Route>
              <Route path="/notFound">
                <NotFound />
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
