import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProgressIndicator } from "@/components/practice/ProgressIndicator";
import { subjects, getQuestionsBySubject } from "@/data/questions";
import { BookOpen, Calculator, Atom, FlaskConical, ArrowRight, PlayCircle } from "lucide-react";

const subjectIcons = {
  physics: Atom,
  chemistry: FlaskConical,
  biology: BookOpen,
  mathematics: Calculator,
};

export default async function SubjectPage({
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

  const questions = getQuestionsBySubject(subjectId);
  const progress = 0; // Mocked for MVP
  const Icon = subjectIcons[subjectId as keyof typeof subjectIcons] || BookOpen;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section - Colored Background */}
        <section className="bg-support-teal py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center">
                  <Icon className="h-9 w-9 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
                    {subject.name}
                  </h1>
                  <p className="text-lg text-muted-foreground mt-2">
                    {subject.description}
                  </p>
                </div>
              </div>
              
              {/* Progress Indicator */}
              <div className="bg-background rounded-xl p-6 border-2">
                <ProgressIndicator current={progress} total={questions.length} />
              </div>
            </div>
          </div>
        </section>

        {/* Chapters Section - White Background */}
        {subject.chapters && subject.chapters.length > 0 && (
          <section className="bg-background py-12 sm:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-foreground">
                  Chapters
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {subject.chapters.map((chapter, index) => {
                    const chapterQuestions = questions.filter((q) => q.chapter === chapter);
                    return (
                      <Card 
                        key={chapter} 
                        className={`border-2 hover:border-primary/40 hover:shadow-md transition-all ${
                          index % 3 === 1 ? 'bg-support-yellow/20' : ''
                        }`}
                      >
                        <CardHeader>
                          <CardTitle className="text-xl">{chapter}</CardTitle>
                          <CardDescription>
                            {chapterQuestions.length} questions available
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Link href={`/subjects/${subjectId}/practice`}>
                            <Button variant="outline" size="sm" className="w-full">
                              <PlayCircle className="mr-2 h-4 w-4" />
                              Practice
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Practice Modes Section - Lavender Background */}
        <section className="bg-support-lavender py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-foreground">
                Choose Your Practice Mode
              </h2>
              <Card className="bg-background border-2">
                <CardContent className="p-8">
                  <p className="text-base text-muted-foreground mb-6 text-center">
                    Select how you want to practice {subject.name}. Each mode offers a different learning experience.
                  </p>
                  <div className="flex justify-center">
                    <Link href={`/subjects/${subjectId}/practice`}>
                      <Button size="lg" className="group">
                        Explore Practice Modes
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Quick Stats - Yellow Background */}
        <section className="bg-support-yellow py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center bg-background rounded-xl p-6 border-2">
                  <div className="text-3xl font-bold text-primary mb-2">{questions.length}</div>
                  <div className="text-sm text-muted-foreground">Total Questions</div>
                </div>
                <div className="text-center bg-background rounded-xl p-6 border-2">
                  <div className="text-3xl font-bold text-primary mb-2">{subject.chapters?.length || 0}</div>
                  <div className="text-sm text-muted-foreground">Chapters</div>
                </div>
                <div className="text-center bg-background rounded-xl p-6 border-2">
                  <div className="text-3xl font-bold text-primary mb-2">4</div>
                  <div className="text-sm text-muted-foreground">Practice Modes</div>
                </div>
                <div className="text-center bg-background rounded-xl p-6 border-2">
                  <div className="text-3xl font-bold text-primary mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">Interactive</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
