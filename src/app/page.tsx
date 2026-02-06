import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { BookOpen, FileQuestion, MessageSquare, PenTool, CheckCircle2, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section - White Background */}
        <section className="bg-background py-16 sm:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 text-foreground">
                Prepare Smarter. Not Harder.
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
                Transform your exam preparation from static PDFs into interactive
                learning experiences. Practice with MCQs, flashcards, fill-in-the-blanks,
                and AI-powered chat tutoring.
              </p>
              <Link href="/subjects">
                <Button size="lg" className="text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7">
                  Start Practicing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section - Teal Background */}
        <section className="bg-support-teal py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">4</div>
                <div className="text-sm sm:text-base text-muted-foreground">Subjects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">20+</div>
                <div className="text-sm sm:text-base text-muted-foreground">Questions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">4</div>
                <div className="text-sm sm:text-base text-muted-foreground">Practice Modes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm sm:text-base text-muted-foreground">Interactive</div>
              </div>
            </div>
          </div>
        </section>

        {/* Transformation Section - White Background with Boxed Content */}
        <section className="bg-background py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
                From PDFs to Interactive Practice
              </h2>
              <p className="text-lg text-muted-foreground">
                Experience the difference between passive reading and active learning
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 max-w-5xl mx-auto">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl mb-2">Before</CardTitle>
                  <CardDescription className="text-base">
                    Static PDF documents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-base text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Passive reading</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>No instant feedback</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Limited engagement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Difficult to track progress</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-2xl mb-2 text-primary">After</CardTitle>
                  <CardDescription className="text-base">
                    Interactive learning platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-base text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Active practice modes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Instant feedback & explanations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Multiple learning formats</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>AI-powered tutoring</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Practice Modes Section - Lavender Background */}
        <section className="bg-support-lavender py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
                Practice Modes
              </h2>
              <p className="text-lg text-muted-foreground">
                Choose the learning style that works best for you
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
              <Card className="bg-background border-2 hover:border-primary/30 transition-all">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <FileQuestion className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl mb-2">MCQs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Test your knowledge with multiple choice questions and get instant feedback.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background border-2 hover:border-primary/30 transition-all">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl mb-2">Flashcards</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Flip through questions and answers to reinforce your learning.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background border-2 hover:border-primary/30 transition-all">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <PenTool className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl mb-2">Fill in the Blanks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Practice recall by filling in missing information.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background border-2 hover:border-primary/30 transition-all">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl mb-2">AI Chat</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Get personalized explanations and practice with AI tutoring.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section - Yellow Background */}
        <section className="bg-support-yellow py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
                Ready to Start Learning?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of students preparing for their exams with PaperPrep
              </p>
              <Link href="/subjects">
                <Button size="lg" className="text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7">
                  Browse Subjects
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
