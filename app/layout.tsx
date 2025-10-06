import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/navbar.component";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import QueryProvider from "@/components/query-provider.component";
import Footer from "@/components/footer/footer.component";

import { ToastContainer } from "react-toastify";

const workSans = localFont({
  variable: "--font-work-sans",
  src: [
    {
      path: "./fonts/WorkSans-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-Thin.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-ExtraLight.ttf",
      weight: "100",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "shuacapstudio",
  description:
    "shuacapstudio is a digital marketing and creative studio that helps small businesses scale by offering web development and videography services. From building high-converting websites to producing engaging video content, I create the tools and strategies that drive leads, growth, and brand visibility.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={workSans.variable}>
        <QueryProvider>
          <Navbar />
          {children}
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
          />
          <Analytics />

          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
