import { useEffect, useState } from "react";
import mqtt from "mqtt";

const MQTT_BROKER_URL = "ws://localhost:9001";
let client;

const useMqtt = () => {
  const [connected, setConnected] = useState(false);
  const [data, setData] = useState("{}");

  useEffect(() => {
    if (!client) {
      client = mqtt.connect(MQTT_BROKER_URL);

      client.on("connect", () => {
        console.log("Connected to MQTT broker");
        setConnected(true);
        client.subscribe("data");
      });

      client.on("message", (topic, message) => {
        if (topic === "data") {
          const newData = message.toString();
          setData(newData);
        }
      });

      client.on("error", (err) => {
        console.error("Error connecting to MQTT broker", err);
      });
    }

    return () => {
      if (client) {
        client.end();
        setConnected(false);
      }
    };
  }, []);

  const sendMessage = (topic, message) => {
    if (client && client.connected) {
      client.publish(topic, message);
      console.log("message sent:", message, "on topic:", topic);
    } else {
      console.error("MQTT client is not connected");
    }
  };

  return { sendMessage, connected, data };
};

export default useMqtt;
