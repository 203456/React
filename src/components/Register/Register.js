import axios from 'axios';
import React, { Component } from "react";
import { useNavigate, } from "react-router-dom";
import './Register.css';
function App() {
  const navigate = useNavigate();
  const obtener_local = () =>{
    localStorage.removeItem('token')
    alert(localStorage.getItem('tokenLocal'))
    navigate('/')
  }


  const consumir_crear = () => {

    var postData = {
      username: document.getElementById('user').value,
      password: document.getElementById('pass').value,
      password2: document.getElementById('pass2').value,
      email: document.getElementById('correo').value,
      first_name: document.getElementById('nombre').value,
      last_name: document.getElementById('apellido').value
  
    }
    // alert("Hola login");
    axios
      .post("http://localhost:8000/api/v1/registro/crear_user/", postData, {
        headers: { 'Content-Type': 'application/json', },
      })
      .then(response => {
        console.log(response.data);
        alert("Registro exitoso")
        navigate('/')
      }).catch(
        (error) => {
          console.log(error.response.data);
        }

      )
  }



  return (

    <div>
      <div>
        <section  className="container_Register">
          <div className="Container-Register-header">
            <h2 className="Register-text-h2">R E G I S T R O </h2>
          </div>
  
          <form>
          <input className="Nombre" placeholder="Nombre"  type="text" id = 'nombre' required  />
            <hr/>
            <input className="inputLN" placeholder="Apellido" type="text" id = 'apellido' required  />
            <hr/>
            <input className="inputUser" placeholder="Username"  type="text" id = 'user' required  />
            <hr/>
            <input className="inputPass" placeholder="Contraseña" type="password" id = 'pass' required  />
            <hr/>
            <input className="inputPass2" placeholder="Confirma tu contraseña"  type="password" id = 'pass2' required  />
            <hr/>
            <input className="inputEmail" placeholder="Email" type="email" id = 'correo' required  />

          </form>
          <div className="Container-Register-footer">
            <div>
              <button className="btn_Register2" onClick={consumir_crear}> REGISTRARSE </button>

            </div>
          </div>
  
        </section>    
      </div>
    </div>

  );




}

export default App;