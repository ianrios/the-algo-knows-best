import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import QR from '../components/QR'

export default function HomePage() {
  return (
    <Row>
      <Col>
        <h1 className="py-2">Designed for Shuffling</h1>
        <div className="row px-2">
          <div className="col-sm-12 col-md-9 bg-light rounded-2 mb-2 p-2">
            <p className="lead">
              Using streaming data, user-created listening patterns emerge from randomness based on preference, retention time, and skips, among other metrics built into modern-day shuffling algorithms such as song popularity and length.
            </p>
            <p className="lead">
              <Link to="/info" className="link-secondary">Read more...</Link>
            </p>
            <hr />
            <p className="lead">
              <Link to="/stream" className="link-primary">Listen now</Link> to contribute to the live playlist generation, or <Link to="results" className="link-secondary">view the data</Link> change in real time.
            </p>
          </div>

          {/* button group area */}
          <div className="col-sm-12 col-md-3 d-block d-sm-none mt-3">
            <div className="row">
              <div className="col d-flex justify-content-end">
                <Link to='/stream' className="btn btn-primary fw-bold" id="padded-btn">Participate Now</Link>
                <Link to='/results' className="btn btn-outline-secondary">View Results</Link>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-3 d-sm-block d-none mt-3">
            <div className="row">
              <div className="col-12 d-flex justify-content-end">
                <Link to='/stream' className="btn btn-primary fw-bold">Participate Now</Link>
              </div>
            </div>
            <div className="row">
              <div className="col-12 mt-1 d-flex justify-content-end">
                <Link to='/results' className="btn btn-outline-secondary">View Results</Link>
              </div>
            </div>
          </div>
        </div>

        <hr className="mt-4" />
        <Row className="my-5">
          <div className="col-md-7">
            <h2>Participate on your device. <span className="text-muted">Best with headphones.</span></h2>
            <p className="lead">As you generate new playlist data, you'll be able to see the resulting algorithmic playlist update in real time.</p>
          </div>
          <div className="col-md-5 text-center mt-3">
            <QR />
          </div>
        </Row>
      </Col>
    </Row>
  )
}
