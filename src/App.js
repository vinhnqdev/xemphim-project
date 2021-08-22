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
function App() {
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
