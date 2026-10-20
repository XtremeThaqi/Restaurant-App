import type { Metadata, Viewport } from "next";
import "./globals.css";
const title = "BLINI — Good food. Better company.";
const description = "Explore BLINI, a fictional restaurant portfolio concept: an international sample menu, warm editorial design and an interactive reservation demo. No real bookings or orders.";
export const metadata: Metadata = {
  metadataBase: new URL("https://blini.netlify.app"),
  title, description, alternates: { canonical: "/" },
  openGraph: { title, description, url: "/", siteName: "BLINI", locale: "en_US", type: "website", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "BLINI — Good food. Better company. A restaurant concept." }] },
  twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
};
export const viewport: Viewport = { themeColor: "#171b17", width: "device-width", initialScale: 1 };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
