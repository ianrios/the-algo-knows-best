import React from 'react'
import { Row, Col } from 'react-bootstrap'
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
					<h1>
						Algorithmically Generated Playlist
					</h1>
					<p>
						Listen to the resulting pseudo-randomized playlist based on user preference and retention - updated as data is recorded.
					</p>
				</Col>
			</Row>
			<Row>
				<Col>
					<AudioPlaylist result />
				</Col>
			</Row>
			<Row>
				<Col>
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
								<th scope="col">Listeners</th>
								<th scope="col">Likes</th>
								<th scope="col">Plays</th>
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
