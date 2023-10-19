/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback, useEffect, createContext } from "react";
import loginService from "../services/loginService";
import Swal from "sweetalert2";
import {
  expiredSession,
  error
} from "../components/SwalAlertData";
import { loginPersonService } from "../services/loginPersonService";
import { getFamilyGroupByIdentificationNumberMaster } from "../services/personServices";
import { jwtVerify } from "../services/jwtService";

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
  const [familyGroup, setFamilyGroup] = useState([]);
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
          localStorage.setItem('userName', u);
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

  const getAdminData = () => {  
    const verify  = jwtVerify(tokenUser);
    if (verify?.id) {
      return verify
    } 
    // logout(true)
    return false
  }

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
    setUser(data);
  }


  function getLocalStorage(key) {
    let exp = 60 * 60 * 24 * 1000; //hardcode - milliseconds in a day
    if (localStorage.getItem(key)) {
      let vals = localStorage.getItem(key);
      let data = JSON.parse(vals);
      let isTimed = new Date().getTime() - data > exp;
      if (isTimed) {
        console.error("Error: El almacenamiento ha expirado");
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
      try {
        let userData = {};
        let clearQuery;
        // LIMPIA QUERY QUE OBTIENE CON DATOS
        clearQuery = query.replace('?', '', 1);
        const params = new URLSearchParams(clearQuery);
        const obj = {};
        for (const [key, value] of params) {
          obj[key] = value === 'None' ? null : value;
        }
        userData.data = obj;
        userData.access_token = obj.access_token;
        resolve(userData);
      } catch (err) {
        reject(err);
      }
    })

    result.then((res) => {
      if (res.access_token && res.data.id) {
        setUser(res.data);
        setTokenUser(res.access_token);
        setTypeUser(2); //hardcode //hardcode - 1 = user-admin. 2 = user-person
        setLoading(false);
        return res.data;
      }
    }).catch((err) => {
      console.error(err);
      Swal.fire(error('Error al obtener datos de usuario. Reintentar'));
    });
  }

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

  useEffect(() => {
    if (user?.identification_number && tokenUser){
      getFamilyGroup(user.identification_number, tokenUser);
    }
  }, [user, tokenUser]);

  const getFamilyGroup = useCallback(
    (dni, token) => {
      getFamilyGroupByIdentificationNumberMaster(dni, token)
        .then((res) => {
          setFamilyGroup(res)
        })
        .catch((err) => { throw new Error(err) })
      // }
    }, []);

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
    getAdminData,
    familyGroup,
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
    newRegisterUser
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
