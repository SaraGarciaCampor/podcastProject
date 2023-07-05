
// eslint-disable-next-line import/prefer-default-export
export const itunesService = {
  // eslint-disable-next-line no-use-before-define
  GetPodcasts,
  // eslint-disable-next-line no-use-before-define
  GetPodcast,
  // eslint-disable-next-line no-use-before-define
  GetEpisodes,
};

async function GetPodcasts(setPodcasts) {
  const url = new URL('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json');
  const currentDate = new Date();

  try {
    const lastCallDate = localStorage.getItem('lastCallDate');
    const lastResponse = localStorage.getItem('lastResponse');

    if (lastCallDate && lastResponse) {
      const twentyFourHours = 24 * 60 * 60 * 1000;
      const timeDiff = currentDate - new Date(lastCallDate);

      if (timeDiff < twentyFourHours) {
        setPodcasts(JSON.parse(lastResponse));
        return;
      }
    }

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    localStorage.setItem('lastCallDate', currentDate);
    localStorage.setItem('lastResponse', JSON.stringify(data));

    setPodcasts(data);
  } catch (error) {
    console.error(error);
  }
}

async function GetPodcast(setPodcast, id) {
  const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';
  const itunesUrl = `https://itunes.apple.com/lookup?id=${id}`;
  const currentDate = new Date();

  try {
    const lastCallDate = localStorage.getItem('lastCallDate');
    const lastResponse = localStorage.getItem(`podcast-${id}`);

    if (lastCallDate && lastResponse) {
      const twentyFourHours = 24 * 60 * 60 * 1000;
      const timeDiff = currentDate - new Date(lastCallDate);

      if (timeDiff < twentyFourHours) {
        setPodcast(JSON.parse(lastResponse));
        return;
      }
    }

    const response = await fetch(corsAnywhereUrl + itunesUrl);

    if (!response.ok) {
      throw new Error('Failed to fetch podcast data');
    }

    const data = await response.json();
    console.log(data);

    localStorage.setItem('lastCallDate', currentDate);
    localStorage.setItem(`podcast-${id}`, JSON.stringify(data));

    setPodcast(data);
  } catch (error) {
    console.error(error);
  }
}

async function GetEpisodes(setEpisodes, id) {
  const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';
  const itunesUrl = `https://itunes.apple.com/lookup?id=${id}&country=US&media=podcast&entity=podcastEpisode&limit=100`;

  try {
    const response = await fetch(corsAnywhereUrl + itunesUrl);

    if (!response.ok) {
      throw new Error('Failed to fetch podcast episodes data');
    }

    const data = await response.json();
    setEpisodes(data);
  } catch (error) {
    console.error(error);
  }
}
