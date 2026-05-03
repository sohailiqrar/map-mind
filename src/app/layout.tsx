import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import { Provider } from "./lib/utils/provider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Header from "./components/ui/Header";
import "./globals.css";

const inter = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NueroZen",
  description: "Your mental wellness space"
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <Provider session={session}>
        <body className={inter.className}>
          <Header />
          {children}
        </body>
      </Provider>
    </html>
  );
}
