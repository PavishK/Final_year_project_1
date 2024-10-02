import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import LoginLottie from '../images/Login_animation.json'; 

function LottieAnimation() {
  return (
    <Player
      autoplay
      loop
      src={LoginLottie}
      style={{ height: '250px', width: '250px' }}
    />
  );
}

export default LottieAnimation;
