import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
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
      href: `/subjects/${subjectId}/practice/mcq`,
      color: "primary",
    },
    {
      id: "flashcards",
      name: "Flashcards",
      description: "Flip through questions and answers to reinforce your learning",
      icon: BookOpen,
      href: `/subjects/${subjectId}/practice/flashcards`,
      color: "support-teal",
    },
    {
      id: "fill-blanks",
      name: "Fill in the Blanks",
      description: "Practice recall by filling missing information",
      icon: PenTool,
      href: `/subjects/${subjectId}/practice/fill-blanks`,
      color: "support-yellow",
    },
    {
      id: "chat",
      name: "AI Chat Tutor",
      description: "Get personalized explanations and practice with AI tutoring",
      icon: MessageSquare,
      href: `/subjects/${subjectId}/practice/chat`,
      color: "support-lavender",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
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
                  <Link key={mode.id} href={mode.href}>
                    <Card 
                      className={`bg-background border-2 hover:border-primary/40 hover:shadow-lg transition-all cursor-pointer h-full ${
                        isEven ? '' : 'sm:mt-8'
                      }`}
                    >
                      <CardHeader>
                        <div className="flex items-start space-x-4 mb-4">
                          <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                            mode.color === 'primary' ? 'bg-primary/10' :
                            mode.color === 'support-teal' ? 'bg-support-teal/30' :
                            mode.color === 'support-yellow' ? 'bg-support-yellow/30' :
                            'bg-support-lavender/30'
                          }`}>
                            <Icon className={`h-7 w-7 ${
                              mode.color === 'primary' ? 'text-primary' :
                              mode.color === 'support-teal' ? 'text-primary' :
                              mode.color === 'support-yellow' ? 'text-primary' :
                              'text-primary'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-xl sm:text-2xl mb-2">
                              {mode.name}
                            </CardTitle>
                            <CardDescription className="text-sm sm:text-base leading-relaxed">
                              {mode.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Button className="w-full group">
                          Start Practicing
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="bg-support-lavender py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-background border-2">
                <CardContent className="p-8 sm:p-10">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">
                    Why Multiple Practice Modes?
                  </h2>
                  <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                    Different learning styles require different approaches. Our multiple practice modes ensure you can find the method that works best for you, whether you prefer structured testing, visual learning, or conversational practice.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h3 className="font-semibold mb-1 text-foreground">MCQs</h3>
                        <p className="text-sm text-muted-foreground">Test understanding with instant feedback</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h3 className="font-semibold mb-1 text-foreground">Flashcards</h3>
                        <p className="text-sm text-muted-foreground">Reinforce memory through repetition</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h3 className="font-semibold mb-1 text-foreground">Fill in the Blanks</h3>
                        <p className="text-sm text-muted-foreground">Practice active recall</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h3 className="font-semibold mb-1 text-foreground">AI Chat</h3>
                        <p className="text-sm text-muted-foreground">Get personalized explanations</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
