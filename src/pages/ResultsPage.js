import React from 'react'

export default function ResultsPage() {
    const data = [...Array(16).keys()]
    const mappedData = data.map((item, index) => {
        return (
            <tr key={index}>
                <th scope="row">{item + 1}</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
            </tr>
        )
    })
    return (
        <div>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">ML Ranking</th>
                        <th scope="col">Tracklist</th>
                        <th scope="col">Popularity</th>
                        <th scope="col">Plays</th>
                    </tr>
                </thead>
                <tbody>
                    {mappedData}
                </tbody>
            </table>
        </div>
    )
}
