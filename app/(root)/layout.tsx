import Image from "next/image";

import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = { firstName: "User", lastName: "Name" };

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
