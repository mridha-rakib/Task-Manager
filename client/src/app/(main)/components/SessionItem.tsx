import React from "react";

import { Loader, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { parseUserAgent } from "@/lib/parse-useragent";

const SessionItem = (props: {
  loading?: boolean;
  userAgent: string;
  date: string;
  expiresAt: string;
  isCurrent?: boolean;
  onRemove?: () => void;
}) => {
  const { userAgent, loading, date, isCurrent = false, onRemove } = props;

  const { os, browser, timeAgo, icon: Icon } = parseUserAgent(userAgent, date);

  const handleRemove = () => {
    if (onRemove) {
      onRemove();
    }
  };
  return (
    <div className="flex w-full items-center">
      <div className="rounded-full dorder-[#eee] mr-[16px] flex h-[48px] w-[48px] shrink-0 items-center justify-center border dark:border-[rgb(42,45,48)]">
        <Icon />
      </div>
      <div className="flex flex-1 items-center justify-between">
        <div className="flex-1">
          <h5 className="leading-1 text-sm font-medium">
            {os} / {browser}
          </h5>
          <div className="flex items-center">
            {isCurrent ? (
              <div className="bg-green-500/80 text-white flex h-[20px] w-[81px] items-center justify-center rounded-lg px-2 text-xs">
                Active now
              </div>
            ) : (
              <span className="mr-[16px] text-[12px] font-normal text-muted-foreground">
                {timeAgo}
              </span>
            )}
          </div>
        </div>

        {!isCurrent && (
          <Button
            disabled={loading}
            variant="ghost"
            size="icon"
            onClick={handleRemove}
          >
            {loading ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 size="29px" />
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default SessionItem;
