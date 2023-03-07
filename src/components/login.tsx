import { useOktaAuth } from "@okta/okta-react";
import { Navigate, useNavigate } from "react-router-dom";
import "../App.css";

export function Login() {
  const navigate = useNavigate();
  const { authState } = useOktaAuth();

  const handleLoginClick = () => {
    navigate("/todos");
  };

  return authState?.isAuthenticated ? (
    <Navigate to="/todos" replace />
  ) : (
    <div className="form-wrapper">
      <form onSubmit={handleLoginClick}>
        <h2>Welcome Back!</h2>
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}
