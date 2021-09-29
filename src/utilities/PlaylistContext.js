import React, { createContext, useState, useEffect, useContext } from "react";
import { axiosHelper } from './axiosHelper'

const PlaylistContext = createContext({});

// helper function that exports just the needed / wanted data for the provider
export const PlaylistHelper = () => {

    const [initialLoad, setInitialLoad] = useState(false)

    // next state
    const [nextPlaylistData, setNextPlaylistData] = useState([])
    function nextPlaylistDataState(data) {
        setNextPlaylistData(prevFinalPlaylistResult => data.data)
    }


    // final result
    const [finalPlaylistResult, setFinalPlaylistResult] = useState([])
    function getFinalPlaylistResult() {
        axiosHelper({
            url: '/api/playlist/result',
            successMethod: nextPlaylistDataState,
        })
    }
    function updatePlaylistData(currentSongIndex) {
        if (initialLoad) {
            setFinalPlaylistResult(prevFinalPlaylistResult => {
                // if current song is the same index in both arrays
                if (prevFinalPlaylistResult[currentSongIndex].track.file_name === nextPlaylistData[currentSongIndex].track.file_name) {
                    return nextPlaylistData
                }
                // if current song has ended
                // if () {
                //     return nextPlaylistData
                // }
                return prevFinalPlaylistResult
            })
        }
    }
    useEffect(() => {
        updatePlaylistData()
        // console.log("resulting playlist:", nextPlaylistData)

    }, [nextPlaylistData])

    // save new playlist to database
    function saveNewPlaylist(data, token, newPlaylist, failureMethod) {
        const successMethod = () => {
            newPlaylist()
            getFinalPlaylistResult()
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

    // all playlists from database
    const [allPlaylistData, setAllPlaylistData] = useState([])
    function saveAllPlaylistData(data) {
        setAllPlaylistData(prevAllPlaylistData => data.data)
    }
    function getAllPlaylistData() {
        axiosHelper({
            url: '/api/playlist/get/all',
            successMethod: saveAllPlaylistData,
        })
    }

    // on mount, get final result from database
    useEffect(() => {
        getFinalPlaylistResult()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return {
        saveNewPlaylist,

        nextPlaylistData, // temporarily here to view in console.log
        finalPlaylistResult,
        // getFinalPlaylistResult,
        updatePlaylistData,

        allPlaylistData,
        getAllPlaylistData,
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