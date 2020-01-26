import React, {useState, useEffect} from "react";
import  {Text } from "react-native";

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
      <>
        <Text
          style={{
            fontFamily: "montserrat",
            fontWeight: 200,
            color: "rgba(255,255,255,1)",
            fontSize: 14,
            textAlign: "center"
          }}
        >
          {time.month} {time.day} {time.year}
        </Text>
        <Text
          style={{
            fontFamily: "montserrat",
            fontWeight: 200,
            color: "rgba(255,255,255,1)",
            fontSize: 15,
            textAlign: "center"
          }}
        >
          {((time.hour + 11) % 12) + 1}:{((time.min + 59) % 60) + 1}{" "}
          {time.hour >= 12 ? "PM" : "AM"}
        </Text>
      </>
    );
}
