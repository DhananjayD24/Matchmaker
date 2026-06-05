import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import CustomerDetailsPage from "./pages/CustomerDetailsPage";
import SentMatchesPage from "./pages/SentMatchesPage";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customer/:id"
          element={
            <ProtectedRoute>
              <CustomerDetailsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sent-matches"
          element={
            <ProtectedRoute>
              <SentMatchesPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
