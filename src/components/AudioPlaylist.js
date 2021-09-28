import React, { useState, useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { OverlayTrigger, Tooltip, Spinner, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router';
import Modal from './Modal';
import { usePlaylist } from '../utilities/PlaylistContext';
import { useAuth } from '../utilities/AuthContext';
import { generateOrderedPlaylist } from '../utilities/algorithmicPlaylistGenerator'
import Icon from './Icon'

export default function AudioPlaylist(props) {

  const { saveNewPlaylist, getFinalPlaylistResult } = usePlaylist()
  const { token, destroyStorage } = useAuth()

  const history = useHistory()

  const newPlaylist = () => {
    setLikedStatus(prev => 'neutral')
  }

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
    setShuffledPlaylist(prevPlaylist => {
      const data = {
        preference: likedStatus,
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
        getFinalPlaylistResult()
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

  let currentSong;
  if (!!props.generating) {
    currentSong = shuffledPlaylist[props.currentSongIndex]
  }
  else {
    currentSong = props.algorithmicPlaylist[props.currentSongIndex]
  }

  useEffect(() => {
    if (currentSong) {
      setListenInterval(prevInterval => {
        let newInterval = Math.floor(currentSong.track.song_length / 10)
        if (prevInterval !== newInterval) {
          // console.log("setting interval")
          return newInterval
        }
        return prevInterval
      })
    }
  }, [props.currentSongIndex, currentSong])

  // listen interval code
  const handleListen = () => {
    // percent listened based on song time length (broken up into 10ths)
    // console.log("listening at 1/10th of the song length:", listenInterval)
    setShuffledPlaylist(prevPlaylist => {
      return prevPlaylist.map(prevPlaylistTrack => {
        let playlistTrack = { ...prevPlaylistTrack };
        if (playlistTrack.track.file_name === currentSong.track.file_name) {
          playlistTrack.num_plays += .1;
        }
        return playlistTrack;
      })
    })
  }

  // useEffect(() => {
  //   if (currentSong) {
  //     // if (currentSong.track.file_name) {
  //     setListenInterval(prevInterval => {
  //       // TODO: use current song audio duration instead of saving this data in database
  //       console.log('setting interval:', currentSong.track.song_length)
  //       // let audio = document.querySelector('audio')
  //       // let newInterval = Math.floor(audio.duration * 100)
  //       // return newInterval
  //       return Math.floor(currentSong.track.song_length / 10)
  //     })
  //     // }
  //   }
  // }, [
  //   props.currentSongIndex, currentSong
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
  const [likedStatus, setLikedStatus] = useState("neutral")
  const handleLike = () => {
    setLikedStatus(prevStatus => prevStatus === "positive" ? "neutral" : "positive")
  }
  const handleDislike = () => {
    setLikedStatus(prevStatus => prevStatus === "negative" ? "neutral" : "negative")
  }

  const LikeModule = (dislikeMethod, likeMethod) => (
    <div className="btn-group" role="group" aria-label="popularity controls">
      <button type="button" className="btn btn-outline-primary" onClick={dislikeMethod}>
        {(likedStatus === "neutral" || likedStatus === "positive") && <Icon type='hand-thumbs-down' />}
        {likedStatus === "negative" && <Icon type='hand-thumbs-down-fill' />}
      </button>
      <button type="button" className="btn btn-outline-primary" onClick={likeMethod}>
        {(likedStatus === "neutral" || likedStatus === "negative") && <Icon type='hand-thumbs-up' />}
        {likedStatus === "positive" && <Icon type='hand-thumbs-up-fill' />}
      </button>
    </div>
  )

  useEffect(() => {
    // Component Will Unmount  
    return function cleanup() {
      if (!!!props.generating) {
        const data = {
          preference: likedStatus,
          playlistData: shuffledPlaylist
        }
        saveNewPlaylist(data, token, newPlaylist, destroyStorage)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    currentSong ? <>
      {(!!!props.generating && props.algorithmicPlaylist.length > 0) ?
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
            src={currentSong.track.file_name}
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
              loop={looped}
              src={currentSong.track.file_name}
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
      <Modal
        handleClose={closeAndRepeat}
        primaryButtonClickHandler={viewResults}
        secondaryButtonClickHandler={closeAndRepeat}
        infoButtonClickHandler={confirmShuffleModal}
        likeModule={LikeModule(handleDislike, handleLike)}
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
        likeModule={LikeModule(handleDislike, handleLike)}
        titleText={"New Playist?"}
        bodyText={"By pressing the shuffle button, your listening experience will be re-crafted with a new randomly generated tracklist."}
        primaryBtnText={"Continue"}
        secondaryBtnText={"Back"}
        show={showShuffleModal}
      />
    </> : (
      <Row>
        <Col className='d-flex justify-content-center'>
          <Spinner animation="grow" />
        </Col>
      </Row>
    )
  )
}
