import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProgressIndicator } from "@/components/practice/ProgressIndicator";
import { subjects, getQuestionsBySubject, getQuestionsByChapter } from "@/data/questions";
import { BookOpen, Calculator, Atom, FlaskConical, ArrowRight, PlayCircle, BookMarked, Code, HardDrive, Network, Languages } from "lucide-react";

const subjectIcons = {
  physics: Atom,
  chemistry: FlaskConical,
  biology: BookOpen,
  mathematics: Calculator,
  "visual-programming": Code,
  "operating-system": HardDrive,
  "computer-network": Network,
  english: Languages,
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
              <ProgressIndicator current={progress} total={100} />
            </div>
          </div>
        </section>

        {/* Chapters Section - White Background */}
        {subject.chapters && subject.chapters.length > 0 && (
          <section className="bg-background py-12 sm:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-foreground">
                    Chapters
                  </h2>
                  <p className="text-muted-foreground">
                    Practice specific chapters or the entire curriculum
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {subject.chapters.map((chapter) => {
                    const chapterQuestions = getQuestionsByChapter(subjectId, chapter);
                    return (
                      <Card key={chapter} className="hover:border-primary/40 hover:shadow-lg transition-all">
                        <CardHeader>
                          <CardTitle className="text-xl">{chapter}</CardTitle>
                          <CardDescription>
                            {chapterQuestions.length} questions
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Link href={`/${subjectId}/practice?chapter=${encodeURIComponent(chapter)}`}>
                            <Button variant="outline" className="w-full group">
                              Practice Chapter
                              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    );
                  })}
                  
                  {/* Practice Entire Curriculum Card */}
                  <Card className="hover:border-primary/40 hover:shadow-lg transition-all border-2 border-primary/20 bg-primary/5">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <PlayCircle className="h-5 w-5 text-primary" />
                        Entire Curriculum
                      </CardTitle>
                      <CardDescription>
                        Practice all chapters together
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link href={`/${subjectId}/practice`}>
                        <Button className="w-full group">
                          Practice All
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Practice Modes Section - Colored Background */}
        <section className="bg-support-lavender/30 py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-foreground">
                  Practice Modes
                </h2>
                <p className="text-muted-foreground">
                  Choose how you want to practice {subject.name}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card className="hover:border-primary/40 hover:shadow-lg transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookMarked className="h-5 w-5 text-primary" />
                      MCQ Practice
                    </CardTitle>
                    <CardDescription>
                      Test your knowledge with multiple choice questions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href={`/${subjectId}/practice/mcq`}>
                      <Button variant="outline" className="w-full">
                        Start MCQ Practice
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
                <Card className="hover:border-primary/40 hover:shadow-lg transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      Flashcards
                    </CardTitle>
                    <CardDescription>
                      Review concepts with interactive flashcards
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href={`/${subjectId}/practice/flashcards`}>
                      <Button variant="outline" className="w-full">
                        Start Flashcards
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats Section - White Background */}
        <section className="bg-background py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
  );
}
