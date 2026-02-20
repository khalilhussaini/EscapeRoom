
"use client";

import { useState, useEffect } from "react";
import Styles from "@/app/styles/escapeRoom.module.css";
import Button from "../components/Button/Button";
import Link from "next/link";
import api from "../services/api";
import { useRouter } from "next/navigation";

interface Mission {
  id: number;
  name: string;
}

const missionPositions: Record<string, { top: string; left: string }> = {
  QUIZ: { top: "25%", left: "19%" },
  RIDDLE: { top: "25%", left: "41%" },
  CIPHER: { top: "25%", left: "81%" },
  "NUMBER LOCK": { top: "85%", left: "20%" },
  "SECRET LOCATION": { top: "81%", left: "90%" },
};

export default function MapPage() {
  const router = useRouter();
  const [missions, setMissions] = useState<Mission[]>([]);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const response = await api.get("/missions");
        setMissions(response.data);
      } catch (error) {
        console.error("Error fetching missions:", error);
      }
    };

    fetchMissions();
  }, []);

  const handleMissionClick = (missionName: string, missionId: number) => {
    const route = `/${missionName.toLowerCase().replace(/ /g, "-")}`;
    router.push(`${route}?missionId=${missionId}`);
  };

  return (
    <div className="mapPart">
      <div className={Styles.p}>
        <div className={Styles.container}>
          <div className={Styles.storyBox1}>
            <h2 className={Styles.Title}>MAP</h2>
            <div className={Styles.mapContainer}>
              <svg
                viewBox="0 0 900 450"
                preserveAspectRatio="xMidYMid meet"
                className={Styles.responsiveSvg}
              >
                <rect width="900" height="450" fill="rgba(246, 248, 248)" />
                <rect
                  x="10"
                  y="10"
                  width="880"
                  height="430"
                  fill="none"
                  stroke="black"
                  strokeWidth="9"
                />
                {/* left room */}
                <line x1="300" y1="10" x2="300" y2="168" stroke="black" strokeWidth="6" />
                <line x1="300" y1="297" x2="300" y2="440" stroke="black" strokeWidth="6" />
                {/* top middel room */}
                <line x1="450" y1="10" x2="450" y2="170" stroke="black" strokeWidth="6" />
                <line x1="340" y1="170" x2="450" y2="170" stroke="black" strokeWidth="6" />
                {/* right mittel wall */}
                <line x1="500" y1="170" x2="890" y2="170" stroke="black" strokeWidth="6" />
                <line x1="700" y1="170" x2="700" y2="260" stroke="black" strokeWidth="6" />
                {/* botton wall */}
                <line x1="300" y1="300" x2="700" y2="300" stroke="black" strokeWidth="6" />
                {/* Door shap */}
                {/* Left Main Door */}
                <line x1="10" y1="180" x2="10" y2="220" stroke="rgba(246, 248, 248)" strokeWidth="12" /> {/* wall */}
                <line x1="10" y1="220" x2="50" y2="220" stroke="black" strokeWidth="3" />
                <path d="M10 180 A40 40 0 0 1 50 220" fill="none" stroke="black" strokeWidth="3" strokeDasharray="4" />
                {/* Top Middle Room Door  */}
                <line x1="300" y1="170" x2="340" y2="170" stroke="rgba(246, 248, 248)" strokeWidth="8" /> {/* Gap */}
                <line x1="340" y1="170" x2="340" y2="205" stroke="black" strokeWidth="3" />
                <path d="M300 170 A40 40 0 0 0 340 210" fill="none" stroke="black" strokeWidth="3" strokeDasharray="4" />
                {/* Middle Right Wall Door  */}
                <line x1="500" y1="170" x2="500" y2="215" stroke="black" strokeWidth="3" />
                <path d="M450 170 A50 50 0 0 0 500 220" fill="none" stroke="black" strokeWidth="3" strokeDasharray="4" />
                {/*  Wall Door */}
                <line x1="700" y1="300" x2="740" y2="300" stroke="black" strokeWidth="3" />
                <path d="M700 260 A40 40 0 0 1 740 300" fill="none" stroke="black" strokeWidth="3" strokeDasharray="4" />
              </svg>
              {missions.map((mission) => {
                const position = missionPositions[mission.name];

                return position ? (
                  <button
                    key={mission.id}
                    className={Styles.hotspot}
                    style={{ top: position.top, left: position.left }}
                    onClick={() => handleMissionClick(mission.name, mission.id)}
                    title={mission.name}
                  >
                    <svg
                      className={Styles.pinIcon}
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
                    </svg>
                  </button>
                ) : null;
              })}

            </div>
            <Link href="/">
              <Button label="Exit" className={Styles.buttonMap} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
