import React from 'react';

const AudioPlayer = ({ src }) => {
  return (
    <audio controls>
      <source src={src} type="audio/mp3" />
      Tu navegador no admite el elemento de audio.
    </audio>
  );
};

export default AudioPlayer;
