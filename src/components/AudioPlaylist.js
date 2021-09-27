import React, { useState, useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useHistory } from 'react-router';
import Modal from './Modal';
import { usePlaylist } from '../utilities/PlaylistContext';
import { useAuth } from '../utilities/AuthContext';

import { generateOrderedPlaylist } from '../utilities/algorithmicPlaylistGenerator'

export default function AudioPlaylist(props) {

  const { saveNewPlaylist, getAllPlaylistData } = usePlaylist()
  const { token } = useAuth()

  const history = useHistory()

  const shufflePlaylist = arr => {
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

    return arr.map(prevItem => {
      let item = { ...prevItem }
      item.num_plays = 0
      item.placement_liked = 0
      return item
    })
  }

  const playlist = generateOrderedPlaylist()

  const [shuffledPlaylist, setShuffledPlaylist] = useState(shufflePlaylist(playlist))

  const [muted, setMuted] = useState(false)
  const [looped, setLooped] = useState(false)
  const [likedStatus, setLikedStatus] = useState("neutral")


  // Ending Modal Code
  const [showEndingModal, setShowEndingModal] = useState(false);
  const handleShowEndingModal = () => setShowEndingModal(true);
  const closeAndRepeat = () => {
    setShowEndingModal(false);
    props.setCurrentSongIndex(prevIndex => 0)

  }
  const viewResults = () => {
    setShowEndingModal(false);
    history.push('/results')
  }

  // Shuffle Modal Code
  const [showShuffleModal, setShowShuffleModal] = useState(false);
  const handleShowShuffleModal = () => setShowShuffleModal(true);
  const closeShuffleModal = () => {
    setShowShuffleModal(false);
  }
  const handleShuffle = () => {
    setShuffledPlaylist(prevPlaylist => {
      const data = {
        preference: likedStatus,
        playlistData: prevPlaylist
      }
      saveNewPlaylist(data, token)

      return [...shufflePlaylist(prevPlaylist)]
    })
    props.setCurrentSongIndex(prevIndex => 0)
  }
  const confirmShuffleModal = () => {
    setShowEndingModal(false);
    setShowShuffleModal(false);
    handleShuffle()
  }

  const handleEnded = () => {
    if (!looped) {
      props.setCurrentSongIndex(prevIndex => {
        getAllPlaylistData()
        if (prevIndex + 1 >= playlist.length) {
          if (!!props.generating) {
            handleShowEndingModal()
          }
          return 0
        }
        return prevIndex + 1
      })
    }
  }
  const handleSkip = () => {
    props.setCurrentSongIndex(prevIndex => {
      if (prevIndex + 1 >= playlist.length) {
        if (!!props.generating) {
          handleShowEndingModal()
        }
        return 0
      }
      return prevIndex + 1
    })
  }
  const handleBack = () => {
    props.setCurrentSongIndex(prevIndex => {
      if (prevIndex - 1 < 0) {
        return 0
      }
      return prevIndex - 1
    })
  }
  const handleLoop = () => {
    setLooped(prev => !prev)
  }
  const handleMuted = () => {
    setMuted(prev => !prev)
  }

  const handleListen = () => {
    setShuffledPlaylist(prevPlaylist => {
      // 30 seconds counts as a listen
      return prevPlaylist.map(prevPlaylistTrack => {
        let playlistTrack = { ...prevPlaylistTrack };
        if (playlistTrack.track.file_name === currentSong.track.file_name) {
          playlistTrack.num_plays++;
        }
        return playlistTrack;
      })
    })
  }
  const handleAbort = () => {
    console.log("abort")
  }
  const handlePause = () => {
    console.log("pause")
  }
  const handlePlay = () => {
    console.log("play")
  }

  const handleSeeked = () => {
    console.log("seeked")
  }
  const handleVolumeChanged = () => {
    console.log("volume changed")
  }

  const handleLike = () => {
    setLikedStatus(prevStatus => prevStatus === "positive" ? "neutral" : "positive")
  }
  const handleDislike = () => {
    setLikedStatus(prevStatus => prevStatus === "negative" ? "neutral" : "negative")
  }

  useEffect(() => {
    setLikedStatus(prevStatus => "neutral")
  }, [props.currentSongIndex])

  useEffect(() => {
    // Component Will Unmount  
    return function cleanup() {
      const data = {
        preference: likedStatus,
        playlistData: shuffledPlaylist
      }
      saveNewPlaylist(data, token)
    };
  }, []);

  useEffect(() => {
    setLikedStatus(prev => 'neutral')
  }, [JSON.stringify(shuffledPlaylist)])

  let currentSong = {}
  if (!!props.generating) {
    currentSong = shuffledPlaylist[props.currentSongIndex]
  }
  else {
    currentSong = props.algorithmicPlaylist[props.currentSongIndex]
  }

  // const currentSong = shuffledPlaylist[props.currentSongIndex]

  // const currentSong = (!!props.generating && props.currentSongIndex)
  //   ? shuffledPlaylist[props.currentSongIndex]
  //   : !!props.algorithmicPlaylist && props.algorithmicPlaylist[props.currentSongIndex]


  // const currentPlaylist = shuffledPlaylist.map((item, index) => {
  //   return (
  //     <li
  //       key={index}
  //       className={"list-group-item d-flex justify-content-between align-items-center " +
  //         index === props.currentSongIndex && "bg-primary"
  //       }
  //     >
  //       Song {item.id} <span className="badge bg-secondary rounded-pill float-right">14</span>
  //     </li>
  //   )
  // })

  const LikeModule = (
    <div className="btn-group" role="group" aria-label="popularity controls">
      <button type="button" className="btn btn-outline-primary" onClick={handleDislike}>
        {(likedStatus === "neutral" || likedStatus === "positive") && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-thumbs-down" viewBox="0 0 16 16">
          <path d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856 0 .289-.036.586-.113.856-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a9.877 9.877 0 0 1-.443-.05 9.364 9.364 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964l-.261.065zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a8.912 8.912 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.224 2.224 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.866.866 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1z" />
        </svg>
        }
        {likedStatus === "negative" &&
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-thumbs-down-fill" viewBox="0 0 16 16">
            <path d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.378 1.378 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51.136.02.285.037.443.051.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.896 1.896 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2.094 2.094 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.162 3.162 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.823 4.823 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591z" />
          </svg>
        }
      </button>
      <button type="button" className="btn btn-outline-primary" onClick={handleLike}>
        {(likedStatus === "neutral" || likedStatus === "negative") && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
          <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
        </svg>}
        {likedStatus === "positive" &&
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
            <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
          </svg>
        }
      </button>
    </div>
  )

  return (
    <>
      {(!!!props.generating && props.algorithmicPlaylist.length > 0) ?
        <>
          <h5>Currently Playing: Song {currentSong.track.id + 1}</h5>
          <ReactAudioPlayer
            onEnded={handleEnded}
            onListen={handleListen}
            onAbort={handleAbort}
            onPause={handlePause}
            onPlay={handlePlay}
            onSeeked={handleSeeked}
            onVolumeChanged={handleVolumeChanged}
            muted={muted}
            loop={false}
            src={currentSong.track.file_name}
            listenInterval={30000}
            className="w-100 rounded"
            autoPlay
            controls
          />
        </>
        :
        <div className="card">
          {/* <div className="card-header">
          <h4>Your Current Playlist</h4>
          <ul className="list-group ">
            {currentPlaylist}
          </ul>
        </div> */}
          <img src="./images/album_art.jpg" className="card-img-top" alt="artwork" />
          <div className="card-body">
            <h5 className="card-title">Song {currentSong.track.id + 1}</h5>
            <p className="card-text">Original track order used for song title</p>
            <p className="card-text d-flex flex-column">
              <small className="text-muted">
                Track {props.currentSongIndex + 1} of {playlist.length} in shuffled playlist
              </small>
              <small className="text-muted">
                <span className="badge bg-secondary rounded-pill float-right">
                  {playlist.length - props.currentSongIndex - 1}</span> songs left
              </small>
              {/* TODO: move like/dislike song here */}
              {/* TODO: add ability to like/dislike placement here */}
            </p>
          </div>
          <div className="card-footer d-flex justify-content-between">
            <ReactAudioPlayer
              onEnded={handleEnded}
              onListen={handleListen}
              onAbort={handleAbort}
              onPause={handlePause}
              onPlay={handlePlay}
              onSeeked={handleSeeked}
              onVolumeChanged={handleVolumeChanged}
              muted={muted}
              loop={looped}
              src={currentSong.track.file_name}
              listenInterval={30000}
              className="w-100 rounded"
              autoPlay
              controls
            />
          </div>
          <div className="card-footer d-flex justify-content-between">
            <div className="btn-group" role="group" aria-label="playlist controls">
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id={`tooltip-top`}>
                    The Shuffle Button will re shuffle the entire playlist and restart the song playback from the beginning.
                  </Tooltip>
                }
              >
                <button type="button" className="btn btn-outline-primary" onClick={handleShowShuffleModal}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-shuffle" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z" />
                    <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z" />
                  </svg>
                </button>
              </OverlayTrigger>
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id={`tooltip-top`}>
                    The Loop Button will loop the current song while green.
                  </Tooltip>
                }
              >
                <button type="button" className={`btn ${looped ? "btn-success" : "btn-outline-primary"}`} onClick={handleLoop}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-repeat" viewBox="0 0 16 16">
                    <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
                    <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" />
                  </svg>
                </button>
              </OverlayTrigger>
            </div>

            <div className="btn-group mx-2" role="group" aria-label="audio controls">
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id={`tooltip-top`}>
                    The Back Button will take you back to the beginning of the previous song. If you are at the beginning of the playlist, nothing will happen.
                  </Tooltip>
                }
              >
                <button type="button" className="btn btn-outline-primary" onClick={handleBack}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-skip-backward" viewBox="0 0 16 16">
                    <path d="M.5 3.5A.5.5 0 0 1 1 4v3.248l6.267-3.636c.52-.302 1.233.043 1.233.696v2.94l6.267-3.636c.52-.302 1.233.043 1.233.696v7.384c0 .653-.713.998-1.233.696L8.5 8.752v2.94c0 .653-.713.998-1.233.696L1 8.752V12a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm7 1.133L1.696 8 7.5 11.367V4.633zm7.5 0L9.196 8 15 11.367V4.633z" />
                  </svg>
                </button>
              </OverlayTrigger>
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id={`tooltip-top`}>
                    The Next Button will take you to the beginning of the next song. If you are at the end of the playlist, you will be placed back at the beginning of the playlist.
                  </Tooltip>
                }
              >
                <button type="button" className="btn btn-outline-primary" onClick={handleSkip}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-skip-forward" viewBox="0 0 16 16">
                    <path d="M15.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V8.752l-6.267 3.636c-.52.302-1.233-.043-1.233-.696v-2.94l-6.267 3.636C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696L7.5 7.248v-2.94c0-.653.713-.998 1.233-.696L15 7.248V4a.5.5 0 0 1 .5-.5zM1 4.633v6.734L6.804 8 1 4.633zm7.5 0v6.734L14.304 8 8.5 4.633z" />
                  </svg>
                </button>
              </OverlayTrigger>
            </div>
          </div>
        </div>
      }
      <Modal
        handleClose={closeAndRepeat}
        primaryButtonClickHandler={viewResults}
        secondaryButtonClickHandler={closeAndRepeat}
        infoButtonClickHandler={confirmShuffleModal}
        likeModule={LikeModule}
        titleText={"End of Playlist"}
        bodyText={"You have listened through the randomly generated playlist. Feel free to view the results, or generate a new playlist. If you close the modal without choosing an option, the playlist you were crafted will continue to play on loop."}
        primaryBtnText={"View Results"}
        secondaryBtnText={"Close and Continue Listening"}
        infoBtnText={"Generate New Experience"}
        show={showEndingModal}
      />
      <Modal
        handleClose={closeShuffleModal}
        primaryButtonClickHandler={confirmShuffleModal}
        secondaryButtonClickHandler={closeShuffleModal}
        likeModule={LikeModule}
        titleText={"New Playist?"}
        bodyText={"By pressing the shuffle button, your listening experience will be re-crafted with a new randomly generated tracklist."}
        primaryBtnText={"Continue"}
        secondaryBtnText={"Back"}
        show={showShuffleModal}
      />
    </>
  )
}
