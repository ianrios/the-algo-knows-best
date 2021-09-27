export const generateOrderedPlaylist = () => [...Array(16).keys()].map((item, index) => {
    const name = item + 1
    return (
        {
            id: index, //created on backend, generated for front end using index
            // order: to be created based on final resulting index in array
            // playlist_id: to be created on backend,
            placement_liked: 0, // 0 neutral, 1 positive, -1 negative
            num_plays: 0.0, // percent listened based on skips, pauses, loops, or restarts
            track: {
                id: index,
                file_name: `./audio/T00${name > 9 ? name : "0" + name}.wav`
            }
        }
    )
})

export const generateAlgorithmicPlaylist = (playlistData, setResult) => {
    // look at playlist data and rank items based on popularity, retention time, order, listeners, and more

    let arr = []

    // temporarily use original order for data viewing
    arr = generateOrderedPlaylist()

    setResult(prev => arr)


}