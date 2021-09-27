import React, { createContext, useState, useEffect, useContext } from "react";
import { axiosHelper } from './axiosHelper'
// import history from './history'
import { API_URL, client_secret } from './constants.js'

const DatabaseContext = createContext({});

// helper function that exports just the needed / wanted data for the provider
export const DatabaseHelper = () => {

  const [token, setToken] = useState('')
  const [userData, setUserData] = useState({})
  const [playlistData, setPlaylistData] = useState({})

  function savePlaylistData(data) {
    console.log(data)
    setPlaylistData(prevPlaylistData => data)
  }

  function saveUserData(res) {
    setUserData(res.data);
  }

  function destroyStorage() {
    setToken('')
    setUserData(prev => ({}))
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('user_data')

    register()
    // history.replace('/')
  }

  function saveToken(res) {
    console.log("url", res.config.url)

    let data; // Initalize variable
    if (res.config.url === API_URL + "/api/auth/register") {
      data = res.data.data
    } else if (res.config.url === API_URL + "/api/auth/login") {
      data = res.data.data
    }

    console.log("token:", data.token)
    setToken(data.token);
    setUserData(data.user_data);
    window.localStorage.setItem('token', data.token)
    window.localStorage.setItem('user_data', JSON.stringify(data.user_data))
  }

  function register() {
    axiosHelper({
      url: '/api/auth/register',
      successMethod: saveToken,
    })
  }

  function login() {
    axiosHelper({
      data: {
        grant_type: "password",
        client_id: "2",
        client_secret,
        userData
      },
      method: 'post',
      url: '/api/auth/login',
      successMethod: saveToken,
      failureMethod: destroyStorage
    })
  }

  function logout() {
    axiosHelper({
      url: '/api/auth/logout',
      successMethod: destroyStorage,
      token
    })
  }

  function savePlaylist(data) {
    console.log({ data })
    axiosHelper({
      data,
      method: 'post',
      token,
      url: '/api/playlist/save',
    })
  }

  function getAllPlaylistData() {
    axiosHelper({
      url: '/api/playlist/get',
      successMethod: savePlaylistData,
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

  // retaining user login information
  useEffect(() => {
    let lsToken = window.localStorage.getItem('token');
    let lsUserData = JSON.parse(window.localStorage.getItem('user_data'));
    if (lsToken && !!!lsUserData) {
      // if we have the token but not the user
      getUser(lsToken)
      setToken(lsToken)
    }
    else if (!!!lsToken && lsUserData) {
      // if we have the user data but not the token
      login(lsUserData)
      setUserData(lsUserData)
    }
    else if (lsToken && lsUserData) {
      // if we have both the token and the user data
      setToken(lsToken)
      setUserData(lsUserData)
    }
    else {
      // we dont have either, which means we need to register a new user
      register()
    }
  }, [])

  useEffect(() => {
    if (token.length > 0) {
      getUser(token)
    }
  }, [token])

  return {
    token, userData, register, login, logout,
    playlistData, savePlaylist, getAllPlaylistData
  }
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