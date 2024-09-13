import React, { useState } from "react";
import riftImage from "data-base64:~assets/rift.svg";
import { getWallets } from "./background/db";
import "./popup.css";

const IndexPopup = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const wallets = await getWallets();
      const blob = new Blob([JSON.stringify(wallets, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "wallets.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading wallets:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
  <div
    style={{
      backgroundColor: "black",
      width: "300px",
      height: "400px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px 0"
    }}
  >
    <div style={{ flex: 1 }} /> {/* Top spacer */}
    <img src={riftImage} alt="Rift" width="84px" height="20px" />
    <div style={{ flex: 1 }} /> {/* Bottom spacer */}
    <button
      onClick={handleDownload}
      disabled={isLoading}
      style={{
        backgroundColor: "white",
        color: "black",
        border: "none",
        padding: "10px 20px",
        cursor: "pointer",
        width: "80%",
        maxWidth: "200px"
      }}
    >
      {"Download Wallets"}
    </button>
  </div>
);
}

export default IndexPopup;
