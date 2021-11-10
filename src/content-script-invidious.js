// get playlist and instance id from URL
const url = window.location.href;
const params = new URLSearchParams(window.location.search);
const playlistId = params.get('list');
const instance = window.location.hostname;

// Invidio.us API (doesn't work for playlists having >100 videos)
fetch(`https://${instance}/api/v1/playlists/${playlistId}`)
  .then((res) => res.json())
  .then((data) => {
    let totalSeconds = 0;
    for (video of data.videos) {
      totalSeconds += video.lengthSeconds;
    }

    const duration = secToHHMMSS(totalSeconds);

    const node = document.querySelector('.pure-u-2-3 b');
    const textnode = document.createTextNode(`| Duration: ${duration}`);
    node.appendChild(textnode);
  });

const secToHHMMSS = (sec) => {
  let hours = Math.floor(sec / 3600);
  sec %= 3600;
  let minutes = Math.floor(sec / 60);
  let seconds = sec % 60;

  const justify = (num) => (num < 10 ? `0${num}` : num);

  return `${justify(hours)}:${justify(minutes)}:${justify(seconds)}`;
};
