import React, {useState, useEffect} from "react";
import { Block, Text } from "galio-framework";

export default function Clock() {
    const [time, setTime] = useState({
      day: new Date().getDate(),
      month: new Date().toLocaleString("default", { month: "long" }),
      year: new Date().getFullYear(),
      hour: new Date().toLocaleString("deafult", { day: "2-digit" }),
      min: new Date().getMinutes(),
      sec: new Date().getSeconds()
    });

    const tick = () => {
      setTime({
        day: new Date().getDate(),
        month: new Date().toLocaleString("default", { month: "long" }),
        year: new Date().getFullYear(),
        hour: new Date().toLocaleString("deafult", { day: "2-digit" }),
        min: new Date().getMinutes(),
        sec: new Date().getSeconds()
      });
    };

    useEffect(() => {
      setInterval(tick, 1000);
    }, []);

    return (
      <Block middle>
        <Text
          size={16}
          color="#525F7F"
          style={{ marginBottom: 4 }}
        >
          {time.month} {time.day} {time.year}
        </Text>
        <Text
          size={30}
          color="#525F7F"
          style={{ marginBottom: 4 }}
        >
          {((time.hour + 11) % 12) + 1}:{((time.min + 59) % 60) + 1}{" "}
          {time.hour >= 12 ? "PM" : "AM"}
        </Text>
      </Block>
    );
}
