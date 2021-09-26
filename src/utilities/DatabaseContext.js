import React, { createContext, useState, useEffect, useContext } from "react";
import { axiosHelper } from './axiosHelper'
// import history from './history'
import { API_URL, client_secret } from './constants.js'

const DatabaseContext = createContext({});

// helper function that exports just the needed / wanted data for the provider
export const DatabaseHelper = () => {

  const [token, setToken] = useState('')
  const [userData, setUserData] = useState({})

  function saveUserData(res) {
    setUserData(res.data);
  }

  function destroyToken() {
    setToken('')
    window.localStorage.removeItem('token')
    // history.replace('/')
  }

  function saveToken(res) {
    let APItoken; // Initalize variable
    if (res.config.url === API_URL + "/api/auth/register") {
      APItoken = res.data.data.token
    } else if (res.config.url === API_URL + "/oauth/token") {
      APItoken = res.data.access_token
    }

    setToken(APItoken);
    window.localStorage.setItem('token', APItoken)
  }

  function register(registrationData) {
    axiosHelper({
      data: registrationData,
      method: 'post',
      url: '/api/auth/register',
      successMethod: saveToken,
    })
  }

  function login(loginData) {
    axiosHelper({
      data: {
        grant_type: "password",
        client_id: "2",
        client_secret,
        ...loginData
      },
      method: 'post',
      url: '/oauth/token',
      successMethod: saveToken,
    })
  }

  function logout() {
    axiosHelper({
      url: '/api/auth/logout',
      successMethod: destroyToken,
      token
    })
  }

  function savePlaylist(playlistData) {
    axiosHelper({
      data: playlistData,
      method: 'post',
      url: '/api/playlist/save',
      successMethod: saveToken,
    })
  }

  function getUser(token) {
    axiosHelper({
      method: 'get',
      url: '/api/auth/user',
      successMethod: saveUserData,
      token: token
    })
  }

  // retaining user login information
  useEffect(() => {
    let lsToken = window.localStorage.getItem('token');
    // console.log(lsToken)
    if (lsToken) {
      axiosHelper({
        url: '/api/auth/user',
        successMethod: saveUserData,
        failureMethod: destroyToken,
        token: lsToken
      })
      setToken(lsToken)
    }
    else {
      register({})
    }
  }, [])

  useEffect(() => {
    if (token.length > 0) {
      getUser()
    }
  }, [token])

  return { token, userData, register, login, logout, savePlaylist }
}

// custom Provider component
export const DatabaseProvider = (props) => {

  const initialContext = DatabaseHelper()

  return (
    <DatabaseContext.Provider value={initialContext}>
      {props.children}
    </DatabaseContext.Provider>
  )
}

// create a custom hook
export const useDatabase = () => useContext(DatabaseContext);

// actual context
export default DatabaseContext;