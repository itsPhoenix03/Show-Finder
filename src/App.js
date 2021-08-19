import React from 'react';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        This is Home Page
      </Route>
      <Route exact path="/starred">
        This is Starred one's
      </Route>
      <Route>Error: 404 Page not found</Route>
    </Switch>
  );
}

export default App;
