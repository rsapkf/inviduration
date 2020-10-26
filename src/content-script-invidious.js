// get playlist and instance id from URL
const url = window.location.href;
const params = new URLSearchParams(window.location.search);
const playlistId = params.get('list');
const instance = window.location.hostname;

// invidio.us API (doesn't work for playlists having >100 videos)
fetch(`https://${instance}/api/v1/playlists/${playlistId}`)
  .then((res) => res.json())
  .then((data) => {
    let totalSeconds = 0;
    for (video of data.videos) {
      totalSeconds += video.lengthSeconds;
    }

    const duration = secondsToHumanReadableFormat(totalSeconds);

    const node = document.querySelector('.pure-u-2-3 b');
    const textnode = document.createTextNode(`| Duration: ${duration}`);
    node.appendChild(textnode);
  });

const secondsToHumanReadableFormat = (totalSeconds) => {
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  hours < 10 ? (hours = `0${hours}`) : hours;
  minutes < 10 ? (minutes = `0${minutes}`) : minutes;
  seconds < 10 ? (seconds = `0${seconds}`) : seconds;
  return `${hours}:${minutes}:${seconds}`;
};
