import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { subjects } from "@/data/questions";
import { BookOpen, FileQuestion, MessageSquare, PenTool, ArrowRight } from "lucide-react";

export default async function PracticeModeSelector({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const resolvedParams = await params;
  const subjectId = resolvedParams.subject.toLowerCase();
  const subject = subjects.find((s) => s.id === subjectId);

  if (!subject) {
    notFound();
  }

  const practiceModes = [
    {
      id: "mcq",
      name: "Multiple Choice Questions",
      description: "Test your knowledge with instant feedback and detailed explanations",
      icon: FileQuestion,
      href: `/${subjectId}/practice/mcq`,
      color: "primary",
    },
    {
      id: "flashcards",
      name: "Flashcards",
      description: "Review and memorize concepts with interactive flashcards",
      icon: BookOpen,
      href: `/${subjectId}/practice/flashcards`,
      color: "support-teal",
    },
    {
      id: "fill-blanks",
      name: "Fill in the Blanks",
      description: "Complete sentences and test your understanding",
      icon: PenTool,
      href: `/${subjectId}/practice/fill-blanks`,
      color: "support-yellow",
    },
    {
      id: "chat",
      name: "AI Chat Tutor",
      description: "Get personalized help and explanations from our AI tutor",
      icon: MessageSquare,
      href: `/${subjectId}/practice/chat`,
      color: "support-lavender",
    },
  ];

  return (
    <main className="flex-1">
        {/* Header Section */}
        <section className="bg-support-teal py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
                Choose Practice Mode
              </h1>
              <p className="text-lg text-muted-foreground">
                Select how you want to practice {subject.name}
              </p>
            </div>
          </div>
        </section>

        {/* Practice Modes Grid */}
        <section className="bg-background py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 max-w-5xl mx-auto">
              {practiceModes.map((mode, index) => {
                const Icon = mode.icon;
                const isEven = index % 2 === 0;
                
                return (
                  <Card 
                    key={mode.id} 
                    className={`bg-background border-2 hover:border-primary/40 hover:shadow-lg transition-all ${
                      isEven ? '' : 'md:mt-8'
                    }`}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-14 h-14 bg-${mode.color}/10 rounded-xl flex items-center justify-center`}>
                            <Icon className={`h-7 w-7 text-${mode.color}`} />
                          </div>
                          <div>
                            <CardTitle className="text-2xl mb-1">{mode.name}</CardTitle>
                            <CardDescription className="text-base">
                              {mode.description}
                            </CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Link href={mode.href}>
                        <Button className="w-full group">
                          Start Practicing
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="bg-support-lavender/30 py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-background border-2 border-primary/10">
                <CardContent className="p-8 sm:p-10">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">
                    Why Practice Multiple Ways?
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h3 className="font-semibold mb-2 text-foreground">Reinforce Learning</h3>
                      <p className="text-sm text-muted-foreground">
                        Different practice modes engage different parts of your brain, helping you retain information better.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-foreground">Identify Weak Areas</h3>
                      <p className="text-sm text-muted-foreground">
                        Each mode tests different aspects of your understanding, revealing areas that need more attention.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-foreground">Stay Engaged</h3>
                      <p className="text-sm text-muted-foreground">
                        Variety keeps practice sessions interesting and prevents boredom from repetitive studying.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-foreground">Build Confidence</h3>
                      <p className="text-sm text-muted-foreground">
                        Mastering concepts through multiple formats builds stronger confidence for exams.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
    </main>
  );
}
