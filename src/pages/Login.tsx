import { useState } from "react";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e: React.SubmitEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      const token = await login(email, password);
      if (!token) {
        setError("Credentials are invalid");
        return;
      }
      localStorage.setItem("accessToken", token.token);
      navigate("/bookmarks");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    }
  }
  return (
    <div>
      <form onSubmit={handleLogin}>
        {error && <p>{error}</p>}
        <label>Email:</label>
        <input
          placeholder="test@test.com"
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <label>Password:</label>
        <input
          placeholder="enter your password..."
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
