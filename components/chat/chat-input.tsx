"use client";

import * as z from "zod";
import qs from "query-string";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useModal } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus, Send } from "lucide-react";
import { EmojiPicker } from "../emoji-picker";

interface ChatInputProps {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: "channel" | "conversation";
}

const formSchema = z.object({
  content: z.string().min(1),
});

export const ChatInput = ({
  apiUrl,
  query,
  name,
  type,
}: ChatInputProps) => {
  const { onOpen } = useModal();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl,
        query,
      });

      await axios.post(url, values);
      form.reset();
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="content"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4 pb-6 mr-16 lg:mr-0">
                  <div>
                    <button
                      type="button"
                      onClick={() =>
                        onOpen("messageFile", {
                          apiUrl,
                          query,
                        })
                      }
                      className="absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 rounded-full p-1 flex items-center justify-center"
                    >
                      <Plus className="text-white dark:text-[#313338]" />
                    </button>
                    <Input
                      disabled={isLoading}
                      className="py-6 border-0 border-none px-14 bg-zinc-200/90 dark:bg-zinc-700/75 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                      placeholder={`Message ${
                        type === "conversation"
                          ? name
                          : "#" + name
                      }`}
                      {...field}
                      autoComplete="off"
                    />
                    <div className="absolute top-7 right-8">
                      <EmojiPicker
                        onChange={(emoji: string) =>
                          field.onChange(
                            `${field.value} ${emoji}`
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="absolute p-3 transition rounded-md lg:hidden dark:hover:bg-indigo-500 hover:bg-indigo-500 hover:text-zinc-200 -right-10 top-4 bg-zinc-200/90 dark:bg-zinc-700/75">
                    <Send
                      onClick={form.handleSubmit(onSubmit)}
                    />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
