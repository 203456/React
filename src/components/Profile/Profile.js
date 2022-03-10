import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Profile.css';

function Profile() {

    var token = localStorage.getItem('tokenLocal');
    var user = localStorage.getItem('user_id');
    var image_profile = "";
    var UserName, FirstName, LastName, Email;


    axios
    .get("http://localhost:8000/api/v1/profile/user/" + user, {
      headers: {
        'Authorization': "Token " + token,
      },
    })
    .then((response) => {
      console.log(response.data);
      image_profile = "http://localhost:8000" + response.data.url_img;
      document.getElementById("img").src = image_profile;
      UserName = response.data.username;
      FirstName = response.data.first_name;
      LastName = response.data.last_name;
      Email = response.data.email;
            document.getElementById("username").value =  UserName;
      document.getElementById("first_name").value = FirstName;
      document.getElementById("last_name").value = LastName;
      document.getElementById("email").value = Email;
      if(response.data.url_img != null){
                    image_profile = "http://localhost:8000/assets/" + response.data.url_img;
                    document.getElementById('img').src = image_profile;
                }else{
                    document.getElementById('img').src = "https://marlaw.se/wp-content/uploads/2016/03/profile-img.jpg";
                }
            }).catch((error) => {
                console.error("Error al obtener la imagen");
                document.getElementById('img').src = "https://marlaw.se/wp-content/uploads/2016/03/profile-img.jpg";
            }
    )
    axios.get("http://localhost:8000/api/v1/profile/data/"+user+"/",{
      headers:{
          'Authorization': 'Token ' + token,
      },
  }).then((response) =>{
      UserName = response.data.username;
      FirstName = response.data.first_name;
      LastName = response.data.last_name;
      Email = response.data.email;
      document.getElementById("first_name").placeholder = FirstName;
      document.getElementById("last_name").placeholder = LastName;
      document.getElementById("email").placeholder = Email;
      document.getElementById("username").placeholder = UserName;
  }).catch((error)=>{
      console.log(error.response.data);
  })

    const navigate = useNavigate();
    let cerrar_sesion = () => {
        localStorage.clear();
        navigate("/");
    }
    let modificar_Profile = () => {
      navigate("/Profile/:id/Mod");
  }


    return (

      <div>
        <div className={Profile.options}>
          <button id="userTitle">User {user}</button>
          <button className="Logout" onClick={cerrar_sesion}>Logout</button>
        </div>
        <div>
          
          <section  className="container_Profile">
            <div className="Container-Profile-header">
              <img className="IMAGEN" alt="error img" id="img" />
              
            </div>
    
            <form>
            <input className="NombreProfile" placeholder="Nombre"  type="text" id = 'first_name'  readOnly />
              <hr/>
              <input className="inputProfile2" placeholder="Apellido" type="text" id = 'last_name'  readOnly />
              <hr/>
              <input className="inputProfileUser" placeholder="Username"  type="text" id = 'username' readOnly  />
              <hr/>
              <input className="inputProfileEmail" placeholder="Email" type="email" id = 'email' readOnly />
  
            </form>
            <div className="Container-Profile-footer">
              <div>
                <button className="btn_Modificar" onClick={modificar_Profile}> MODIFICAR </button>
  
              </div>
            </div>
    
          </section>    
        </div>
      </div>
  
    );
  
  
}

export default Profile;