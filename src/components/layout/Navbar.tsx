import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary">PaperPrep</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/subjects">
              <Button variant="ghost" size="sm">
                Subjects
              </Button>
            </Link>
            <Link href="/subjects">
              <Button size="sm">Start Practicing</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
