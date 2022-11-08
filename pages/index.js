import config from "../config.json";

import styled from "styled-components";

import { StyledTimeline } from "../src/components/Timeline";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";

function HomePage() {
  // const stylesHome = { backgroundColor: "gray" };

  // console.log(config.playlists);

  return (
    <>
      <CSSReset />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          // backgroundColor: "gray",
        }}
      >
        <Menu />
        <Header />
        <Timeline playlists={config.playlists}>Content</Timeline>
      </div>
    </>
  );
}

export default HomePage;

// function Menu() {
//   return (
//       <div>Menu</div>
//   );
// }

const StyledHeader = styled.div`
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .user-info {
    margin-top: 50px;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
    color: #ba181b;
  }
`;

function Header() {
  return (
    <StyledHeader>
      <section className="user-info">
        <img src={`https://github.com/${config.github}.png`} />
        <div>
          <h2>{config.name}</h2>
          <p>{config.job}</p>
        </div>
      </section>
    </StyledHeader>
  );
}

function Timeline(props) {
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
        console.log(playlistName);
        console.log(videos);
        return (
          <section key={playlistName}>
            <h2>{playlistName}</h2>
            <div>
              {videos.map((video) => {
                return (
                  <a key={video.url} href={video.url}>
                    <img src={video.thumb} />
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
