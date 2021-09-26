import React, { createContext, useState, useEffect, useContext } from "react";
import { axiosHelper } from './axiosHelper'
import history from './history'

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

  // retaining user login information
  useEffect(() => {
    let lsToken = window.localStorage.getItem('token');
    // console.log(lsToken)
    if (lsToken) {
      axiosHelper({
        url: '/api/user',
        successMethod: saveUserData,
        failureMethod: destroyToken,
        token: lsToken
      })
      setToken(lsToken)
    }
  }, [])

  function getUser(token) {
    axiosHelper({
      method: 'get',
      url: '/api/user',
      successMethod: saveUserData,
      token: token
    })
  }

  useEffect(() => {
    if (token.length > 0) {
      getUser()
    }
  }, [token])

  function saveToken(res) {
    let APItoken; // Initalize variable
    if (res.config.url === "https://finalproject-contactsmiththay315914.codeanyapp.com/api/register") {
      APItoken = res.data.data.token
    } else if (res.config.url === "https://finalproject-contactsmiththay315914.codeanyapp.com/oDatabase/token") {
      APItoken = res.data.access_token
    }

    setToken(APItoken);
    window.localStorage.setItem('token', APItoken)
  }

  function register(registrationData) {
    axiosHelper({
      data: registrationData,
      method: 'post',
      url: '/api/register',
      successMethod: saveToken,
    })
  }

  function login(loginData) {
    axiosHelper({
      data: {
        grant_type: "password",
        client_id: "2",
        client_secret: "n5sSon1N2Zrcg9mLIspncnApITp7LNf0rAQGqnvW",
        ...loginData
      },
      method: 'post',
      url: '/oAuth/token',
      successMethod: saveToken,
    })
  }

  function logout() {
    axiosHelper({
      url: '/api/logout',
      successMethod: destroyToken,
      token
    })
  }

  return { token, userData, register, login, logout }
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