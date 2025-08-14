import { HeroButton } from "./ui/hero-button";
import heroImage from "@/assets/learning-tree-hero.jpg";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background/95 to-secondary/20 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_14px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8 animate-grow">
            <div className="space-y-4">
              <h1 className="text-hero gradient-text-hero">
                I Learn by Myself
              </h1>
              <p className="text-section text-foreground/80 font-light">
                Where Your Learning Tree Grows
              </p>
            </div>
            
            <p className="text-body-large text-muted-foreground max-w-2xl leading-relaxed">
              Everybody has the ability to learn anything—languages, coding, music, problem-solving, and so much more. 
              Your learning journey starts with a simple idea and grows as far as your imagination allows.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <HeroButton 
                variant="primary" 
                size="lg"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              >
                Start Your Journey
              </HeroButton>
              <HeroButton 
                variant="outline" 
                size="lg"
                onClick={() => window.open('https://translate.ilearnbymyself.com/', '_blank')}
              >
                Try Our Translator
              </HeroButton>
            </div>
            
            <div className="flex items-center justify-center lg:justify-start gap-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text-growth">∞</div>
                <div className="text-sm text-muted-foreground">Endless Possibilities</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text-learning">🌱</div>
                <div className="text-sm text-muted-foreground">Growth Mindset</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-wisdom">🎯</div>
                <div className="text-sm text-muted-foreground">Self-Directed</div>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative">
            <div className="animate-float">
              <img 
                src={heroImage} 
                alt="Learning tree with books growing from branches, representing the journey of self-directed learning" 
                className="w-full h-auto rounded-2xl shadow-growth"
              />
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-learning rounded-full opacity-20 animate-pulse" />
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-growth rounded-full opacity-30 animate-pulse" />
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}