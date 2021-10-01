import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Icon from '../components/Icon'

export default function InfoPage() {
  return (
    <div>
      <h1 className="mt-1">Abstract</h1>
      <p className="bg-light rounded-2 p-2">
        This short-form ambient concept album, designed for automated shuffling, allows listeners to craft new auditory experiences during each play. Here, a harmonic mixing strategy allows songs to seamlessly flow into one another regardless of order. User-created listening patterns will emerge from randomness based on preference, retention, and skips, among other metrics built into modern-day shuffling algorithms like song popularity and length.
      </p>
      <hr />
      <p>shell artist "short-ambient" artist persona concept by Ian Rios</p>
      <p>Original music Recorded and Produced by Ian Rios & J Jacobson</p>
      <p>Mixed and Mastered by Ian Rios</p>
      <p>Artwork by J Jacobson</p>
      <p>Website created by Ian Rios</p>
      <p>Research conducted by Ian Rios</p>
      <h3 className="mt-1">More Info</h3>
      <hr />
      <Row>
        <Col>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <Icon type='file-earmark-richtext' />
              {" "}
              <a href="https://docs.google.com/document/d/1tj1QeCOzNzpLD_msm5PgIIS08yObY-NYgv8jGpOjEy0/edit?usp=sharing" target="_blank" rel="noreferrer" className="stretched-link">Paper</a>
              {" "}
              (In Progress)
            </li>
            <li className="list-group-item">
              <Icon type='github' />
              {" "}
              <a href="https://github.com/ianrios/the-algo-knows-best" target="_blank" rel="noreferrer" className="stretched-link">Front End GitHub Repo</a>
            </li>
            <li className="list-group-item">
              <Icon type='github' />
              {" "}
              <a href="https://github.com/ianrios/thealgobackend" target="_blank" rel="noreferrer" className="stretched-link">Back End GitHub Repo</a>
            </li>
            <li className="list-group-item">
              <Icon type='music-note-beamed' />
              {" "}
              <a href="https://whyrecord.com/artist/shell-artist" target="_blank" rel="noreferrer" className="stretched-link">
                Listen More
              </a>
            </li>
          </ul>
        </Col>
      </Row>
      <h3 className="mt-1">Connect</h3>
      <Row>
        <Col>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <Icon type='linkedin' />
              {" "}
              <a href="https://www.linkedin.com/in/ian-rios/" target="_blank" rel="noreferrer" className="stretched-link">LinkedIn</a>
            </li>
            <li className="list-group-item">
              <Icon type='github' />
              {" "}
              <a href="https://github.com/ianrios" target="_blank" rel="noreferrer" className="stretched-link">GitHub</a>
            </li>
            <li className="list-group-item">
              <Icon type='twitter' />
              {" "}
              <a href="https://twitter.com/ian_rios_" target="_blank" rel="noreferrer" className="stretched-link">
                Twitter
              </a>
            </li>
            <li className="list-group-item">
              <Icon type='instagram' />
              {" "}
              <a href="https://www.instagram.com/whyrecordcompany/" target="_blank" rel="noreferrer" className="stretched-link">
                WRC Instagram
              </a>
            </li>
            <li className="list-group-item">
              <Icon type='instagram' />
              {" "}
              <a href="https://www.instagram.com/akrilix.art/" target="_blank" rel="noreferrer" className="stretched-link">
                Akrilix Art
              </a>
            </li>
            <li className="list-group-item">
              <Icon type='journal-code' />
              {" "}
              <a href="https://ianrios.github.io/" target="_blank" rel="noreferrer" className="stretched-link">
                Portfolio
              </a>
            </li>
            <li className="list-group-item">
              <Icon type='question' />
              {" "}
              <a href="https://whyrecord.com/" target="_blank" rel="noreferrer" className="stretched-link">
                music
              </a>
            </li>
            <li className="list-group-item">
              <Icon type='at' />
              {" "}
              <a href="mailto: ian.rios1a@gmail.com" target="_blank" rel="noreferrer" className="stretched-link">
                ian.rios1a@gmail.com
              </a>
            </li>
          </ul>
        </Col>
      </Row>
    </div>
  )
}
