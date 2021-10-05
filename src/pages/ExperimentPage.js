import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
// import {
//   Link,
//   // useHistory
// } from 'react-router-dom'
import AudioPlaylist from '../components/AudioPlaylist'
import { useAuth } from '../utilities/AuthContext'
import { usePlaylist } from '../utilities/PlaylistContext'
import useDeepCompareEffect from 'use-deep-compare-effect'
import QR from '../components/QR'
import { Link } from 'react-router-dom'

export default function ExperimentPage() {
  const { updateUser, userData } = useAuth()
  const { mapUserDataToPlaylist, generateOrderedPlaylist, shufflePlaylist,
    // saveNewPlaylist
  } = usePlaylist()

  const [shuffledPlaylist, setShuffledPlaylist] = useState(shufflePlaylist(generateOrderedPlaylist()))

  const [currentSongIndex, setCurrentSongIndex] = useState(0)

  useEffect(() => {
    updateUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // useDeepCompareEffect(() => {
  //   // console.log({ shuffledPlaylist })
  // }, [shuffledPlaylist])

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
          <h1>Random Playlist Stream</h1>
          <p className="d-none d-md-block">
            Listen to the stream to participate; feel free to re-shuffle the playlist, rate a song, replay, skip, or stop listening whenever!
          </p>
        </Col>
      </Row>
      <Row>
        <div className='col-lg-4 col-md-6 d-none d-md-block'>
          <Row>
            <Col className='bg-light rounded-3 px-3 mx-2 py-2 mt-5 fw-bold'>
              The app requires listeners to click the save button in order to upload listening results to the database. This is to ensure that no "non-experiment" data is uploaded by accident.
            </Col>
          </Row>
          <Row>
            <Col className='bg-light rounded-3 px-3 mx-2 py-2 mt-5'>
              <h6>
                If you have headphones, feel free to interact with the installation using your personal device.
              </h6>
            </Col>
          </Row>
          <Row>
            <Col className="text-center mt-5">
              <QR />
            </Col>
          </Row>
          <Row>
            <Col className='bg-light rounded-3 px-3 mx-2 py-2 mt-5 text-center'>
              <h4>
                Don't forget to press the save button!
              </h4>
            </Col>
          </Row>
        </div>
        <div className='col-lg-4 col-md-6 col-sm-12' >
          <AudioPlaylist
            playlist={shuffledPlaylist}
            setPlaylist={setShuffledPlaylist}
            currentSongIndex={currentSongIndex}
            setCurrentSongIndex={setCurrentSongIndex}
            generating
          />
        </div>
        <div className='col-lg-4 col-md-12 d-none d-md-block'>
          <Row>
            <Col className='bg-light rounded-3 px-3 mx-2 py-2 mt-5'>
              Types of data recorded include: percent listened through, skip rate, number of times looped, likes and dislikes, song preference, playlist order preference, and when shuffled or ended.
            </Col>
          </Row>
          <Row>
            <Col className='bg-light rounded-3 px-3 mx-2 py-2 mt-5'>
              <p>This data is stored in a database and combined to generate a ranking system. Songs that have a high popularity appear higher in the <Link to='/results'>final result</Link>.</p>
              <p>All saved data that is recorded and will affect the resulting algorithmically generated playlist in real time.</p>
            </Col>
          </Row>
          <Row>
            <Col className='bg-light rounded-3 px-3 mx-2 py-2 mt-5'>
              <p>You are currently listening to a traditional Fisher-Yates Shuffle Algorithm.</p>
              <p>Learn more by visiting the <Link to='/info'>info</Link> page.</p>
            </Col>
          </Row>
        </div>
      </Row>
      <Row>
        <Col className="my-4">
          <p className="d-sm-block d-md-none">
            Listen to the stream to participate; feel free to re-shuffle the playlist, rate a song, replay, skip, or stop listening whenever!
          </p>
          {/* TODO: make it so that it works on did unmount */}
          {/* Save Data and <button onClick={saveAndViewResults} className="link-dark">View Results</button> */}
          {/* Save Data and <Link to='/results' className="link-dark">View Results</Link> */}
        </Col>
      </Row>
    </>
  )
}