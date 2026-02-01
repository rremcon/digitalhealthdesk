import React, {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode";
import api from "../api/client";
import {clearToken, getToken, setToken} from "../utils/authStorage";

export const AuthContext = createContext({});


function AuthContextProvider({children}) {

    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: "pending"
    });
    const navigate = useNavigate();


    useEffect(()=> {
        // retrieves the JWT from Local Storage (the key defined in the backend)
        const storedToken = getToken()

        // if there is a token, the user data is retrieved again
        if(storedToken) {
            const decodedToken = jwt_decode(storedToken)

            if (Math.floor (Date.now()/1000) < decodedToken.exp) {
                void fetchUserData(storedToken, decodedToken.sub)
            } else {
                clearToken()
            }
        } else {
            //if there is no token nothing happens
            setAuth({
                ...auth,
                isAuth: false,
                user: null,
                status: "done"
            });
        }

    }, []);


    function handleLogin(jwt, redirect = "/werklijst") {
        setToken(jwt)

        const decodedToken = jwt_decode(jwt);
        void fetchUserData(jwt, decodedToken.sub, redirect)
    }


    async function fetchUserData(jwt, id, redirect) {
        try {
            const response = await api.get(`/accounts/${id}`)

            setAuth(
                {
                    ...auth,
                    isAuth: true,
                    user: {
                        id: response.data.id,
                        email: response.data.email,
                        username: response.data.username,

                        firstname:response.data.firstname,
                        lastname:response.data.lastname,
                        birthdate:response.data.birthdate,
                        address:response.data.address,
                        zipcode:response.data.zipcode,
                        city:response.data.city,
                        phone:response.data.phone,
                        authorities:response.data.authority,
                    },
                    status: "done"
                })

            if (redirect) {
                navigate(redirect)
            }

        } catch (e) {
            console.error(e)
            setAuth( {
                ...auth,
                status: "done"
            })
        }
    }


    function handleLogout(e) {
        // e.preventDefault();
        clearToken()
        setAuth({
            ...auth,
            isAuth: false,
            user: null,
            status: "done"
        })
        navigate("/")
    }


    const contextData = {
        isAuth: auth.isAuth,
        user: auth.user,
        status: auth.status,
        login: handleLogin,
        logout: handleLogout
    }


    return (
        <AuthContext.Provider value={contextData}>
            {auth.status === "done" ? children : <p>Loading..</p>}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
