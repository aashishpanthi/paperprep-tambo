import { SubjectNetwork } from "@/components/home/SubjectNetwork";

export default function Home() {
  return (
    <main className="flex-1">
        {/* Hero Section */}
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
            </div>
          </div>
        </section>

        {/* Subject Network Section with Path Animation */}
        <section className="bg-support-teal py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
                  Explore Subjects
                </h2>
                <p className="text-lg text-muted-foreground">
                  Scroll to see the car follow the path and highlight subjects
                </p>
              </div>
              
              <SubjectNetwork />
            </div>
          </div>
        </section>

        {/* Spacer for scroll */}
        <section className="bg-background py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-muted-foreground">
                Continue scrolling to see more
              </p>
            </div>
          </div>
        </section>
    </main>
  );
}
