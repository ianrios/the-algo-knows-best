import React, { useState, useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { OverlayTrigger, Tooltip, Spinner, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router';
import Modal from './Modal';
import { usePlaylist } from '../utilities/PlaylistContext';
import { useAuth } from '../utilities/AuthContext';
import Icon from './Icon'

export default function AudioPlaylist(props) {
  const playlist = props.playlist
  const index = props.currentSongIndex
  const currentSong = playlist[index]

  const { shufflePlaylist, saveNewPlaylist, getFinalPlaylistNextResult, updatePlaylistData } = usePlaylist()
  const { token, destroyStorage, updateUser } = useAuth()

  const history = useHistory()

  const newPlaylist = () => {
    setLooped(false)
    setPlaylistPreference(prev => 0)
    updateUser()
  }

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
  const confirmShuffleModal = () => {
    setShowEndingModal(false);
    setShowShuffleModal(false);
    handleShuffle()
  }

  // Audio Object Code
  const handleShuffle = () => {
    props.setPlaylist(prevPlaylist => {
      const data = {
        preference: playlistPreference,
        playlistData: prevPlaylist
      }
      saveNewPlaylist(data, token, newPlaylist, destroyStorage)
      return [...shufflePlaylist(prevPlaylist)]
    })
    props.setCurrentSongIndex(prevIndex => 0)
  }
  const handleEnded = () => {
    if (!looped) {
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
  // muted code
  // const [muted, setMuted] = useState(false)
  // const handleMuted = () => {
  //   setMuted(prev => !prev)
  // }
  const handleBack = () => {
    props.setCurrentSongIndex(prevIndex => {
      if (prevIndex - 1 < 0) {
        return 0
      }
      return prevIndex - 1
    })
  }

  // loop code
  const [looped, setLooped] = useState(false)
  const handleLoop = () => {
    setLooped(prev => !prev)
  }

  const [listenInterval, setListenInterval] = useState(30000)

  useEffect(() => {
    getFinalPlaylistNextResult()
    updatePlaylistData(index, !!props.generating, true)
  }, [listenInterval])

  useEffect(() => {
    if (currentSong) {
      setListenInterval(prevInterval => {
        let newInterval = Math.floor(currentSong.track.song_length / 10)
        if (prevInterval !== newInterval) {
          return newInterval
        }
        return prevInterval
      })
    }
  }, [index, currentSong])

  // listen interval code
  const handleListen = () => {
    // percent listened based on song time length (broken up into 10ths)
    updatePlaylistData(index, !!props.generating, false)
    if (!!props.generating) {
      props.setPlaylist(prevPlaylist => {
        return prevPlaylist.map(prevPlaylistTrack => {
          let playlistTrack = { ...prevPlaylistTrack };
          if (playlistTrack.track.file_name === currentSong.track.file_name) {
            playlistTrack.play_count += .1;
          }
          return playlistTrack;
        })
      })
    }
  }

  // TODO: use current song audio duration instead of saving this data in database
  // useEffect(() => {
  //   if (currentSong) {
  //     // if (currentSong.track.file_name) {
  //     setListenInterval(prevInterval => {
  //       // let audio = document.querySelector('audio')
  //       // let newInterval = Math.floor(audio.duration * 100)
  //       // return newInterval
  //       return Math.floor(currentSong.track.song_length / 10)
  //     })
  //     // }
  //   }
  // }, [
  //   index, currentSong
  // ])


  const handleAbort = () => {
    // console.log("abort")
  }
  const handlePause = () => {
    // console.log("pause")
  }
  const handlePlay = () => {
    // console.log("play")
  }

  const handleSeeked = () => {
    // console.log("seeked")
  }
  const handleVolumeChanged = () => {
    // console.log("volume changed")
  }

  // liked status code
  // TODO: convert to integer to better integrate with database
  const [playlistPreference, setPlaylistPreference] = useState(0)
  const handlePlaylistLike = () => {
    setPlaylistPreference(prevStatus => prevStatus === 1 ? 0 : 1)
  }
  const handlePlaylistDislike = () => {
    setPlaylistPreference(prevStatus => prevStatus === -1 ? 0 : -1)
  }
  const handleTrackLike = () => {
    props.setPlaylist(prevPlaylist => {
      let mappedPlaylist = [...prevPlaylist].map((playlistTrack, idx) => {
        let newPlaylistTrack = { ...playlistTrack }
        if (index === idx) {
          let newTrack = { ...newPlaylistTrack.track }
          let newPreference = newTrack.preference === 1 ? 0 : 1
          newTrack.preference = newPreference
          newPlaylistTrack.track = newTrack
        }
        return newPlaylistTrack
      })
      return mappedPlaylist
    })
  }
  const handleTrackDislike = () => {
    props.setPlaylist(prevPlaylist => {
      let mappedPlaylist = [...prevPlaylist].map((playlistTrack, idx) => {
        let newPlaylistTrack = { ...playlistTrack }
        if (index === idx) {
          let newTrack = { ...newPlaylistTrack.track }
          let newPreference = newTrack.preference === -1 ? 0 : -1
          newTrack.preference = newPreference
          newPlaylistTrack.track = newTrack
        }
        return newPlaylistTrack
      })
      return mappedPlaylist
    })
  }
  const handlePlacementLike = () => {
    // setPlaylistPreference(prevStatus => prevStatus === 1 ? 0 : 1)
  }
  const handlePlacementDislike = () => {
    // setPlaylistPreference(prevStatus => prevStatus === -1 ? 0 : -1)
  }

  const LikeModule = (dislikeMethod, likeMethod, state, location) => {
    console.log('rendering like module in ' + location + " :", state)
    return (
      <div className="btn-group" role="group" aria-label="popularity controls">
        <button type="button" className="btn btn-outline-primary" onClick={dislikeMethod}>
          {(state === 0 || state === 1) && <Icon type='hand-thumbs-down' />}
          {state === -1 && <Icon type='hand-thumbs-down-fill' />}
        </button>
        <button type="button" className="btn btn-outline-primary" onClick={likeMethod}>
          {(state === 0 || state === -1) && <Icon type='hand-thumbs-up' />}
          {state === 1 && <Icon type='hand-thumbs-up-fill' />}
        </button>
      </div>
    )
  }
  useEffect(() => {
    // Component Will Unmount  
    return function cleanup() {
      if (!!props.generating) {
        const data = {
          preference: playlistPreference,
          playlistData: playlist
        }
        saveNewPlaylist(data, token, newPlaylist, destroyStorage)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    currentSong && props.playlist.length > 0 ? <>
      {(!!!props.generating) ?
        <>
          <h5>Currently Playing: Song {currentSong.track.id}</h5>
          <ReactAudioPlayer
            onEnded={handleEnded}
            onListen={handleListen}
            onAbort={handleAbort}
            onPause={handlePause}
            onPlay={handlePlay}
            onSeeked={handleSeeked}
            onVolumeChanged={handleVolumeChanged}
            loop={false}
            src={'./audio/' + currentSong.track.file_name}
            listenInterval={listenInterval}
            className="w-100 rounded"
            autoPlay
            controls
          />
        </>
        :
        <div className="card">
          <img src="./images/album_art.jpg" className="card-img-top" alt="artwork" />
          <div className="card-body">
            <h5 className="card-title">Song {currentSong.track.id}</h5>
            <p className="card-text">Original track order used for song title</p>
            <p className="card-text d-flex flex-column">
              <small className="text-muted">
                Track {index + 1} of {playlist.length} in shuffled playlist
              </small>
              <small className="text-muted">
                <span className="badge bg-secondary rounded-pill float-right">
                  {playlist.length - index - 1}</span> songs left
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
              loop={looped}
              src={'./audio/' + currentSong.track.file_name}
              listenInterval={listenInterval}
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
                  <Icon type='shuffle' />
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
                  <Icon type='arrow-repeat' />
                </button>
              </OverlayTrigger>
            </div>

            {LikeModule(handleTrackDislike, handleTrackLike, currentSong.track.preference, 'track')}


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
                  <Icon type='skip-backward' />
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
                  <Icon type='skip-forward' />
                </button>
              </OverlayTrigger>
            </div>
          </div>
        </div>
      }
      {showEndingModal &&
        <Modal
          handleClose={closeAndRepeat}
          primaryButtonClickHandler={viewResults}
          secondaryButtonClickHandler={closeAndRepeat}
          infoButtonClickHandler={confirmShuffleModal}
          likeModule={LikeModule(handlePlaylistDislike, handlePlaylistLike, playlistPreference, 'end modal')}
          titleText={"End of playlist"}
          bodyText={"You have listened through the randomly generated playlist. Feel free to view the results, or generate a new playlist. If you close the modal without choosing an option, the playlist you were crafted will continue to play on loop."}
          primaryBtnText={"View Results"}
          secondaryBtnText={"Close and Continue Listening"}
          infoBtnText={"Generate New Experience"}
          show={showEndingModal}
        />}
      {showShuffleModal && <Modal
        handleClose={closeShuffleModal}
        primaryButtonClickHandler={confirmShuffleModal}
        secondaryButtonClickHandler={closeShuffleModal}
        likeModule={LikeModule(handlePlaylistDislike, handlePlaylistLike, playlistPreference, 'shuffle modal')}
        titleText={"New Playist?"}
        bodyText={"By pressing the shuffle button, your listening experience will be re-crafted with a new randomly generated tracklist."}
        primaryBtnText={"Continue"}
        secondaryBtnText={"Back"}
        show={showShuffleModal}
      />
      }
    </> : (
      <Row>
        <Col className='d-flex justify-content-center'>
          <Spinner animation="grow" />
        </Col>
      </Row>
    )
  )
}
