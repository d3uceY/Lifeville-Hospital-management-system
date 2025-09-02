import { Howl } from "howler";

let currentSound = null;

export function playSound({ soundSrc, soundOn }) {
  if (!soundOn) return;

  // Stop previous sound
  if (currentSound) {
    currentSound.stop();
  }

  // Create and play new sound
  currentSound = new Howl({
    src: [soundSrc],
    volume: 1,
  });

  currentSound.play();
}
