"use client";
import qs from "query-string";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";

import { useModal } from "@/hooks/use-modal-store";
import { ChannelType } from "@prisma/client";

import { Hash, Video, Volume2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Please enter a channel name." })
    .refine((name) => name !== "general", {
      message: "Channel name cannot be 'general'.",
    }),
  type: z.nativeEnum(ChannelType),
});

export const EditChannelModal = () => {
  const iconMap = {
    [ChannelType.TEXT]: (
      <Hash className="w-5 h-5 text-primary/70" />
    ),
    [ChannelType.AUDIO]: (
      <Volume2 className="w-5 h-5 text-primary/70" />
    ),
    [ChannelType.VIDEO]: (
      <Video className="w-5 h-5 text-primary/70" />
    ),
  };

  const descriptionMap = {
    [ChannelType.TEXT]:
      "Text channels are where you can chat with your friends.",
    [ChannelType.AUDIO]:
      "Audio channels are where you can talk with your friends.",
    [ChannelType.VIDEO]:
      "Video channels are where you can meet your friends.",
  };

  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "editChannel";
  const { channel, server } = data;

  const [channelIcon, setChannelIcon] = useState(
    channel?.type
  );

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: channel?.type || ChannelType.TEXT,
    },
  });

  useEffect(() => {
    if (channel) {
      form.setValue("name", channel.name);
      form.setValue("type", channel.type);
      setChannelIcon(channel.type);
    }
  }, [form, channel]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ) => {
    try {
      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id,
        },
      });

      await axios.patch(url, values);

      form.reset();
      router.refresh();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="p-0 overflow-hidden dark:bg-[#2B2D31]">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-2xl font-bold text-left ">
            Edit Channel
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <div className="px-6 space-y-8">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase text-zinc-600 dark:text-zinc-400">
                      Channel Type
                    </FormLabel>
                    <RadioGroup
                      disabled={isLoading}
                      onValueChange={(
                        newValue: ChannelType
                      ) => {
                        field.onChange(newValue);
                        setChannelIcon(newValue);
                      }}
                      defaultValue={field.value}
                    >
                      <>
                        {Object.values(ChannelType).map(
                          (type) => (
                            <div
                              key={type}
                              className="flex"
                            >
                              <FormControl>
                                <RadioGroupItem
                                  value={type}
                                  id={type}
                                  className="hidden peer"
                                />
                              </FormControl>
                              <FormLabel
                                htmlFor={type}
                                className="flex items-center justify-start w-full px-4 py-4 transition rounded-md cursor-pointer bg-zinc-100 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:peer-aria-checked:bg-zinc-700 peer-aria-checked:bg-zinc-300"
                              >
                                {iconMap[type]}

                                <div className="pl-4 space-y-1">
                                  <p className="text-lg text-primary">
                                    {type}
                                  </p>
                                  <p className="text-xs text-primary/70">
                                    {descriptionMap[type]}
                                  </p>
                                </div>
                                <RadioGroupItem
                                  value={type}
                                  id={type}
                                  className="ml-auto peer"
                                  onClick={() =>
                                    setChannelIcon(type)
                                  }
                                />
                              </FormLabel>
                            </div>
                          )
                        )}
                      </>
                    </RadioGroup>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase text-zinc-600 dark:text-zinc-400">
                      Channel name
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center px-2 rounded-md bg-zinc-200 dark:bg-zinc-800">
                        {iconMap[channelIcon!]}
                        <Input
                          disabled={isLoading}
                          className="pl-2 border-0 text-primary bg-zinc-200 dark:bg-zinc-800/50 focus-visible:ring-0 focus-visible:ring-offset-0"
                          placeholder="Enter channel name"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="px-6 py-4 bg-zinc-100 dark:bg-zinc-800">
              <Button
                variant="primary"
                disabled={isLoading}
              >
                Edit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
