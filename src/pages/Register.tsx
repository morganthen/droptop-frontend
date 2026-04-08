import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { register } from "../api/auth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e: React.SubmitEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      const userEmail = await register(email, password);
      if (!userEmail) {
        setError("Credentials are invalid");
        return;
      }
      navigate("/login");
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
      <form onSubmit={handleRegister}>
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
