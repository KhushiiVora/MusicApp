import React, { useState, useMemo } from "react";
import "./App.css";

const initialSongs = [
  {
    id: 1,
    title: "Bohemian Rhapsody",
    artist: "Queen",
    album: "A Night at the Opera",
  },
  {
    id: 2,
    title: "Hotel California",
    artist: "Eagles",
    album: "Hotel California",
  },
  {
    id: 3,
    title: "Stairway to Heaven",
    artist: "Led Zeppelin",
    album: "Led Zeppelin IV",
  },
  { id: 4, title: "Imagine", artist: "John Lennon", album: "Imagine" },
  {
    id: 5,
    title: "Hey Jude",
    artist: "The Beatles",
    album: "The Beatles 1967-1970",
  },
];

function App({ role = "user" }) {
  const [songs, setSongs] = useState(initialSongs);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [groupBy, setGroupBy] = useState("none");
  const [newSong, setNewSong] = useState({ title: "", artist: "", album: "" });

  const filteredAndSortedSongs = useMemo(() => {
    let result = songs.filter(
      (song) =>
        song.title.toLowerCase().includes(filter.toLowerCase()) ||
        song.artist.toLowerCase().includes(filter.toLowerCase()) ||
        song.album.toLowerCase().includes(filter.toLowerCase())
    );

    result = result.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));

    if (groupBy !== "none") {
      const grouped = result.reduce((acc, song) => {
        const key = song[groupBy];
        if (!acc[key]) acc[key] = [];
        acc[key].push(song);
        return acc;
      }, {});
      return grouped;
    }

    return result;
  }, [songs, filter, sortBy, groupBy]);

  const addSong = () => {
    if (newSong.title && newSong.artist && newSong.album) {
      setSongs([...songs, { ...newSong, id: Date.now() }]);
      setNewSong({ title: "", artist: "", album: "" });
    }
  };

  const deleteSong = (id) => {
    setSongs(songs.filter((song) => song.id !== id));
  };

  const renderSongs = (songsToRender) => {
    return songsToRender.map((song) => (
      <div key={song.id} className="song-item">
        <div className="song-info">
          <h3>{song.title}</h3>
          <p>Artist: {song.artist}</p>
          <p>Album: {song.album}</p>
        </div>
        {role === "admin" && (
          <button onClick={() => deleteSong(song.id)} className="delete-btn">
            Delete
          </button>
        )}
      </div>
    ));
  };

  return (
    <div className="music-library">
      <h1>Music Library</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Filter songs..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-input"
        />

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="title">Sort by Title</option>
          <option value="artist">Sort by Artist</option>
          <option value="album">Sort by Album</option>
        </select>

        <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
          <option value="none">No Grouping</option>
          <option value="artist">Group by Artist</option>
          <option value="album">Group by Album</option>
        </select>
      </div>

      {role === "admin" && (
        <div className="add-song">
          <h3>Add New Song</h3>
          <input
            type="text"
            placeholder="Title"
            value={newSong.title}
            onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Artist"
            value={newSong.artist}
            onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
          />
          <input
            type="text"
            placeholder="Album"
            value={newSong.album}
            onChange={(e) => setNewSong({ ...newSong, album: e.target.value })}
          />
          <button onClick={addSong}>Add Song</button>
        </div>
      )}

      <div className="songs-list">
        {groupBy === "none"
          ? renderSongs(filteredAndSortedSongs)
          : Object.entries(filteredAndSortedSongs).map(
              ([group, songsInGroup]) => (
                <div key={group} className="group">
                  <h2>{group}</h2>
                  {renderSongs(songsInGroup)}
                </div>
              )
            )}
      </div>
    </div>
  );
}

export default App;
