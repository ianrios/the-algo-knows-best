import React from 'react'

export default function Footer() {
    return (
        <footer className="footer mt-auto py-3 bg-light">
            <div className="container d-flex justify-content-between">
                <span className="d-flex">
                    <span className="d-none d-md-block pe-1">Site created using react - </span><a href="https://github.com/ianrios/the-algo-knows-best" target="_blank" rel="noreferrer" className="text-muted">GitHub</a>
                </span>
                <span className="float-right">
                    <a href="https://whyrecord.com/release/shell-artist-x-quantopix" target="_blank" rel="noreferrer" className="text-muted text-decoration-none">© Ian Rios 2021</a>
                </span>
            </div>
        </footer>
    )
}
