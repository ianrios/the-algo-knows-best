import React, { createContext, useState, useEffect, useContext } from "react";
import { axiosHelper } from './axiosHelper'

const PlaylistContext = createContext({});

// helper function that exports just the needed / wanted data for the provider
export const PlaylistHelper = () => {

    // playlist specific
    const [allPlaylistData, setAllPlaylistData] = useState([])

    function saveAllPlaylistData(data) {
        // TODO: create a "next state" that only updates the main playlist when at the end of a song play OR if the current song index is the same in both arrays
        setAllPlaylistData(prevAllPlaylistData => data.data)
    }

    function saveNewPlaylist(data, token, newPlaylist, failureMethod) {
        const successMethod = () => {
            newPlaylist()
            getAllPlaylistData()
        }
        axiosHelper({
            data,
            method: 'post',
            token,
            url: '/api/playlist/save',
            successMethod,
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