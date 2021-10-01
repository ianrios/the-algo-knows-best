import React, { createContext, useState, useEffect, useContext } from "react";
import { axiosHelper } from './axiosHelper'
import { client_secret } from './constants.js'

const AuthContext = createContext({});

// helper function that exports just the needed / wanted data for the provider
export const AuthHelper = () => {

  const [token, setToken] = useState('')
  const [userData, setUserData] = useState({})

  // user specific
  function saveUserData(data) {
    // console.log(data)
    if (data.status) {
      setUserData(data.data);
      window.localStorage.setItem('user_data', JSON.stringify(data.data))
    }
    else {
      setUserData(data);
      window.localStorage.setItem('user_data', JSON.stringify(data))
    }

  }

  function saveToken(data) {
    // console.log("token:", data)
    setToken(prevToken => data);
    window.localStorage.setItem('token', data)
  }

  function destroyStorage() {
    setToken('')
    setUserData(prev => ({}))
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('user_data')

    register()
  }

  function logout() {
    axiosHelper({
      url: '/api/auth/logout',
      successMethod: destroyStorage,
      token
    })
  }


  function getUser(token) {
    axiosHelper({
      method: 'get',
      url: '/api/auth/user',
      successMethod: saveUserData,
      failureMethod: destroyStorage,
      token
    })
  }
  function updateUser() {
    if (token) {
      getUser(token)
    }
  }

  function login(data) {
    axiosHelper({
      data: {
        grant_type: "password",
        client_id: "2",
        client_secret,
        email: data.email,
        password: 'changeme',
      },
      method: 'post',
      url: '/api/auth/login',
      successMethod: r => saveToken(r.data.data.token),
      failureMethod: destroyStorage
    })
  }

  function saveAll(res) {
    let token_data = res.data.data.token
    let user_data = res.data.data.user_data

    saveToken(token_data)
    saveUserData(user_data)
  }

  function register() {
    axiosHelper({
      url: '/api/auth/register',
      successMethod: saveAll,
    })
  }

  // retaining user login information
  useEffect(() => {
    let lsToken = window.localStorage.getItem('token');
    let lsUserData = JSON.parse(window.localStorage.getItem('user_data'));
    if (lsToken && lsUserData) {
      // if we have both the token and the user data
      setToken(lsToken)
      setUserData(lsUserData)
    }
    else if (lsToken && !!!lsUserData) {
      // if we have the token but not the user
      getUser(lsToken)
      setToken(lsToken)
    }
    else if (!!!lsToken && lsUserData) {
      // if we have the user data but not the token
      login(lsUserData)
      setUserData(lsUserData)
    }
    else {
      // we dont have either, which means we need to register a new user
      register()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function saveTokenFromLS() {
    let lsToken = window.localStorage.getItem('token');
    setToken(lsToken)
  }

  useEffect(() => {
    if (token) {
      axiosHelper({
        method: 'get',
        url: '/api/auth/status',
        successMethod: saveTokenFromLS,
        failureMethod: destroyStorage,
        token
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])




  return {
    token, userData, logout, destroyStorage, updateUser, saveTokenFromLS
  }
}

// custom Provider component
export const AuthProvider = (props) => {

  const initialContext = AuthHelper()

  return (
    <AuthContext.Provider value={initialContext}>
      {props.children}
    </AuthContext.Provider>
  )
}

// create a custom hook
export const useAuth = () => useContext(AuthContext);

// actual context
export default AuthContext;