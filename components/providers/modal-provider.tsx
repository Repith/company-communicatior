"use client";

import { CreateServerModal } from "@/components/modals/create-server-modal";
import { MountedCheck } from "@/lib/mounted-check";
import { InviteModal } from "../modals/invite-modal";

export const ModalProvider = () => {
  return (
    <>
      <MountedCheck>
        <CreateServerModal />
        <InviteModal />
      </MountedCheck>
    </>
  );
};
