import React, { useState, useEffect, useRef } from "react";
import { Block, Text } from "galio-framework";

export default function Clock() {
  let [time, setTime] = useState({
    day: new Date().getDate(),
    month: new Date().toLocaleString("default", { month: "long" }),
    year: new Date().getFullYear(),
    time: new Date().toLocaleString("default", {
      minute: "2-digit",
      hour: "2-digit",
      second: "2-digit"
    })
  });

  useInterval(() => {
    setTime({
      day: new Date().getDate(),
      month: new Date().toLocaleString("default", { month: "long" }),
      year: new Date().getFullYear(),
      time: new Date().toLocaleString("default", {
        minute: "2-digit",
        hour: "2-digit",
        second: "2-digit"
      })
    });
  }, 1000);

  return (
    <Block middle>
      <Text size={16} color="#525F7F" style={{ marginBottom: 4 }}>
        {time.month} {time.day} {time.year}
      </Text>
      <Text size={30} color="#525F7F" style={{ marginBottom: 4 }}>
        {time.time}
      </Text>
    </Block>
  );
}

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
