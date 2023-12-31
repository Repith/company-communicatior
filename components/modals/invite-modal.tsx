"use client";

import axios from "axios";
import { useState } from "react";
import { useModal } from "@/hooks/use-modal-store";
import { useOrigin } from "@/hooks/use-origin";

import { Check, Copy, RefreshCw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const InviteModal = () => {
  const { onOpen, isOpen, onClose, type, data } =
    useModal();
  const origin = useOrigin();

  const isModalOpen = isOpen && type === "invite";
  const { server } = data;

  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const onNew = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`
      );
      onOpen("invite", { server: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden dark:bg-[#2B2D31]">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-2xl font-bold text-left ">
            Invite Friends
          </DialogTitle>
        </DialogHeader>
        <div className="px-6 py-4">
          <Label className="text-xs font-bold uppercase text-zinc-600 dark:text-zinc-400 ">
            Server invite link
            <div className="flex items-center mt-2 gap-x-2">
              <Input
                className="pl-2 border-0 text-primary bg-zinc-200 dark:bg-zinc-800 focus-visible:ring-0 focus-visible:ring-offset-0"
                value={inviteUrl}
                disabled={isLoading}
              />
              <Button
                onClick={onCopy}
                size="icon"
                disabled={isLoading}
              >
                {copied ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </Button>
            </div>
            <Button
              variant="link"
              size="sm"
              className="mt-4 text-xs text-zinc-400"
              disabled={isLoading}
              onClick={onNew}
            >
              Generate a new link
              <RefreshCw className="w-4 h-4 ml-2" />
            </Button>
          </Label>
        </div>
      </DialogContent>
    </Dialog>
  );
};
