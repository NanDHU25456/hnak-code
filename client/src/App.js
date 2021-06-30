import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import FirstPage from "./FirstPage"
import SecondPage from "./SecondPage"

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={FirstPage} />
        <Route exact path="/second" component={SecondPage} />
      </Switch>
    </Router>
  );
}

export default App;
