"use client";

import { notFound } from "next/navigation";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageContainer } from "@/components/layout/PageContainer";
import { PracticeHeader } from "@/components/practice/PracticeHeader";
import { ChatContainer } from "@/components/chat/ChatContainer";
import { Loader } from "@/components/ui/Loader";
import { TamboProvider } from "@tambo-ai/react";
import { useMcpServers } from "@/components/tambo/mcp-config-modal";
import { components, tools } from "@/lib/tambo";
import { subjects } from "@/data/questions";

export default function ChatPracticePage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const [subjectId, setSubjectId] = useState<string>("");
  const mcpServers = useMcpServers();

  useEffect(() => {
    params.then((resolved) => {
      const id = resolved.subject.toLowerCase();
      setSubjectId(id);
    });
  }, [params]);

  if (!subjectId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const subject = subjects.find((s) => s.id === subjectId);
  if (!subject) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <PageContainer maxWidth="full" className="flex-1 flex flex-col py-8 sm:py-12">
          <PracticeHeader subject={subjectId} mode="chat" />
          <div className="mb-4 p-4 bg-muted rounded-lg">
            <p className="text-sm">
              <strong>Tip:</strong> You can ask me questions about {subject.name}, request practice questions, 
              or ask for explanations. Try: "Ask me a question from {subject.chapters?.[0] || 'this subject'}" 
              or "Explain Newton's First Law"
            </p>
          </div>
          <div className="flex-1 min-h-0">
            <TamboProvider
              apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY!}
              components={components}
              tools={tools}
              tamboUrl={process.env.NEXT_PUBLIC_TAMBO_URL}
              mcpServers={mcpServers}
            >
              <ChatContainer subject={subjectId} className="h-full" />
            </TamboProvider>
          </div>
        </PageContainer>
      </main>
      <Footer />
    </div>
  );
}
