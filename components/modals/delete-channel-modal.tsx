"use client";

import qs from "query-string";
import axios from "axios";
import { useState } from "react";
import { useModal } from "@/hooks/use-modal-store";
import { useParams, useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const DeleteChannelModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "deleteChannel";
  const { server, channel } = data;

  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    try {
      setIsLoading(true);

      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id,
        },
      });

      await axios.delete(url);
      onClose();
      router.refresh();
      router.push(`/servers/${server?.id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden dark:bg-[#2B2D31]">
        <DialogHeader className="px-6 py-4 space-y-2">
          <DialogTitle className="text-2xl font-bold text-left">
            Delete channel
          </DialogTitle>
          <DialogDescription className="text-left text-zinc-500">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-indigo-500">
              #{channel?.name}?
            </span>{" "}
            <br />
            This action cannot be overturned.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="px-6 py-3 bg-zinc-100 dark:bg-zinc-800 ">
          <div className="flex items-center justify-between w-full ">
            <Button
              disabled={isLoading}
              onClick={onClose}
              variant="ghost"
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              onClick={onDelete}
              variant="destructive"
            >
              Delete
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
