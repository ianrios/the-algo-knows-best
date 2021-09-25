import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className='row'>
      <div className='col'>
        <h1>Designed for Shuffling</h1>
        <div clasName="row px-2">
          <div className="col-sm-12 col-md-8">
            <p className="lead">
              A short-form ambient concept album, designed for automated shuffling, allows listeners to craft new auditory experiences during each play.
            </p>
            <p className="lead">
              Using machine learning, user-created listening patterns emerge from randomness based on preference, retention time, and skips, among other metrics built into modern-day shuffling algorithms such as song popularity and length.
            </p>
          </div>
          <div className="col-sm-12 col-md-4">
            <p className="lead">
              <div clasName="row">
                <div className="col-12 d-flex justify-content-end">
                  <Link to='/stream' className="btn btn-primary fw-bold">Participate Now</Link>
                </div>
              </div>
              <div clasName="row">
                <div className="col-12 mt-1 d-flex justify-content-end">
                  <Link to='/results' className="btn btn-outline-secondary">View Results</Link>
                </div>
              </div>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
