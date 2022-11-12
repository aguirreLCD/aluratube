import React from "react";
import config from "../config.json";
import styled from "styled-components";
import infinity from "../public/images/infinity.png";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import { videoService } from "../services/videoService";

function HomePage() {
  // console.log(config.playlists);
  const serviceVideo = videoService();
  const [playlists, setPlaylists] = React.useState({}); // config.playlists
  const [filterValue, setFilterValue] = React.useState("");

  React.useEffect(() => {
    console.log("useEffect");
    serviceVideo.getAllVideos().then((datafromSupabase) => {
      console.log(datafromSupabase.data);
      // imutability
      const newPlaylist = {};
      datafromSupabase.data.forEach((video) => {
        if (!newPlaylist[video.playlist]) newPlaylist[video.playlist] = [];
        newPlaylist[video.playlist] = [video, ...newPlaylist[video.playlist]];
      });

      console.log("new playlist", newPlaylist);
      setPlaylists(newPlaylist);
    });
    // if data change, do this: empty array == once time run
  }, []);

  // console.log("playlists", playlists);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        {/* Prop Drilling */}
        <Menu filterValue={filterValue} setFilterValue={setFilterValue} />
        <Header />

        <Timeline searchedValue={filterValue} playlists={playlists}>
          Content
        </Timeline>
      </div>
    </>
  );
}

export default HomePage;

const StyledHeader = styled.div`
  /* background-color: ${({ theme }) => theme.backgroundLevel1}; */
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .user-info {
    /* margin-top: 50px; */
    /* margin: 0.25rem; */
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
    color: ${({ theme }) => theme.backgroundLevel3};
  }
`;

const StyledBanner = styled.div`
  background-image: url(${({ bg }) => bg});
  /* background-image: url(${config.bg}); */
  background-repeat: no-repeat;
  background-size: cover;
  height: 213px;
`;

function Header() {
  return (
    <StyledHeader>
      <StyledBanner bg={config.bg} />
      <section className="user-info">
        {/* <img src={`https://github.com/${config.github}.png`} /> */}
        <img src={infinity.src}></img>
        <div>
          <h2>{config.name}</h2>
          {/* <p>{config.job}</p> */}
        </div>
      </section>
    </StyledHeader>
  );
}

function Timeline({ searchedValue, ...props }) {
  // Important! Fundamental*
  // map, forEach, keys...
  const playlistNames = Object.keys(props.playlists);

  // console.log(props);
  // console.log(playlistNames);
  // for = loop Statement
  // React need: Return by expression (map)

  return (
    <StyledTimeline>
      {playlistNames.map((playlistName) => {
        const videos = props.playlists[playlistName];
        // console.log(playlistName);
        // console.log(videos);
        return (
          <section key={playlistName}>
            <h2>{playlistName}</h2>
            <div>
              {videos
                .filter((video) => {
                  const titleNormalized = video.title.toLowerCase();
                  const searchedValueNormalized = searchedValue.toLowerCase();
                  return titleNormalized.includes(searchedValueNormalized);
                })
                .map((video) => {
                  return (
                    <a key={video.url} href={video.url}>
                      <img src={video.thumbnail} />
                      <span>{video.title}</span>
                    </a>
                  );
                })}
            </div>
          </section>
        );
      })}
    </StyledTimeline>
  );
}
