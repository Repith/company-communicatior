"use client";

import { useModal } from "@/hooks/use-modal-store";
import { ServerWithMembersWithProfiles } from "@/types";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserAvatar } from "@/components/user-avatar";
import { Crown, ShieldCheck } from "lucide-react";

const roleIconMap = {
  GUEST: null,
  MODERATOR: (
    <ShieldCheck className="w-4 h-4 ml-2 text-indigo-500" />
  ),
  ADMIN: <Crown className="w-4 h-4 ml-2 text-amber-600" />,
};

export const MembersModal = () => {
  const { onOpen, isOpen, onClose, type, data } =
    useModal();

  const isModalOpen = isOpen && type === "members";
  const { server } = data as {
    server: ServerWithMembersWithProfiles;
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden text-black bg-white ">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-2xl font-bold text-center">
            Manage Members
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            {server?.members?.length} Members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[420px] pr-6"></ScrollArea>
        {server?.members?.map((member) => (
          <div
            key={member.id}
            className="flex items-center mb-6 gap-x-2"
          >
            <UserAvatar src={member.profile.imageUrl} />
            <div className="flex flex-col gap-y-1">
              <div className="flex items-center text-xs font-semibold gap-x-1">
                {member.profile.name}
                {roleIconMap[member.role]}
              </div>
              <p className="text-xs text-zinc-500">
                {member.profile.email}
              </p>
            </div>
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
};
