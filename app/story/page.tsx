
// "use client";

// import ArrowButton from "../components/arrowbutton/ArrowButton";
// import Styles from "@/app/styles/escapeRoom.module.css";
// import { useRouter } from "next/navigation";
// import { useTimerContext } from "../context/TimerContext";

// export default function StoryPage() {
//   const router = useRouter();
//   const { secondsLeft } = useTimerContext();

//   const handleNext = () => {
//     router.push("./map");
//   };

//   const minutes = Math.floor(secondsLeft / 60);
//   const seconds = secondsLeft % 60;

//   return (
//     <div className="storyPart">
//       <div className="game-content">
//         <div className={Styles.container}>
//           <div className={Styles.storyBox}>
//             <h2 className={Styles.title}>STORY</h2>
//             <hr className={Styles.line} />
//             <div
//               className={`${Styles.timer} ${secondsLeft <= 10 ? Styles.danger : ""
//                 }`}
//             >
//               ⏳ {minutes}:{seconds.toString().padStart(2, "0")}
//             </div>

//             <p>
//               Welcome to the TechCore lab - <br />
//               A few hours ago, our research robot BIT-9 disappeared. <br />
//               BIT-9 was developed to plan complex routes, hide information, and make
//               decisions independently. <br />
//               But before we could finally activate it, it suddenly triggered its
//               safety protocol - <br />
//               and took a valuable treasure from the lab with it. <br />
//               We know only one thing: <br />
//               BIT-9 has hidden the treasure in a secret location, leaving behind a
//               series of coded clues, command chains, and navigation routes. <br />
//               The patterns are complex, the tasks logical and only people who can
//               think like BIT-9 will find his treasure. <br />
//               <br />
//               Your mission: <br />
//               Follow the robots trail. <br />
//               Analyze its commands. <br />
//               Decipher its paths. <br />
//               Open the systems it has locked. <br />
//               And find the treasure before the security timer expires and BIT-9
//               irrevocably encrypts everything. <br />
//               You have limited time. <br />
//               The robot trusts that you are smart enough to understand its thoughts. <br />
//               The hunt for BIT-9s treasure begins now. <br />
//               Good luck—youll need it.
//             </p>

//             <ArrowButton
//               className={Styles.arrowButton}
//               onClick={handleNext}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import ArrowButton from "../components/arrowbutton/ArrowButton";
import Styles from "@/app/styles/escapeRoom.module.css";
import { useRouter } from "next/navigation";
import { useTimerContext } from "../context/TimerContext";
import Image from "next/image";

export default function StoryPage() {
  const router = useRouter();
  const { timerValue, toggleMute, isMuted } = useTimerContext();

  const minutes = Math.floor(timerValue / 60);
  const seconds = timerValue % 60;

  return (
    <div className="storyPart">
      <div className="game-content">
        <div className={Styles.container}>
          <div className={Styles.storyBox}>
            <h2
              className={Styles.title}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              STORY
              <button
                onClick={toggleMute}
                style={{
                  cursor: "pointer",
                  background: "transparent",
                  border: "none",
                  padding: 0,
                }}
                aria-label={isMuted ? "Unmute Music" : "Mute Music"}
              >
                <Image
                  src={isMuted ? "/unmute.png" : "/volume.png"}
                  alt="Sound toggle"
                  width={35}
                  height={35}
                  priority
                  style={{
                    filter: "invert(1)",
                  }}
                />
              </button>
            </h2>
            <hr className={Styles.line} />
            <div
              className={`${Styles.timer} ${timerValue <= 10 ? Styles.danger : ""
                }`}
            >
              ⏳ {minutes}:{seconds.toString().padStart(2, "0")}
            </div>

            <p>
              Welcome to the TechCore lab - <br />
              A few hours ago, our research robot BIT-9 disappeared. <br />
              BIT-9 was developed to plan complex routes, hide information,
              and make decisions independently. <br />
              But before we could finally activate it, it suddenly triggered
              its safety protocol - <br />
              and took a valuable treasure from the lab with it. <br />
              We know only one thing: <br />
              BIT-9 has hidden the treasure in a secret location, leaving
              behind a series of coded clues, command chains, and navigation
              routes. <br />
              The patterns are complex, the tasks logical and only people who
              can think like BIT-9 will find his treasure. <br />
              <br />
              Your mission: <br />
              Follow the robot s trail. <br />
              Analyze its commands. <br />
              Decipher its paths. <br />
              Open the systems it has locked. <br />
              And find the treasure before the security timer expires and
              BIT-9 irrevocably encrypts everything. <br />
              You have limited time. <br />
              The robot trusts that you are smart enough to understand its
              thoughts. <br />
              The hunt for BIT-9 s treasure begins now. <br />
              Good luck—you ll need it.
            </p>

            <ArrowButton
              className={Styles.arrowButton}
              onClick={() => router.push("./map")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
