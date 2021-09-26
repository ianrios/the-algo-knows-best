import React from 'react'
import { Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AudioPlaylist from '../components/AudioPlaylist'

export default function ResultsPage() {
	const data = [...Array(16).keys()]
	const mappedData = data.map((item, index) => {
		return (
			<tr key={index} className={index === 2 && "table-primary"}>
				<th scope="row">{item + 1}</th>
				{/* <td>
					<div className="spinner-grow" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
				</td> */}
				<td>og order</td>
				<td>listeners</td>
				<td>likes</td>
				<td>plays</td>
			</tr>
		)
	})
	return (
		<>
			<Row>
				<Col>
					<h1>Algorithmically Generated Playlist</h1>
					<p>Listen to the resulting pseudo-randomized playlist based on user preference and retention - updated as data is recorded.</p>
				</Col>
			</Row>
			<Row>
				<Col>
					<AudioPlaylist />
				</Col>
			</Row>
			<hr />
			<Row>
				<Col>
					<h2>Statistics</h2>
					<p>View the data collected from the experiment that is used to generate to the current playlist. <Link className="link-dark" to="/stream">Participate now</Link> to change the data in real time.</p>
					<table className="table table-striped">
						<thead>
							<tr>
								<th scope="col">
									<span className="d-none d-md-block">ML</span>
									{" "}Ranking{" "}
									<span className="d-none d-lg-block">(Popularity)</span>
								</th>
								{/* <th scope="col">Playing Now</th> */}
								<th scope="col">
									<span className="d-none d-lg-block">Original</span>
									<span className="d-md-none d-sm-block">Order</span>
									<span className="d-none d-md-block">Tracklist</span>
								</th>
								<th scope="col">
									<OverlayTrigger
										placement="top"
										overlay={
											<Tooltip id={`tooltip-top`}>
												Determined by unique browsers used by individual devices.
											</Tooltip>
										}
									>
										<span>Listeners</span>
									</OverlayTrigger>
								</th>
								<th scope="col">Likes</th>
								<th scope="col">
									<OverlayTrigger
										placement="top"
										overlay={
											<Tooltip id={`tooltip-top`}>
												A "play" is counted when a song is listened to for over 30 seconds.
											</Tooltip>
										}
									>
										<span>Plays</span>
									</OverlayTrigger>
								</th>
							</tr>
						</thead>
						<tbody>
							{mappedData}
						</tbody>
					</table>
				</Col>
			</Row>
		</>
	)
}
