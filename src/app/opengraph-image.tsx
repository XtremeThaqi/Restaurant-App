import { ImageResponse } from "next/og";
export const alt = "BLINI — Good food. Better company. A restaurant concept.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#171b17", color: "#f6f1e8", padding: 70 }}><div style={{ display: "flex", fontSize: 38, letterSpacing: 10 }}>BLINI<span style={{ color: "#d26a3a" }}>.</span></div><div style={{ display: "flex", flexDirection: "column", fontSize: 80, lineHeight: 1.1 }}><span>Good food.</span><span>Better company.</span></div><div style={{ display: "flex", fontSize: 22, color: "#d9c8b1" }}>A restaurant concept · No real orders or bookings</div></div>, size);
}
