import { Textarea } from "nft-vyapar-kit";
import styles from "nft-vyapar-kit/dist/index.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export default function Index() {
  const listenToPayload = (payload: any) => {
    console.log("payload is => ", payload);
  };

  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        lineHeight: "1.4",
        width: "500px",
        margin: "20px",
      }}
    >
      <Textarea
        callbackUrl="http://localhost:3000/api/mint"
        callbackFn={listenToPayload}
      />
    </div>
  );
}
