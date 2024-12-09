import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css"
import SideBar from "@/components/SideBar";
import MobileNavigation from "@/components/MobileNavigation";
import Header from "@/components/Header";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "StoreIt",
  description: "StoreIt - The only storage unit you need",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  console.log({currentUser});
  

  if (!currentUser) return redirect("/sign-in");
  return (
    <main className="flex h-screen">
        <SideBar {...currentUser} />
        <section className="flex flex-1 h-full flex-col">
            <MobileNavigation/> <Header />
            <div className="main-content">{children}</div>
        </section>
    </main>
  );
}
