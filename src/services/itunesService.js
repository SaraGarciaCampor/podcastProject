import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const itunesService = {
  // eslint-disable-next-line no-use-before-define
  GetPodcasts,
  // eslint-disable-next-line no-use-before-define
  GetPodcast,
};

async function GetPodcasts(setPodcasts) {
  const url = new URL('https://itunes.apple.com/us/rss/toppodcasts/limit=10/genre=1310/json');
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    setPodcasts(data);
  } catch (error) {
    console.error(error);
  }
}


async function GetPodcast(setPodcast, id) {
  const config = {
    headers: {
      Authorization: sessionStorage.getItem('access_token'),
      'Content-Type': 'application/json',
    },
  };
  const uri = ` https://itunes.apple.com/lookup?id=${id}`;

  await axios
    .get(uri, config)
    .then((response) => {
      setPodcast(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
