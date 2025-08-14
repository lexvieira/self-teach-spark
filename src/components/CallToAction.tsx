import { HeroButton } from "./ui/hero-button";

export function CallToAction() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-growth/5 to-accent/5 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(120,255,120,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(60,160,255,0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <h2 className="text-section gradient-text-hero">
            Ready to Plant Your Learning Tree?
          </h2>
          
          <p className="text-body-large text-muted-foreground leading-relaxed">
            Every expert was once a beginner. Every tree was once a seed. 
            Your learning journey is unique, and it starts with a single step forward.
          </p>
          
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <HeroButton 
                variant="primary" 
                size="lg"
                onClick={() => window.open('https://translate.ilearnbymyself.com/', '_blank')}
              >
                Try Our Translator
              </HeroButton>
              <HeroButton 
                variant="wisdom" 
                size="lg"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Explore More Tools
              </HeroButton>
            </div>
            
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Join our growing community of self-directed learners
              </p>
              <div className="flex justify-center items-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-growth rounded-full animate-pulse"></span>
                  Always Free
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-knowledge rounded-full animate-pulse"></span>
                  No Barriers
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-wisdom rounded-full animate-pulse"></span>
                  Unlimited Growth
                </div>
              </div>
            </div>
          </div>
          
          {/* Visual tree representation */}
          <div className="pt-12">
            <div className="inline-flex items-end gap-1 text-4xl">
              <span className="tree-branch text-earth">🌳</span>
              <span className="tree-branch text-growth animate-pulse">🌿</span>
              <span className="tree-branch text-inspiration">✨</span>
              <span className="tree-branch text-knowledge">📚</span>
              <span className="tree-branch text-wisdom animate-pulse">🎓</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Your learning tree grows with every new skill
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}