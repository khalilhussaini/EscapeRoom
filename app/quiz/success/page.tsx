"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Styles from "@/app/styles/escapeRoom.module.css";
import Button from "../../components/Button/Button";
import Link from "next/link";
import api from "../../services/api";
import { useRouter } from "next/navigation";

interface Mission {
  id: number;
  name: string;
}

const missionPositions: Record<string, { top: string; left: string }> = {
  QUIZ: { top: "10%", left: "21%" },
  RIDDLE: { top: "10%", left: "52%" },
  CIPHER: { top: "19%", left: "81%" },
  "NUMBER LOCK": { top: "81%", left: "21%" },
  "SECRET LOCATION": { top: "75%", left: "80%" },
};

export default function MapPage() {
  const router = useRouter();
  const [missions, setMissions] = useState<Mission[]>([]);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const response = await api.get("/missions");
        setMissions(response.data);
        console.log("Missions fetched:", response.data);
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
      <div className="game-content">
        <div className={Styles.container}>
          <div className={Styles.storyBox1}>
            <h2 className={Styles.Title}>MAP</h2>
            <div className={Styles.mapContainer}>
              <Image src="/map.png" alt="Map" width={900} height={450} />
              {missions.map((mission) => {
                const position = missionPositions[mission.name];
                return position ? (
                  <button
                    key={mission.id}
                    className={Styles.hotspot}
                    style={{ top: position.top, left: position.left }}
                    onClick={() => handleMissionClick(mission.name, mission.id)}
                    title={mission.name}
                  />
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
