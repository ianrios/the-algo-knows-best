import React, { createContext, useState, useEffect, useContext } from "react";
import { axiosHelper } from './axiosHelper'

const PlaylistContext = createContext({});

// helper function that exports just the needed / wanted data for the provider
export const PlaylistHelper = () => {

    const songLengths = [
        39778,
        42872,
        39111,
        33153,
        34305,
        40556,
        39559,
        42451,
        37662,
        45667,
        44555,
        48004,
        45163,
        45695,
        43243,
        50109
    ]

    // do this on backend
    function mapUserDataToPlaylist(userData, setPlaylist) {
        if (userData.track_statistics && userData.track_statistics.length > 0) {
            setPlaylist(prevPlaylist => prevPlaylist.map(currentTrack => {
                let userDataCopy = { ...userData }
                let newPlaylistTrack = { ...currentTrack }
                let trackStatisticIndex = userData.track_statistics.findIndex(trackStatistic => trackStatistic.track_id === newPlaylistTrack.id)
                // let newTrack = { ...newPlaylistTrack.track }

                let userTrackStatistics = [...userDataCopy.track_statistics]

                let userTrackStatistic = { ...userTrackStatistics[trackStatisticIndex] }

                // console.log('map user data to playlist', newPlaylistTrack.id)
                // console.log(userData.track_statistics[trackStatisticIndex].preference)

                // let newTrackStatistic = { ...userData.track_statistics[trackStatisticIndex] }
                // newTrack.preference = newTrackStatistic.preference

                newPlaylistTrack.preference = userTrackStatistic.preference
                return newPlaylistTrack
            }))
        }
    }

    function generateOrderedPlaylist() {
        return songLengths.map((songLength, index) => {
            const id = index + 1
            return (
                {
                    id: id, //created on backend, generated for front end using index
                    rank: id,
                    rating: 0,
                    // order: to be created based on final resulting index in array
                    // playlist_id: to be created on backend,
                    preference: 0, //
                    listener_count: 0, //
                    placement_liked: 0, // 0 neutral, 1 positive, -1 negative
                    play_count: 0.0, // percent listened based on skips, pauses, loops, or restarts
                    file_name: `T00${id > 9 ? id : "0" + id}.wav`,
                    song_length: songLength,
                    interactions: 0,
                    track: {
                        id: id,
                        preference: 0, // 0 neutral, 1 positive, -1 negative TODO: remove from track, move up to playlistTrack
                        song_length: songLength,
                        file_name: `T00${id > 9 ? id : "0" + id}.wav`
                    }
                }
            )
        })
    }

    function shufflePlaylist(arr) {
        // Standard Fisher Yates Shuffle Algorithm
        let currIdx = arr.length, randIdx;

        // While there remain elements to shuffle...
        while (currIdx !== 0) {

            // Pick a remaining element...
            randIdx = Math.floor(Math.random() * currIdx);
            currIdx--;

            // And swap it with the current element.
            [arr[currIdx], arr[randIdx]] = [arr[randIdx], arr[currIdx]];
        }

        // code to reset array statistics
        return arr.map((prevItem, index) => {
            let item = { ...prevItem }

            item.rank = index + 1
            item.rating = 0
            item.listener_count = 0
            item.placement_liked = 0
            // item.preference = 0
            item.play_count = 0.0

            let track = { ...item.track }
            // track.preference = 0

            item.track = track

            return item
        })
    }



    // next state
    const [nextPlaylist, setNextPlaylist] = useState([])
    function saveNextPlaylist(data) {
        setNextPlaylist(prevNextPlaylist => data.data)
    }

    // final result
    const [finalPlaylistResult, setFinalPlaylistResult] = useState([])
    useEffect(() => {
        // on mount - create new instance of playlist to look at 
        setFinalPlaylistResult(generateOrderedPlaylist())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function getFinalPlaylistNextResult() {
        axiosHelper({
            url: '/api/playlist/result',
            successMethod: saveNextPlaylist,
        })
    }
    function updatePlaylistData(currentSongIndex, generating, songEnded) {
        // console.log(nextPlaylist)
        setFinalPlaylistResult(prevFinalPlaylistResult => {
            if (prevFinalPlaylistResult.length && nextPlaylist.length) {
                // if we have data we can look at

                if (generating) {
                    // if we are currently generating data, we can update the result, no worries
                    return nextPlaylist
                }
                if (songEnded) {
                    // if current song has ended
                    return nextPlaylist
                }
                if (nextPlaylist[currentSongIndex].track) {

                    if (prevFinalPlaylistResult[currentSongIndex].track.file_name === nextPlaylist[currentSongIndex].track.file_name) {
                        // if current song is the same index in both arrays
                        return nextPlaylist
                    }
                }
                else {
                    // songs do not match, but we still need the data
                    // TODO: we need to return safely somehow
                    return nextPlaylist
                }


            }
            // no conditions were met, return same playlist we are currently listening to
            return prevFinalPlaylistResult
        })
    }



    // save new playlist to database
    function saveNewPlaylist(data, token, newPlaylist, failureMethod, setPlaylist = () => console.log("setting playlist")) {

        // TODO: figure out why token is not getting sent from authContext
        let lsToken = window.localStorage.getItem('token');

        const successMethod = async () => {
            newPlaylist()
            getFinalPlaylistNextResult()
            setPlaylist(prev => [...shufflePlaylist(data.playlistData)])
        }
        console.log({ data, token, lsToken })
        axiosHelper({
            data,
            method: 'post',
            token: lsToken,
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
        getFinalPlaylistNextResult()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return {
        mapUserDataToPlaylist,

        generateOrderedPlaylist,
        shufflePlaylist,

        saveNewPlaylist,

        finalPlaylistResult,
        getFinalPlaylistNextResult,

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