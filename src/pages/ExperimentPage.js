import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AudioPlaylist from '../components/AudioPlaylist'

export default function ExperimentPage() {

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
          <AudioPlaylist generating />
        </Col>
      </Row>
      <Row>
        <Col className="my-4">
          <p>You are currently listening to a traditional Fisher-Yates Shuffle Algorithm.</p>
          <p>All data is recorded and will affect the resulting algorithmically generated playlist in real time.</p>
          <Link to='/results' className="link-dark">View Results</Link>
        </Col>
      </Row>
    </>
  )
}