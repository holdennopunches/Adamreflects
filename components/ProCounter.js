// components/ProCounter.js
// Small live counter: days since Adam got Claude Pro (29 June 2026).
"use client";
import { useEffect, useState } from "react";

export default function ProCounter() {
  const [days, setDays] = useState(null);

  useEffect(() => {
    const start = new Date("2026-06-29T00:00:00");
    const now = new Date();
    setDays(Math.max(0, Math.floor((now - start) / 86400000)));
  }, []);

  return (
    <div className="counter-num">
      <div className="big">{days === null ? "—" : days}</div>
      <div className="unit">days of building</div>
    </div>
  );
}
