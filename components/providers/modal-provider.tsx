"use client";

import { MountedCheck } from "@/lib/mounted-check";
import { CreateServerModal } from "@/components/modals/create-server-modal";
import { InviteModal } from "@/components/modals/invite-modal";
import { EditServerModal } from "@/components/modals/edit-server-modal";
import { MembersModal } from "@/components/modals/members-modal";

export const ModalProvider = () => {
  return (
    <>
      <MountedCheck>
        <CreateServerModal />
        <InviteModal />
        <EditServerModal />
        <MembersModal />
      </MountedCheck>
    </>
  );
};
