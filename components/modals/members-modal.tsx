"use client";

import qs from "query-string";
import axios from "axios";
import { useState } from "react";
import { useModal } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";
import { MemberRole } from "@prisma/client";

import {
  Check,
  Crown,
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
  DropdownMenuSubTrigger,
} from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";

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
  const [loadingId, setLoadingId] = useState("");
  const router = useRouter();

  const isModalOpen = isOpen && type === "members";
  const { server } = data as {
    server: ServerWithMembersWithProfiles;
  };

  const onKick = async (memberId: string) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        },
      });

      const response = await axios.delete(url);
      router.refresh();
      onOpen("members", { server: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingId("");
    }
  };

  const onRoleChange = async (
    memberId: string,
    role: MemberRole
  ) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        },
      });

      const response = await axios.patch(url, { role });
      router.refresh();
      onOpen("members", { server: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingId("");
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden dark:bg-[#2B2D31] ">
        <DialogHeader className="pt-2 ">
          <DialogTitle className="text-2xl font-bold text-left">
            Manage Members
          </DialogTitle>
          <DialogDescription className="text-left text-zinc-500">
            {server?.members?.length} Members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-2 max-h-[420px] pr-6"></ScrollArea>
        {server?.members?.map((member) => (
          <div key={member.id} className="flex flex-col">
            <div className="flex items-center mb-6 gap-x-2">
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

              {server.profileId !== member.profile.id &&
                loadingId !== member.id && (
                  <div className="ml-auto">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical className="w-5 h-5 text-zinc-500" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="left">
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className="flex items-center">
                            <ShieldQuestion className="w-4 h-4 mr-2 " />
                            <span>Role</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem
                                onClick={() =>
                                  onRoleChange(
                                    member.id,
                                    "GUEST"
                                  )
                                }
                              >
                                <Shield className="w-4 h-4 mr-2" />
                                Guest
                                {member.role ===
                                  "GUEST" && (
                                  <Check className="w-4 h-4 ml-auto" />
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  onRoleChange(
                                    member.id,
                                    "MODERATOR"
                                  )
                                }
                              >
                                <ShieldCheck className="w-4 h-4 mr-2" />
                                Moderator
                                {member.role ===
                                  "MODERATOR" && (
                                  <Check className="w-4 h-4 ml-auto" />
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => onKick(member.id)}
                        >
                          <Gavel className="w-4 h-4 mr-2" />
                          Kick
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}

              {loadingId === member.id && (
                <Loader2 className="w-4 h-4 ml-auto animate-spin text-zinc-500" />
              )}
            </div>
            <Separator className="rounded-md bg-zinc-200 dark:bg-zinc-700" />
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
};
