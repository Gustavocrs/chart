import { useState } from "react";
import "./Login.css";
import Button from '../Button'

export default function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  // const [logon, setLogon] = useState(false);

  function LoginValidate(e) {
    if (login === "a" && password === "a") {
      
      console.log("Seja bem vindo");
      // setLogon(true)
    } else {
      e.preventDefault();
      console.log("Login ou senha incorretos");
    }
    // setLogin("")
    // setPassword("")
  }

  return (
    <div className="container">
      <form className="formLogin">
        <h1 className="h1Login">Login</h1>
        <label className="labelLogin" htmlFor="userLogin">
          Username
          <input
            className="inputLogin"
            type="text"
            id="userLogin"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </label>
        <label className="labelLogin" htmlFor="userPass">
          Password
          <input
            className="inputLogin"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <Button name="Login" onClick={LoginValidate}/>
      </form>
    </div>
  );
}
