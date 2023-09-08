"use client";

import data from "@emoji-mart/data";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

import { Smile } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface EmojiPickerProps {
  onChange: (value: string) => void;
}

const Picker = dynamic(() => import("@emoji-mart/react"), {
  ssr: false,
});

export const EmojiPicker = ({
  onChange,
}: EmojiPickerProps) => {
  const { resolvedTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger>
        <Smile className="transition text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300" />
      </PopoverTrigger>
      <PopoverContent
        side="right"
        sideOffset={40}
        className="mb-16 bg-transparent border-none shadow-none drop-shoadw-none "
      >
        <Picker
          theme={resolvedTheme}
          data={async () => {
            const response = await fetch(
              "https://cdn.jsdelivr.net/npm/@emoji-mart/data/sets/14/native.json"
            );

            return response.json();
          }}
          onEmojiSelect={(emoji: any) =>
            onChange(emoji.native)
          }
        />
      </PopoverContent>
    </Popover>
  );
};
