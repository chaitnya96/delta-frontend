import React, { useEffect, useState } from "react";
export default function MarkPriceUpdate({ markPrice }) {
  const [hasChanged, setHasChanged] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    if (isMounted) {
      setHasChanged(true);
      setTimeout(() => {
        setHasChanged(false);
      }, 500);
    }
    setIsMounted(true)
  }, [markPrice]);
  return (
    <td className={hasChanged ? "tbl-active-bg" : "tbl-bg"}>{markPrice}</td>
  );
}
