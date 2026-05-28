import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DeFi Copilot",
  description: "AI portfolio analytics and user-approved DeFi actions on Base.",
  other: {
    "talentapp:project_verification":
      "02f6e6ef05cf8ceea8f02b3c1f24daa487b0ae9eb54adbc45cb0afe559f82b22f6c61d94a6d7c486aaa717f6f06036d1555cf74fc8f7d4bcce71b2f27d1866cc",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
