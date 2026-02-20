"use client";

import Styles from "@/app/styles/escapeRoom.module.css";
import ArrowButton from "../../components/arrowbutton/ArrowButton";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { checkAllMissionsCompleted } from "../../services/checkAllMissionsCompleted";

function CipherSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [checking, setChecking] = useState(true);

  const letter = searchParams.get("letter") || "N/A";
  const clueText = searchParams.get("text") || "You have earned a letter";

  useEffect(() => {
    const checkCompletion = async () => {
      const allCompleted = await checkAllMissionsCompleted();
      if (allCompleted) {
        router.push("/win");
      } else {
        setChecking(false);
      }
    };
    checkCompletion();
  }, [router]);

  const handleNext = () => {
    router.push("../map");
  };

  if (checking) {
    return <div className={Styles.success}>Checking progress...</div>;
  }

  return (
    <div className={Styles.success}>
      <div className={Styles.textquiz}>
        <p>
          &quot;You cracked BIT-9&apos;s cipher sequence.
          <br />
          {clueText}: {letter}
          <br />
          Move forward.&quot;
        </p>
      </div>
      <ArrowButton className={Styles.arrowSuccessButton} onClick={handleNext} />
    </div>
  );
}

export default function CipherSuccessPage() {
  return (
    <Suspense fallback={<div className={Styles.success}>Loading...</div>}>
      <CipherSuccessContent />
    </Suspense>
  );
}
