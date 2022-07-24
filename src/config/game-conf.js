import Boot from '../app/scenes/Boot.js';
import Home from '../app/scenes/Home.js';
import Gameplay from '../app/scenes/Gameplay.js';
import dimensions from './dimensions.js';

export default {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: dimensions.width,
    height: dimensions.height
  },
  scene: [Boot, Home, Gameplay]
};
