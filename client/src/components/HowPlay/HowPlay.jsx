// import { useEffect, useState } from "react";
import './how_play_style.scss';

function HowPlay() {
  return (
    <div className="gameInstructions">
      <h1>How To Play Compnent</h1>

      <h3>Content:</h3>
      <p>
        Each presented code block is fully functional JavaScript and will give you insight of real
        world examples of working code.
      </p>
      <h3>Challenge:</h3>
      <p>
        After reviewing the code block and tapping on “Go” you have 60 seconds to fill in as many of
        the fading syntax spaces as possible. The answers will fade within 5 seconds since the start
        of the game. The faster you fill out the code block the better your score!
      </p>
      <h3>Points:</h3>
      <p>Every entry that is perfect awards the player an automatic 10 points</p>
      <p>For every second spared the player is awared an additional point</p>

      <p>For every incorrect answer the player uses an automatic 3 points</p>
      <p>Get to your highest score and find your place in the scoreboard!</p>
    </div>
  );
}

export default HowPlay;
