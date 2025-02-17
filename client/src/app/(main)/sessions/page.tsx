import React from "react";

import Sessions from "../components/Session";

const Page = () => {
  return (
    <>
      <div>
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-2 px-6 py-8 md:max-w-5xl">
          <h1 className="dark:text-inherit text-[28px] font-extrabold leading-[34px] tracking-[-0.416px] text-[#000509e3]">
            Setup security and sessions
          </h1>
          <p className="dark:text-gray-100 text-sm font-normal text-[#0007149f]">
            Follow the steps to activate using the TMS
          </p>
        </div>
        <div className="relative mx-auto w-full max-w-3xl px-6 py-0 md:max-w-5xl">
          <div className="steps-gradient dark:bg-gray-800 absolute top-0 h-[700px] w-px"></div>

          <div className="flex flex-col gap-5">
            <div className="relative pl-6 transition duration-200 ease-in-out">
              <div className="bg-white rounded-full absolute -left-[9.5px] top-7 z-10 block h-5 w-5 dark:bg-background">
                <div className="rounded-full ml-1 mt-1 h-3 w-3 border-2 border-primary transition duration-200 ease-in-out"></div>
              </div>
              <div>
                <Sessions />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
