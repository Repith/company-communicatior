import { NextApiResponse } from "next";
import { Server as NetServer, Socket } from "net";
import { Server as IOServer } from "socket.io";

import { Member, Profile, Server } from "@prisma/client";

export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
};

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: IOServer;
    };
  };
};
// This is a hack to get around the fact that the socket.io typings don't include the "io" property on the server.
