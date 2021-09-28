import React, { useState } from 'react'
import { Row, Col, OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AudioPlaylist from '../components/AudioPlaylist'
import { usePlaylist } from '../utilities/PlaylistContext'
import { generateAlgorithmicPlaylist } from '../utilities/algorithmicPlaylistGenerator'
import useDeepCompareEffect from 'use-deep-compare-effect'

export default function ResultsPage() {
	const { allPlaylistData } = usePlaylist()

	const [currentSongIndex, setCurrentSongIndex] = useState(0)

	const [algorithmicPlaylist, setAlgorithmicPlaylist] = useState([])

	useDeepCompareEffect(() => {
		// TODO: if playlist updates, dont reset the current song until after it finishes if the current song changes too
		generateAlgorithmicPlaylist(allPlaylistData, setAlgorithmicPlaylist)
	}, [allPlaylistData])

	// TODO: map the rest of these table items
	// TODO: use css to show table rows swapping with a smooth transition
	const mappedData = algorithmicPlaylist.map((item, index) => {
		return (
			<tr key={index} className={`${index === currentSongIndex ? "table-primary" : ""}`}>
				<th scope="row">{item.id}</th>
				<td>{item.track.id}</td>
				<td>{item.listeners}</td>
				<td>likes</td>
				<td>{item.num_plays}</td>
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
					<AudioPlaylist
						algorithmicPlaylist={algorithmicPlaylist}
						currentSongIndex={currentSongIndex}
						setCurrentSongIndex={setCurrentSongIndex}
					/>
				</Col>
			</Row>
			<hr />
			<Row>
				<Col>
					<h2>Statistics</h2>
					<p>View the data collected from the experiment that is used to generate to the current playlist. <Link className="link-dark" to="/stream">Participate now</Link> to change the data in real time.</p>
					{algorithmicPlaylist.length ? (

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
					) : (
						<Row>
							<Col className='d-flex justify-content-center'>
								<Spinner animation="grow" />
							</Col>
						</Row>
					)}
				</Col>
			</Row>
		</>
	)
}
