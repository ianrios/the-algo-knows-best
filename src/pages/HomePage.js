import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className='row'>
      <div className='col'>
        <h1 className="py-2">Designed for Shuffling</h1>
        <div className="row px-2">
          <div className="col-sm-12 col-md-9 bg-light rounded-2 mb-2">
            <p className="lead">
              A short-form ambient concept album, designed for automated shuffling, allows listeners to craft new auditory experiences during each play.
            </p>
            <p className="lead">
              Using machine learning, user-created listening patterns emerge from randomness based on preference, retention time, and skips, among other metrics built into modern-day shuffling algorithms such as song popularity and length.
            </p>
            <p className="lead">
              <Link to="/info" className="link-secondary">Read more...</Link>
            </p>
            <hr />
            <p className="lead">
              <Link to="/stream" className="link-primary">Listen now</Link> to contribute to the live playlist generation, or <Link to="results" className="link-secondary">view the data</Link> change in real time.
            </p>
          </div>


          <div className="col-sm-12 col-md-3 d-block d-sm-none mt-auto">
            <div className="row">
              <div className="col d-flex justify-content-end">
                <Link to='/stream' className="btn btn-primary fw-bold" id="padded-btn">Participate Now</Link>
                <Link to='/results' className="btn btn-outline-secondary">View Results</Link>
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-md-3 d-sm-block d-none mt-auto">
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
      </div>
    </div>
  )
}
