import React from 'react'
import AudioPlaylist from '../components/AudioPlaylist'

export default function ExperimentPage() {

    return (
        <div>
            <AudioPlaylist />
            {/* <figure>
                <figcaption>Listen to the Audio</figcaption>
                <audio controls preload="auto">

                    <source src="./audio/T0001.wav" type="audio/wav" />
                    <source src="./audio/T0002.wav" type="audio/wav" />

                    Your browser does not support the
                    <code>audio</code> element.
                </audio>
            </figure> */}
        </div>
    )
}