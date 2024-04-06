import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import AppProvider from "@/app/app-provider";
import { cookies } from "next/headers";
import SlideSession from "@/components/slide-session";
import { AccountResType } from "@/schemaValidations/account.schema";
import accountApiRequest from "@/apiRequests/account";
import { baseOpenGraph } from "@/app/shared-metadata";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Productic",
    default: "Productic"
  },
  description: "Được tạo bởi dev",
  openGraph: baseOpenGraph
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");
  let user: AccountResType["data"] | null = null;
  if (sessionToken) {
    const data = await accountApiRequest.me(sessionToken.value);
    user = data.payload.data;
  }
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppProvider inititalSessionToken={sessionToken?.value} user={user}>
            <Header user={user} />
            {children}
            <SlideSession />
            <Toaster />
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
