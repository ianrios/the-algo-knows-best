import React from 'react'

export default function ResultsPage() {
    const data = [...Array(16).keys()]
    const mappedData = data.map((item, index) => {
        return (
            <tr key={index}>
                <th scope="row">{item + 1}</th>
                <td>og order</td>
                <td>listeners</td>
                <td>likes</td>
                <td>plays</td>
            </tr>
        )
    })
    return (
        <div>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">
                            <span className="d-none d-md-block">ML</span>
                            {" "}Ranking{" "}
                            <span className="d-none d-lg-block">(Popularity)</span>
                        </th>
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
        </div>
    )
}
