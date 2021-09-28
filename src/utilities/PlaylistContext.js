import React, { createContext, useState, useEffect, useContext } from "react";
import { axiosHelper } from './axiosHelper'

const PlaylistContext = createContext({});

// helper function that exports just the needed / wanted data for the provider
export const PlaylistHelper = () => {

    // playlist specific
    const [allPlaylistData, setAllPlaylistData] = useState([])

    function saveAllPlaylistData(data) {
        setAllPlaylistData(prevAllPlaylistData => data.data)
    }

    function saveNewPlaylist(data, token, failureMethod) {
        axiosHelper({
            data,
            method: 'post',
            token,
            url: '/api/playlist/save',
            successMethod: getAllPlaylistData,
            failureMethod,
        })
    }

    function getAllPlaylistData() {
        axiosHelper({
            url: '/api/playlist/get',
            successMethod: saveAllPlaylistData,
        })
    }

    useEffect(() => {
        getAllPlaylistData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return {
        allPlaylistData, saveNewPlaylist, getAllPlaylistData
    }
}

// custom Provider component
export const PlaylistProvider = (props) => {

    const initialContext = PlaylistHelper()

    return (
        <PlaylistContext.Provider value={initialContext}>
            {props.children}
        </PlaylistContext.Provider>
    )
}

// create a custom hook
export const usePlaylist = () => useContext(PlaylistContext);

// actual context
export default PlaylistContext;