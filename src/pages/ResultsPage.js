import React, { useState } from 'react'
import {
	Row, Col, OverlayTrigger, Tooltip, Spinner,
	//  ProgressBar 
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AudioPlaylist from '../components/AudioPlaylist'
import Icon from '../components/Icon'
import { usePlaylist } from '../utilities/PlaylistContext'
// import { useAuth } from '../utilities/AuthContext'

export default function ResultsPage() {
	const { finalPlaylistResult } = usePlaylist()

	const [currentSongIndex, setCurrentSongIndex] = useState(0)

	// TODO: if playlist updates, dont reset the current song until after it finishes if the current song changes too
	// TODO: use css to show table rows swapping with a smooth transition
	let totalPlayTime = 0
	let totalInteractions = 0
	const startDate = (finalPlaylistResult.length > 0 && finalPlaylistResult[0].created_at) ? finalPlaylistResult[0].created_at.split('T')[0] : 0
	const mappedData = finalPlaylistResult
		.sort((a, b) => a.rank - b.rank)
		.map((item, index) => {
			let currentTimeListened = parseFloat(item.play_count.toFixed(1))
			totalPlayTime += currentTimeListened
			totalInteractions += parseInt(item.interactions)
			return (
				<tr key={index} className={`${index === currentSongIndex ? "table-primary" : ""}`}>
					<th scope="row">{item.rank}</th>
					<td>{item.id}</td>
					<td>{item.listener_count}</td>
					<td>
						{/* <ProgressBar now={item.rating} /> */}
						{/* out of 100 */}
						{item.rating}
					</td>
					<td>{item.interactions}</td>

					{/* TODO: use a progress bar to show rating */}
					<td>{currentTimeListened}</td>
				</tr>
			)
		})
	return (
		<>
			<Row>
				<Col>
					<h1>Algorithmically Generated Playlist</h1>
					<p className=''>Listen to the resulting pseudo-randomized playlist based on user preference and retention - updated as data is recorded.</p>
				</Col>
			</Row>
			<Row>
				<Col>
					<AudioPlaylist
						playlist={finalPlaylistResult}
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
					{finalPlaylistResult.length ? (

						<table className="table table-striped table-hover">
							<caption>Listener data since {startDate}</caption>
							<thead>
								<tr>
									<th scope="col">
										<OverlayTrigger
											placement="top"
											overlay={
												<Tooltip id={`tooltip-top`}>
													Looks at all track information present on this table, as well as playlist specific information such as percent listened, playlist preference ranking, retention time, and more. Visit <Link to="/info">Info</Link> to learn more
												</Tooltip>
											}
										>
											<span>
												{/* <span className="d-none d-md-block w-25">ML{" "}</span> */}
												<Icon type='arrow-down-up' />
												<span className="d-none d-sm-block d-md-none">Rank</span>
												<span className="d-none d-md-block">Ranking</span>
												<span className="d-none d-lg-block w-50"><Link to='/info'>Learn More</Link></span>
											</span>
										</OverlayTrigger>
									</th>
									{/* <th scope="col">Playing Now</th> */}
									<th scope="col">
										<Icon type='music-note-list' />
										<span className="d-none d-lg-block">Original</span>
										<span className="d-none d-md-none d-sm-block">Order</span>
										<span className="d-none d-md-block">Tracklist</span>
										<span className="d-none d-xl-block">Placement</span>
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
											<span>
												<Icon type='people' />
												<span className="d-none d-md-block w-25">Unique</span>
												<span className="d-none d-sm-block">Listeners</span>
											</span>
										</OverlayTrigger>
									</th>
									<th scope="col">
										<OverlayTrigger
											placement="top"
											overlay={
												<Tooltip id={`tooltip-top`}>
													Aggregate Like to Dislike Ratio (a like is +1, a dislike is -1, no preference is 0)
												</Tooltip>
											}
										>
											<span>
												<Icon type='heart-half' />
												<span className="d-none d-sm-block">Rating</span>
												{/* <span className="d-none d-lg-block w-25">{" "}(Popularity)</span> */}
											</span>
										</OverlayTrigger>
									</th>
									<th scope="col">
										<span>
											<Icon type='hand-index-thumb' />
											<span className="d-none d-sm-block">Interactions</span>
										</span>
									</th>
									<th scope="col">
										<OverlayTrigger
											placement="top"
											overlay={
												<Tooltip id={`tooltip-top`}>
													A "play" is counted in 1/10ths during streaming (this accounts for people who only listen halfway, or skip after listening to a few seconds)
												</Tooltip>
											}
										>
											<span>
												<Icon type='hourglass-split' />
												{/* <Icon type='clock-history' /> */}
												<span className="d-none d-sm-block">Plays</span>
											</span>
										</OverlayTrigger>
									</th>
								</tr>
							</thead>
							<tbody>
								{mappedData}
							</tbody>
							<tfoot>
								<tr>
									<th>
										#
									</th>
									<th>
									</th>
									<th>
									</th>
									<th>
									</th>
									<th>
										{totalInteractions}
									</th>
									<th>
										{totalPlayTime}
									</th>
								</tr>
							</tfoot>
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
