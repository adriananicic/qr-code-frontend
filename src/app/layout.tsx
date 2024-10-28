import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body className="overflow-x-hidden">{children}</body>
      </UserProvider>
    </html>
  );
}
