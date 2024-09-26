import Image from "next/image";
import React from "react";

import { logoutAccount } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

const Footer = ({ user, type = "desktop" }: FooterProps) => {
  const router = useRouter();

  const handleLogOut = async () => {
    const logOut = await logoutAccount();

    if (logOut) router.push("/sign-in");
  };

  return (
    <footer className="footer">
      <div className={type === "mobile" ? "footer_name-mobile" : "footer-name"}>
        <p className="text-xl font-bold text-gray-700">{user?.name[0]}</p>
      </div>

      <div
        className={type === "mobile" ? "footer_email-mobile" : "footer-email"}
      >
        <h1 className="font-semibold text-gray-700 truncate text-14">
          {user?.name}
        </h1>
        <p className="font-normal text-gray-600 truncate text-14">
          {user?.email}
        </p>
      </div>

      <div className="footer_image">
        <Image
          src={"icons/logout.svg"}
          fill
          alt="logout"
          onClick={handleLogOut}
        />
      </div>
    </footer>
  );
};

export default Footer;
