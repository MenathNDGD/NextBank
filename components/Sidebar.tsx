"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";

import Footer from "./Footer";
import PlaidLink from "./PlaidLink";

const Sidebar = ({ user }: SiderbarProps) => {
  const pathname = usePathname();

  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="flex items-center gap-2 mb-12 cursor-pointer">
          <Image
            src="/icons/logo.png"
            width={34}
            height={34}
            alt="NextBank"
            className="size-[24px] max-xl:size-14"
          />
          <h1 className="sidebar-logo">NextBank</h1>
        </Link>

        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);

          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn("sidebar-link", { "bg-bankGradient": isActive })}
            >
              <div className="relative size-6">
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  fill
                  className={cn({ "brightness-[3] invert-0": isActive })}
                />
              </div>
              <p className={cn("sidebar-label", { "!text-white": isActive })}>
                {item.label}
              </p>
            </Link>
          );
        })}

        <PlaidLink user={user} />
      </nav>
      <Footer user={user} />
    </section>
  );
};

export default Sidebar;
