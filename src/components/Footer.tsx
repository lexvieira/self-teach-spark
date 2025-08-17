export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/dcc6f02f-d516-4854-b6f9-0314784a770b.png"
                alt="I Learn by Myself logo"
                className="w-12 h-12 object-contain"
              />
              <h3 className="text-feature font-bold gradient-text-growth">
                I Learn by Myself
              </h3>
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Empowering self-directed learners with free tools and resources. 
              Your learning tree grows as far as your imagination allows.
            </p>
          </div>
          
          {/* Tools */}
          <div className="space-y-4">
            <h4 className="font-semibold text-primary-foreground">Learning Tools</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <a 
                  href="https://translate.ilearnbymyself.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary-glow transition-colors"
                >
                  Language Translator
                </a>
              </li>
              <li>
                <span className="text-primary-foreground/60">Language Learning Apps</span>
              </li>
              <li>
                <span className="text-primary-foreground/60">More tools coming soon...</span>
              </li>
            </ul>
          </div>
          
          {/* Philosophy */}
          <div className="space-y-4">
            <h4 className="font-semibold text-primary-foreground">Our Philosophy</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>🌱 Everyone can learn anything</li>
              <li>🚀 Start small, grow big</li>
              <li>💡 Imagination is the limit</li>
              <li>🤝 Learning is always free</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm text-primary-foreground/60">
            © 2024 I Learn by Myself. Nurturing self-directed learning, one branch at a time.
          </p>
        </div>
      </div>
    </footer>
  );
}