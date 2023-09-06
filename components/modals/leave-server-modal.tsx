"use client";
import axios from "axios";
import { useState } from "react";
import { useModal } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

export const LeaveServerModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "leaveServer";
  const { server } = data;

  const [isLoading, setIsLoading] = useState(false);

  const onLeave = async () => {
    try {
      setIsLoading(true);

      await axios.patch(`/api/servers/${server?.id}/leave`);
      onClose();
      router.refresh();
      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden dark:bg-[#2B2D31]">
        <DialogHeader className="px-6 py-4">
          <DialogTitle className="text-2xl font-bold text-left">
            Leave server
          </DialogTitle>
          <DialogDescription className="text-left text-zinc-500">
            Are you sure you want to leave{" "}
            <span className="font-semibold text-indigo-500">
              {server?.name}
            </span>
            ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="px-6 py-4 bg-zinc-100 dark:bg-zinc-800">
          <div className="flex items-center justify-between w-full">
            <Button
              disabled={isLoading}
              onClick={onClose}
              variant="ghost"
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              onClick={onLeave}
              variant="destructive"
            >
              Leave
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
