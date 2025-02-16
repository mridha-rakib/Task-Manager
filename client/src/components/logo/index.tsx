import Link from "next/link";
import React from "react";

const Logo = (props: { url?: string; size?: string; fontSize?: string }) => {
  const { url = "/", size = "40px", fontSize = "24px" } = props;
  return (
    <div className="flex items-center justify-center sm:justify-start">
      <Link
        href={url}
        className="dark:border-gray-200 from-blue-500 flex items-center justify-center rounded-lg border-2 bg-gradient-to-br to-primary to-90%"
        style={{ width: size, height: size }}
      >
        <span className="text-gray-50 font-bold" style={{ fontSize: fontSize }}>
          S
        </span>
      </Link>
    </div>
  );
};

export default Logo;
