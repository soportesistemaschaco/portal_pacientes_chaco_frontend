/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback, useEffect, createContext } from "react";
import loginService from "../services/loginService";
import Swal from "sweetalert2";
import {
  expiredSession,
  error
} from "../components/SwalAlertData";
import { loginPersonService } from "../services/loginPersonService";
import tgdServiceToken, { tgdServiceUserData } from "../services/tgdServices";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [tokenUser, setTokenUser] = useState(
    JSON.parse(localStorage.getItem("tokenUser")) || null
  );
  const [typeUser, setTypeUser] = useState(
    JSON.parse(localStorage.getItem("typeUser")) || null
  ); //note: 1 = admin / 2 = person
  const curtime = new Date().getTime();
  const [newUser, setNewUser] = useState(false);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    try {
      delete user.password;
      localStorage.setItem("typeUser", JSON.stringify(typeUser));
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("tokenUser", JSON.stringify(tokenUser));
      if (tokenUser) {
        if (!localStorage.getItem("curtime")) {
          localStorage.setItem("curtime", curtime);
        }
      } else {
        localStorage.removeItem("curtime");
      }
    } catch (error) {
      localStorage.removeItem("user");
      localStorage.removeItem("tokenUser");
      localStorage.removeItem("typeUser");
    }
  }, [user, tokenUser, typeUser]);

  const loginAdmin = useCallback(
    (u, p) => {
      setLoading(true);
      loginService(u, p)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.text().then(text => {
              let readeble = JSON.parse(text)
              throw new Error(readeble.detail)
            })
          }
        })
        .then((data) => {
          setTypeUser(1); //hardcode - 1 = user-admin. 2 = user-person
          setUser(data);
          setTokenUser(data.access_token);
          setLoading(false)
          return tokenUser;
        })
        .catch((err) => {
          setLoading(false)
          console.error("error: ", err);
          switch (err.message) {
            case 'Mail not validated.':
              Swal.fire(error('Email no validado'));
              break;
            case 'Incorrect username or password...':
              Swal.fire(error('Email o password incorrecto'));
              break;
            default:
              Swal.fire(error('Ha ocurrido un error'));
          }
        });
    },
    [tokenUser]
  );

  // INICIO COMUN
  const loginPerson = useCallback(
    (u, p) => {
      setLoading(true);
      loginPersonService(u, p)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.text().then(text => {
              let readeble = JSON.parse(text)
              throw new Error(readeble.detail)
            })
          }
        })
        .then((data) => {
          setUser(data.data);
          setTokenUser(data.access_token);
          setTypeUser(2); //hardcode //hardcode - 1 = user-admin. 2 = user-person
          setLoading(false);
          return tokenUser;
        })
        .catch((err) => {
          setLoading(false);
          console.error("error: ", err);
          switch (err.message) {
            case 'Mail not email_validated.':
              Swal.fire(error('Email no validado'));
              break;
            case 'Incorrect username or password...':
              Swal.fire(error('Email o password incorrecto'));
              break;
            case 'Wait for approval.':
              Swal.fire(error('El usuario aún no ha sido habilitado para ingresar'));
              break;
            default:
              Swal.fire(error('Ha ocurrido un error'));
          }
        });
    },
    [tokenUser]
  );

  const setUserNewData = (data) => {
    setUser(data)
  }
 

  function getLocalStorage(key) {
    let exp = 60 * 60 * 24 * 1000; //hardcode - milliseconds in a day
    if (localStorage.getItem(key)) {
      let vals = localStorage.getItem(key);
      let data = JSON.parse(vals);
      let isTimed = new Date().getTime() - data > exp;
      if (isTimed) {
        console.log("Error: El almacenamiento ha expirado");
        setTokenUser(null);
        logout(isTimed);
        return null;
      } else {
        var newValue = data;
      }
      return newValue;
    } else {
      return null;
    }
  }

  // INICIO RECIBIENDO DATOS DESDE TGD
  const getUserData = (query) => {
    const result = new Promise((resolve, reject) => {
        // FUNCION PARA CONVERTIR DATOS RECIBIDOS POR QUERY EN JSON
        try  {
            let userData = {};
            let clearQuery = query.replace('%27', '', 1);
            clearQuery = clearQuery.replace('?', '', 1);
            let arrayData = clearQuery.split('&');
            arrayData.forEach(element => {
                let key = element.split('=')[0];
                let value = element.split('=')[1];
                if (key === 'data') {
                    let clearJSON = value.replaceAll('%27', '"');
                    clearJSON = clearJSON.replaceAll('%3A+', ':');
                    clearJSON = decodeURI(clearJSON);
                    // clearJSON = clearJSON.replaceAll('%7B', '{');
                    clearJSON = clearJSON.replaceAll('%3A+', ':');
                    clearJSON = clearJSON.replaceAll('%2C+', ',');
                    clearJSON = clearJSON.replaceAll('}"', '}');
                    console.log(clearJSON)
                    clearJSON = JSON.parse(clearJSON);
                    userData[key] = clearJSON;   
                } else {
                    userData[key] = value;
                }
            });
            // console.log(userData);
            resolve(userData);
            // return userData;
        } catch (err) {
            reject(err);
        }
    })

    result.then((res) =>{
        if (res.access_token) {
          setUser(res.data);
          setTokenUser(res.access_token);
          setTypeUser(2); //hardcode //hardcode - 1 = user-admin. 2 = user-person
          setLoading(false);
          return tokenUser;
        }
    })
}

  // LOGIN WITH TGD
  // with the code obtained, I request the token
  // const getUserTokenTGD = useCallback(
  //   (params) => {
  //     tgdServiceToken(params)
  //       .then((response) => {
  //         if (response.access_token ) {
  //           let tgdToken = response.access_token;
  //           getUserDataTGD(tgdToken);
  //         } 
  //       })
  //       .catch((error) => {
  //         console.log('error', error)
  //       })
  //   }
  //   , []
  // );

  
  // // with the tpken obtained, I request the user data
  // const getUserDataTGD = useCallback(
  //   (tgdToken) => {
  //     tgdServiceUserData(tgdToken)
  //       .then((response) => {
  //         console.log('userTGD response', response)
  //       })
  //       .catch((error) => {
  //         console.log('error', error)
  //       })
  //   }
  //   , []
  // );
  // EXPIRE SESSION
  useEffect(() => {
    getLocalStorage("curtime");
  }, []);

  const logout = (expired) => {
    if (expired) {
      Swal.fire(expiredSession).then((result) => {
        if (result.isConfirmed) {
          deleteDataSession();
        }
      });
    } else {
      deleteDataSession();
    }
  };

  const deleteDataSession = () => {
    let email = localStorage.getItem("loginDataEmail");
    let password = localStorage.getItem("loginDataPassword");
    localStorage.clear();
    saveLoginData(email, password)
    setTokenUser(null);
    setUser(null);
  };

  const saveLoginData = (e, p) => {
    if (e) {
      localStorage.setItem("loginDataEmail", e);
    }
    if (p) {
      localStorage.setItem("loginDataPassword", p);
    }
  }

  const newRegisterUser = (values) => {
    setNewUser(values);
  };

  const contextValue = {
    loading,
    user,
    tokenUser,
    typeUser,
    loginPerson,
    loginAdmin,
    logout,
    // getUserTokenTGD,
    setUserNewData,
    getUserData,
    isLogged() {
      getLocalStorage("curtime");
      if (tokenUser) {
        return true;
      } else {
        return false;
      }
    },
    newUser,
    newRegisterUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
