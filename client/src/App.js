import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './Components/Navbar';
import About from './Components/About';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { Home } from "./Pages/Home";
import Details from "./Pages/Details";


function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/">
                <Login />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
              <Route exact path="/home">
                <Home />
              </Route>
              <Route path="/computer/:id">
                <Details />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
