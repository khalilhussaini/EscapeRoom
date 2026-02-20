"use client";

import Styles from "@/app/styles/escapeRoom.module.css";
import ArrowButton from "../../components/arrowbutton/ArrowButton";
import { useRouter } from "next/navigation";

export default function InputPage() {
  const router = useRouter();
  return (
    <div className={Styles.successInput}>
      <div className={Styles.textinput}>
        <p>
          You cracked BIT-9s cipher sequence.
          <br />
          The nect letter is: <strong>G</strong>
          <br />
          Move forward.
          <br />
        </p>
      </div>
      <ArrowButton
        className={Styles.arrowSuccessButton}
        onClick={() => router.push("/cipher")}
      />
    </div>
  );
}