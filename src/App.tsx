import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import SignInPage from "./pages/Users/SignInPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import RegisterPage from "./pages/Users/RegisterPage";
import { AuthContext } from "./context/AuthContext";
import { useState } from "react";
import { UserType } from "./types";

function App() {
  const userFromStorage = sessionStorage.getItem("user");
  const [user, setUser] = useState<UserType | null>(
    userFromStorage ? JSON.parse(userFromStorage) : null
  );

  return (
    <Router>
      <AuthContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
