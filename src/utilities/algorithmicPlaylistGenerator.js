let songLengths = [
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
]

export const generateOrderedPlaylist = () => songLengths.map((songLength, index) => {
    const id = index + 1
    return (
        {
            id: id, //created on backend, generated for front end using index
            rank: id,
            rating: 0,
            // order: to be created based on final resulting index in array
            // playlist_id: to be created on backend,
            listener_count: 0, //
            placement_liked: 0, // 0 neutral, 1 positive, -1 negative
            play_count: 0.0, // percent listened based on skips, pauses, loops, or restarts
            track: {
                id: id,
                liked: "neutral", // initialize all songs as a neutral like unless otherwise changes
                song_length: songLength,
                file_name: `T00${id > 9 ? id : "0" + id}.wav`
            }
        }
    )
})
