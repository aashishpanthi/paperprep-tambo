"use client";

import { cn } from "@/lib/utils";
import { MessageThreadFull } from "@/components/tambo/message-thread-full";

export interface ChatContainerProps {
  subject: string;
  className?: string;
}

export function ChatContainer({ subject, className }: ChatContainerProps) {
  return (
    <div className={cn("h-full w-full", className)}>
      <MessageThreadFull className="max-w-4xl mx-auto h-full" />
    </div>
  );
}
