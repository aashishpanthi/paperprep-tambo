export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © 2026 PaperPrep. Transforming exam preparation.
          </div>
          <div className="flex space-x-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              About
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Contact
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
