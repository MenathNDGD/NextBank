import Image from "next/image";
import { redirect } from "next/navigation";

import { getLoggedInUser } from "@/lib/actions/user.actions";

import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = await getLoggedInUser();

  if (!loggedIn) redirect("/sign-in");

  return (
    <main className="flex w-full h-screen font-inter">
      <Sidebar user={loggedIn} />

      <div className="flex flex-col size-full">
        <div className="root-layout">
          <Image
            src={"/icons/logo.png"}
            width={30}
            height={30}
            alt="NextBank Menu"
          />
          <div>
            <MobileNav user={loggedIn} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
