import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { subjects } from "@/data/questions";
import { BookOpen, Calculator, Atom, FlaskConical, ArrowRight } from "lucide-react";

const subjectIcons = {
  physics: Atom,
  chemistry: FlaskConical,
  biology: BookOpen,
  mathematics: Calculator,
};

export default function SubjectsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Header Section - White Background */}
        <section className="bg-background py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
                Choose Your Subject
              </h1>
              <p className="text-lg text-muted-foreground">
                Select a subject to start practicing with interactive questions and AI-powered tutoring
              </p>
            </div>
          </div>
        </section>

        {/* Subjects Grid - Teal Background */}
        <section className="bg-support-teal py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 max-w-5xl mx-auto">
              {subjects.map((subject, index) => {
                const Icon = subjectIcons[subject.id as keyof typeof subjectIcons] || BookOpen;
                const isEven = index % 2 === 0;
                
                return (
                  <Card 
                    key={subject.id} 
                    className={`bg-background border-2 hover:border-primary/40 hover:shadow-lg transition-all ${
                      isEven ? '' : 'md:mt-8'
                    }`}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                            <Icon className="h-7 w-7 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-2xl mb-1">{subject.name}</CardTitle>
                            <CardDescription className="text-base">
                              {subject.description}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge variant="secondary" className="ml-auto">
                          {subject.questionCount} questions
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {subject.chapters && subject.chapters.length > 0 && (
                        <div className="mb-6">
                          <p className="text-sm font-semibold mb-3 text-foreground">Chapters:</p>
                          <div className="flex flex-wrap gap-2">
                            {subject.chapters.slice(0, 4).map((chapter) => (
                              <Badge key={chapter} variant="outline" className="text-xs">
                                {chapter}
                              </Badge>
                            ))}
                            {subject.chapters.length > 4 && (
                              <Badge variant="outline" className="text-xs">
                                +{subject.chapters.length - 4} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                      <Link href={`/subjects/${subject.id}`}>
                        <Button className="w-full group">
                          Start Practice
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

        {/* Info Section - White Background */}
        <section className="bg-background py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-support-lavender/30 border-2 border-primary/10">
                <CardContent className="p-8 sm:p-10">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">
                    Why Choose PaperPrep?
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h3 className="font-semibold mb-2 text-foreground">Interactive Learning</h3>
                      <p className="text-sm text-muted-foreground">
                        Move beyond passive reading with hands-on practice modes designed to reinforce understanding.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-foreground">Instant Feedback</h3>
                      <p className="text-sm text-muted-foreground">
                        Get immediate explanations for every answer, helping you learn from mistakes in real-time.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-foreground">AI-Powered Support</h3>
                      <p className="text-sm text-muted-foreground">
                        Chat with our AI tutor for personalized explanations and practice questions tailored to your needs.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-foreground">Multiple Formats</h3>
                      <p className="text-sm text-muted-foreground">
                        Practice with MCQs, flashcards, fill-in-the-blanks, or conversational learning—choose what works for you.
                      </p>
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
