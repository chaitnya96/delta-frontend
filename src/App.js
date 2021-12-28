import { useState, useEffect } from "react";
import axios from "axios";
import TradeData from "./Components/TradeData";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { w3cwebsocket as W3CWebSocket } from "websocket";
import { searchToObject } from "./utils";
export const client = new W3CWebSocket("wss://socket.delta.exchange/v2/ticker");

function App() {
  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState([]);
  const [canSendMessage, setcanSendMessage] = useState(true);

  useEffect(() => {
    if (
      canSendMessage &&
      data.length > 0 &&
      client.readyState === WebSocket.OPEN
    ) {
      setcanSendMessage(false);
      sendSymbols([...data]);
      createonMessage([...data]);
    }
  }, [data]);
  const createonMessage = (allData) => {
    let myData = [...allData];
    return (client.onmessage = (message) => {
      const dataMessage = JSON.parse(message.data);
      if (dataMessage.symbol) {
        const getIndex = () =>
          myData.findIndex((item) => item.symbol === dataMessage.symbol);
        const index = getIndex();
        if (index >= 0) {
          let withPriceData = [...myData];
          withPriceData[index] = {
            ...withPriceData[index],
            mark_price: dataMessage.mark_price,
          };
          myData = withPriceData;
          setData(withPriceData);
        }
      }
    });
  };
  const sendSymbols = (allData) =>
    client.send(
      JSON.stringify({
        type: "subscribe",
        payload: {
          channels: [
            {
              name: "v2/ticker",
              // symbols: ["BTCUSD", "BTCUSDT"],
              symbols: allData.map(({ symbol }) => symbol),
            },
          ],
        },
      })
    );
  useEffect(() => {
    async function getData() {
      let { page_size = 10 } = searchToObject();
      await axios
        .get(`https://api.delta.exchange/v2/products?page_size=${page_size}`)
        .then(async (response) => {
          setData(response.data.result);
          setLoadingData(false);
        });
    }
    if (loadingData) {
      // if the result is not ready so you make the axios call
      getData();
    }
  }, []);
  return loadingData ? (
    <p>Loading Please wait...</p>
  ) : (
    <Container>
      <TradeData data={data} />
    </Container>
  );
}

export default App;
