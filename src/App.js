import { BrowserRouter as Router } from "react-router-dom";
import { useState } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import Routers from "./Routers";
import theme from "./Theme";

import SearchContext from "./contexts/SearchContext";

export default function App() {
  const [search, setSearch] = useState("");
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <SearchContext.Provider value={{ search, setSearch }}>
          <Routers />
        </SearchContext.Provider>
      </ThemeProvider>
    </Router>
  );
}
