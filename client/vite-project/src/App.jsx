
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Editor from "./components/Editor";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        {/* Protected route */}
        <Route element={<PrivateRoute />}>
          <Route path="/write" element={<Editor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
