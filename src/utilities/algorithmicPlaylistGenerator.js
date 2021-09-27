export const generateOrderedPlaylist = () => [...Array(16).keys()].map(item => {
    const name = item + 1
    return (
        {
            id: name, //created on backend, generated for front end using index
            // order: to be created based on final resulting index in array
            // playlist_id: to be created on backend,
            placement_liked: 0, // 0 neutral, 1 positive, -1 negative
            num_plays: 0.0, // percent listened based on skips, pauses, loops, or restarts
            track: {
                id: name,
                file_name: `./audio/T00${name > 9 ? name : "0" + name}.wav`
            }
        }
    )
})

export const generateAlgorithmicPlaylist = (allPlaylistData, setResult) => {
    // TODO: look at playlist data and rank items based on popularity, retention time, order, listeners, and more
    // TODO: if playlist updates, dont reset the current song until after it finishes if the current song changes too
    let output = []

    output = generateOrderedPlaylist()
    console.log("output:", output)
    console.log("allPlaylistData:", allPlaylistData)


    for (const playlist of allPlaylistData) {
        for (const playlistTrack of playlist.playlist_tracks) {
            let index = playlistTrack.track_id - 1
            console.log("updating play count")
            output[index].num_plays += playlistTrack.num_plays

            // playlistTrack.order
            // playlistTrack.preference
        }
    }


    // temporarily use original order for data viewing

    setResult(prev => output)


}