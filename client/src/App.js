import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { DataProvider } from "./GlobalState";
import Header from "./components/headers/Header";
import MainPages from "./components/mainpages/Pages";
import Footer from "./components/footers/Footer";
import ScollToTop from "./ScrollToTop";

function App() {
  return (
    <DataProvider>
      <Router>
        <ScollToTop />
        <div className="App">
          <Header />
          <MainPages />
          <Footer />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
