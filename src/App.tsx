import { BrowserRouter as Router, Routes, Route } from "react-router";
import NotFound from "./pages/OtherPage/NotFound";
import Button from "./pages/Components/Button";
import CheckBoxList from "./pages/Components/CheckBoxList";
import AppLayout from "./layout/AppLayout";
import FirstTest from "./pages/Dashboard/FirstTest";
import SecondTest from "./pages/Dashboard/SecondTest";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<FirstTest />} />
            <Route index path="/second-test" element={<SecondTest />} />

            {/* Component Page */}
            <Route path="/button" element={<Button />} />
            <Route path="/checkbox-list" element={<CheckBoxList />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
