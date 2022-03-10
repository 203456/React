import axios from "axios";
import { useNavigate, } from "react-router-dom";
import React, { Component } from "react";
import './Login.css';

function App() {
  const navigate = useNavigate();
  const consumir_login = () => {
    var postData = {
      username: document.getElementById('user').value,
      password: document.getElementById('pass').value,

    }


    axios
      .post("http://localhost:8000/api/v2/Login", postData, {
        headers: { "Content-Type": "application/json", },
      })
      .then((response) => {
        localStorage.setItem('user_id', response.data.user_id)
        localStorage.setItem('nombre', response.data.nombre)
        localStorage.setItem('email', response.data.email)
        localStorage.setItem('tokenLocal', response.data.token)

        console.log(response.data);
        alert("Login exitoso");
        window.location = '/Profile/'+response.data.user_id

      })
      .catch((error) => {
        console.log(error.response.data);
        alert("Datos incorrectos")
      });
  
  
  };
  const handleClick = () => {
    navigate('/Register');
  };    





  return (
    <div>
      <div>
        <section  className="container">
          <div className="Container-login-header">
            <h2 className="Login-text-h2">L O G I N </h2>
          </div>
  
          <form>
            <input className="input" placeholder="Username" class= "input" type="text" id = 'user' required  />
            <hr/>
            <input className="input2" placeholder="Password" class= "input" type="password" id = 'pass' required  />
          </form>
          <div className="Container-login-footer">
            <div>
              <button className="btn_Register" onClick={handleClick}> REGISTRARSE </button>
              <button className="btn_Login" onClick={consumir_login}> ENTRAR </button>
            </div>
          </div>
  
        </section>    
      </div>
    </div>

  );

}

export default App;

