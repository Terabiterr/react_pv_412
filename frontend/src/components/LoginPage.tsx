import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";

const LoginPage = () => {

  const { login, isAuth } = useAuth(); // auth
  const navigate = useNavigate();      // переход

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // если уже авторизован
  if (isAuth) return <Navigate to="/" />;

  const handleLogin = async () => {

    try {
      const res = await api.post("/auth/login", {
        email,
        password
      });

      login(res.data.token); // сохраняем токен

      navigate("/students"); // переходим

    } catch {
      alert("Ошибка логина");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input onChange={(e) => setEmail(e.target.value)} />
      <input type="password" onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
