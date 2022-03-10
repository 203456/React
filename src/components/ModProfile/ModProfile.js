import axios from "axios";
import { useNavigate } from "react-router-dom";
import './ModProfile.css';
export default ModProfilePage;

function ModProfilePage(){
    var token = localStorage.getItem('tokenLocal');
    var user = localStorage.getItem('user_id');
    var image_profile = "";
    var UserName, FirstName, LastName, Email;
    const navigate = useNavigate();
    axios
    .get("http://localhost:8000/api/v1/profile/user/" + user, {
      headers: {
        'Authorization': "Token " + token,
      },
    })
    .then((response) => {
      console.log(response.data);
      UserName = response.data.username;
      FirstName = response.data.first_name;
      LastName = response.data.last_name;
      Email = response.data.email;
      document.getElementById("username").value =  UserName;
      document.getElementById("first_name").value = FirstName;
      document.getElementById("last_name").value = LastName;
      document.getElementById("email").value = Email;
      if(response.data.url_img != null){
                    image_profile = "http://localhost:8000/assets" + response.data.url_img;
                    document.getElementById('img').src = image_profile;
                }else{
                    document.getElementById('img').src = "https://marlaw.se/wp-content/uploads/2016/03/profile-img.jpg";
                }
            }).catch((error) => {
                console.error("Error al obtener la imagen");
                document.getElementById('img').src = "https://marlaw.se/wp-content/uploads/2016/03/profile-img.jpg";
            }
    )
    

    const change_image = () => {
        let postData = new FormData();
        postData.append('id_user', user);
        postData.append('url_img', document.getElementById('imagen').files[0]);
    
        axios.post("http://localhost:8000/api/v1/profile/users/", postData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + token,
            }
        }).then((response) => {
                image_profile = "http://localhost:8000/assets/" + response.data.url_img;
                console.log(image_profile);
                document.getElementById('imagen').src = image_profile;
                window.location.reload();
            }).catch((error) => {
                console.log(error.response.data);
            })
            
    }

    let put_image = () => {
        let putData = new FormData();
        putData.append('url_img', document.getElementById('imagen').files[0]);
        putData.append('id_user', user)
        axios.put("http://localhost:8000/api/v1/profile/user/" + user,  putData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + token,
            },
        }).then((response) => {
            console.log(response.data);
            image_profile = "http://localhost:8000/assets/" + response.data.url_img;
            console.log(image_profile)
            document.getElementById('img').src = image_profile;
            window.location.reload();
        }).catch((error) => {
            console.log(error.response.data);
            alert("No se pudo actualizar la imagen");
        });
    }

    let delete_image = () => {
        axios.delete("http://localhost:8000/api/v1/profile/user/" + user, {
            headers: {
                'Authorization': 'Token ' + token,
                'Content-Type': 'multipart/form-data',
            }
        }).then((response) => {
            console.log(response.data);
            alert("Imagen eliminada");
            image_profile = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
            document.getElementById('img').url = image_profile;
            window.location.reload();
        })
        .catch((error) => {
            console.log(error.response.data)
        });
    }
    let change_profile = () =>{
        let putData = new FormData();
        let UserNamePut = document.getElementById("username").value;
        let LastNamePut = document.getElementById("last_name").value;
        let FirstNamePut = document.getElementById("first_name").value;
        let EmailPut = document.getElementById("email").value;
        if(UserNamePut === ""){
            UserNamePut = UserName; 
        }
        if(LastNamePut === ""){
            LastNamePut = LastName;
        }
        if(FirstNamePut === ""){
            FirstNamePut = FirstName;
        }
        if(EmailPut === ""){
            EmailPut = Email;
        }
        putData.append("first_name",FirstNamePut);
        putData.append("last_name",LastNamePut);
        putData.append("username",UserNamePut);
        putData.append("email",EmailPut);

        axios.put("http://localhost:8000/api/v1/profile/data/"+user+"/",putData,{
            headers:{
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + token,
            }
        }).then((response)=>{
            console.log(response.data);
            window.location.reload();
        }).catch((error)=>{
            alert("No se pudieron actualizar los datos");
            console.log(error.response.data);
        })
        // put_image();


    }
    const handleClick = () => {
        navigate('/Profile/'+user);


}



    return (

        <div>
          <div className={ModProfilePage.options}>
            <button id="userTitle">User {user}</button>
            <button className="Regresar" onClick={handleClick}>Regresar</button>
          </div>
          <div>
    
            <section  className="container_ModProfile">
            <input className="SubidaImg" accept="image/*" type="file" id="imagen"></input>
              <div className="Container-ModProfile-header">
                <img className="IMAGEN2" alt="error img" id="img" />
                <button className="btn_Changeimg" onClick={change_image}> Subir imagen </button>
                <button className="btn_Deleteimg" onClick={delete_image}> eliminar imagen </button>
              </div>
      
              <form>
              <input className="NombreProfile" placeholder="Nombre"  type="text" id = 'first_name'  />
                <hr/>
                <input className="inputProfile2" placeholder="Apellido" type="text" id = 'last_name'  />
                <hr/>
                <input className="inputProfileUser" placeholder="Username"  type="text" id = 'username'  />
                <hr/>
                <input className="inputProfileEmail" placeholder="Email" type="email" id = 'email' />
    
              </form>
              <div className="Container-ModProfile-footer">
                <div>
                  <button className="btn_Modificar" onClick={put_image}> Cambiar imagen </button>
                  <button className="btn_Modificar" onClick={change_profile}> Actualizar Perfil </button>
                </div>
              </div>
      
            </section>    
          </div>
        </div>
    
      );

}
