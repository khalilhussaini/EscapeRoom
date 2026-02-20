
"use client";

import Styles from "@/app/styles/escapeRoom.module.css";
import Button from "../../components/Button/Button";
import Link from "next/link";

export default function QuizExitPage() {
  return (
    <div className={Styles.exit1}>
      <div className={Styles.exitBox}>
        <p className={Styles.exitText}>Exit?</p>
        <div className={Styles.exitButtons1}>
          <Link href="/quiz">
            <Button label="Cancel" />
          </Link>
          <Link href="/map">
            <Button label="Confirm" />
          </Link>
        </div>
      </div>
    </div>
  );
}
