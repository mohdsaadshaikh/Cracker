import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Auth from "./screens/auth/auth";
import DashBoard from "./screens/dashboard";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="/auth" element={<Auth />} />s
            <Route path="/" element={<DashBoard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
