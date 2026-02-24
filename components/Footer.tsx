import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import useGame from "../hooks/useGame";
import _ from "lodash";

export default function Footer() {
  const {
    isStarted,
    rounds,
    pipe: { distance },
    restartGame,
    bird,
  } = useGame();
  const hasWonRef = useRef(false);
  const hasLostRef = useRef(false);
  const animation = isStarted
    ? {
        animate: {
          backgroundPosition: ["0", "-50px"],
        },
        transition: {
          repeat: Infinity,
          duration: 0.5,
          repeatType: "loop" as "loop",
          ease: "linear",
        },
      }
    : {};
  const score = _.last(rounds)?.score || 0;
  const best = _.maxBy(rounds, "score")?.score || 0;
  const speed = distance / 10;
  useEffect(() => {
    if (!isStarted || speed <= 100) {
      hasWonRef.current = false;
      return;
    }
    if (!hasWonRef.current) {
      hasWonRef.current = true;
      const confirmed = window.confirm("你赢了！点击确定重新开始游戏。\nYou win! Click OK to restart the game.");
      if (confirmed) {
        restartGame();
      }
    }
  }, [isStarted, speed, restartGame]);
  useEffect(() => {
    if (isStarted || bird.isFlying) {
      hasLostRef.current = false;
      return;
    }
    if (!hasLostRef.current) {
      hasLostRef.current = true;
      const confirmed = window.confirm(
        score == 0? "Oops! \n Click OK to restart the game.":`Congrats! Your score is ${score+1}. You make it to ${score>0?1992+score:0}! \n Click OK to restart the game.`
      );
      if (confirmed) {
        restartGame();
      }
    }
  }, [isStarted, bird.isFlying, restartGame]);
  return (
    <footer className="w-full h-28  bg-[#ded895] relative rounded-b-lg">
      <div className="bg-green-500 border-y-4 relative border-green-600 h-10">
        <motion.div
          style={{
            backgroundImage: `linear-gradient(
              -45deg,
              rgba(255, 255, 255, 0.2) 25%,
              transparent 25%,
              transparent 50%,
              rgba(255, 255, 255, 0.2) 50%,
              rgba(255, 255, 255, 0.2) 75%,
              transparent 75%,
              transparent
            )`,
            backgroundSize: "50px 50px",
          }}
          className="absolute w-full h-full"
          {...animation}
        ></motion.div>
      </div>
      <div className="flex p-2 uppercase font-mono font-semibold items-center justify-around h-[calc(100%-2.5rem)] text-xl text-green-900 flex-wrap">
        {/* <div>Best: {best}</div> */}
        <div style={{ zoom: 1.3 }}>Goal: from 1991 to 2026 </div>
        <div className="text-center text-lg">
          Current: {score>0?1992+score:0} Speed: {speed.toFixed(1)}
        </div>
      </div>
    </footer>
  );
}
