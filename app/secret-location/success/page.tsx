
"use client";

import Styles from "@/app/styles/escapeRoom.module.css";
import ArrowButton from "../../components/arrowbutton/ArrowButton";
import { useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { checkAllMissionsCompleted } from "../../services/checkAllMissionsCompleted";

function SecretLocationSuccessContent() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

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
          &quot;You successfully found the secret location.
          <br />
          Proceed to the next station.
          <br />
          You discovered the secret location.&quot;
        </p>
      </div>
      <ArrowButton className={Styles.arrowSuccessButton} onClick={handleNext} />
    </div>
  );
}

export default function SecretLocationSuccessPage() {
  return (
    <Suspense fallback={<div className={Styles.success}>Loading...</div>}>
      <SecretLocationSuccessContent />
    </Suspense>
  );
}
