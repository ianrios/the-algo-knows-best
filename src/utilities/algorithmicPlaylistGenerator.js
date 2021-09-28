export const generateOrderedPlaylist = () => [
    39778,
    42872,
    39111,
    33153,
    34305,
    40556,
    39559,
    42451,
    37662,
    45667,
    44555,
    48004,
    45163,
    45695,
    43243,
    50109
].map((songLength, index) => {
    const id = index + 1
    return (
        {
            id: id, //created on backend, generated for front end using index
            // order: to be created based on final resulting index in array
            // playlist_id: to be created on backend,
            listeners: 0, //
            placement_liked: 0, // 0 neutral, 1 positive, -1 negative
            num_plays: 0.0, // percent listened based on skips, pauses, loops, or restarts
            track: {
                id: id,
                song_length: songLength,
                file_name: `./audio/T00${id > 9 ? id : "0" + id}.wav`
            }
        }
    )
})

export const generateAlgorithmicPlaylist = (allPlaylistData, setResult) => {
    // TODO: look at playlist data and rank items based on popularity, retention time, order, listeners, and more
    let output = []

    output = generateOrderedPlaylist()
    // console.log("output:", output)
    // console.log("allPlaylistData:", allPlaylistData)

    let uniqueUserPlays = {}

    for (const playlist of allPlaylistData) {
        for (const playlistTrack of playlist.playlist_tracks) {
            let index = playlistTrack.track_id - 1
            // console.log("updating for final order:", playlistTrack)
            output[index].num_plays += playlistTrack.num_plays

            if (playlistTrack.num_plays > 0) {
                // user_id:track_id
                let key = `${playlist.user_id}:${playlistTrack.track_id}`
                if (!uniqueUserPlays[key]) {
                    uniqueUserPlays[key] = 1
                }
            }

            // playlistTrack.order
            // playlistTrack.preference
        }
    }
    for (const key in uniqueUserPlays) {
        // let [user_id, track_id] = key.split(':')
        output[key.split(':')[1] - 1].listeners++
    }

    // temporarily use original order for data viewing
    // setResult(prev => generateOrderedPlaylist())

    setResult(prev => {
        if (allPlaylistData.length) {
            return output
        }
        return prev
    })
}