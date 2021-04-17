import { useEffect } from "react";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";

import { Add, List } from "./pages";
import { AppBar } from "./components";

export default function AppRouter() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <AppBar />
      <Switch>
        <Route path="/add" exact component={Add} />
        <Route path="/view" exact component={List} />
        <Redirect to="/view" />
      </Switch>
    </>
  );
}
