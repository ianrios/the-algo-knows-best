import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import {
  Link,
  // useHistory
} from 'react-router-dom'
import AudioPlaylist from '../components/AudioPlaylist'
import { useAuth } from '../utilities/AuthContext'
import { usePlaylist } from '../utilities/PlaylistContext'
import useDeepCompareEffect from 'use-deep-compare-effect'

export default function ExperimentPage() {
  const { updateUser, userData } = useAuth()
  const { mapUserDataToPlaylist, generateOrderedPlaylist, shufflePlaylist,
    // saveNewPlaylist
  } = usePlaylist()
  // TODO: map user data for likes to current playlist tracks for conditional rendering

  const [shuffledPlaylist, setShuffledPlaylist] = useState(shufflePlaylist(generateOrderedPlaylist()))

  const [currentSongIndex, setCurrentSongIndex] = useState(0)

  useEffect(() => {
    updateUser()
  }, [])

  useDeepCompareEffect(() => {
    console.log({ shuffledPlaylist })
  }, [shuffledPlaylist])

  useDeepCompareEffect(() => {
    if (userData) {
      mapUserDataToPlaylist(userData, setShuffledPlaylist)
    }
  }, [userData])

  // const history = useHistory()

  // const saveAndViewResults = () => {
  //   saveNewPlaylist()
  //   history.push('/results')
  // }

  return (
    <>
      <Row>
        <Col>
          <h1>
            Random Playlist Stream
          </h1>
          <p>
            Listen to the stream to participate; feel free to re-shuffle the playlist, rate a song, replay, skip, or stop listening whenever!
          </p>
        </Col>
      </Row>
      <Row>
        <Col sm="12" md={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }}>
          <AudioPlaylist
            playlist={shuffledPlaylist}
            setPlaylist={setShuffledPlaylist}
            currentSongIndex={currentSongIndex}
            setCurrentSongIndex={setCurrentSongIndex}
            generating
          />
        </Col>
      </Row>
      <Row>
        <Col className="my-4">
          <p>You are currently listening to a traditional Fisher-Yates Shuffle Algorithm.</p>
          <p>All saved data is recorded and will affect the resulting algorithmically generated playlist in real time.</p>
          {/* TODO: make it so that it works on did unmount */}
          {/* Save Data and <button onClick={saveAndViewResults} className="link-dark">View Results</button> */}
          {/* Save Data and <Link to='/results' className="link-dark">View Results</Link> */}
        </Col>
      </Row>
    </>
  )
}