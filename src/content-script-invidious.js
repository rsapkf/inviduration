// get playlist id from URL
let url = window.location.href;
let playlistId = url.replace('https://invidio.us/playlist?list=', '');

// invidio.us API (doesn't work for playlists having >100 videos)
fetch(`https://invidio.us/api/v1/playlists/${playlistId}`)
  .then((res) => res.json())
  .then((data) => {
    totalSeconds = 0;
    for (video of data.videos) {
      totalSeconds += video.lengthSeconds;
    }

    let duration = secondsToHumanReadableFormat(totalSeconds);

    let node = document.querySelector('.pure-u-2-3 b');
    let textnode = document.createTextNode(`| Duration: ${duration}`);
    node.appendChild(textnode);
  });

const secondsToHumanReadableFormat = (totalSeconds) => {
  hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  minutes = Math.floor(totalSeconds / 60);
  seconds = totalSeconds % 60;

  hours < 10 ? (hours = `0${hours}`) : hours;
  minutes < 10 ? (minutes = `0${minutes}`) : minutes;
  seconds < 10 ? (seconds = `0${seconds}`) : seconds;
  return `${hours}:${minutes}:${seconds}`;
};
