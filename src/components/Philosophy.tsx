import diverseLearningImage from "@/assets/diverse-learning.jpg";

export function Philosophy() {
  return (
    <section className="py-20 bg-gradient-to-br from-secondary/10 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <img 
              src={diverseLearningImage} 
              alt="Diverse people learning different skills - coding, music, languages, and reading" 
              className="w-full h-auto rounded-2xl shadow-learning"
            />
            <div className="absolute inset-0 bg-gradient-growth opacity-10 rounded-2xl" />
          </div>
          
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-section gradient-text-growth">
                The Learning Tree Philosophy
              </h2>
              <div className="w-20 h-1 bg-gradient-growth rounded-full" />
            </div>
            
            <div className="space-y-6 text-body-large text-muted-foreground leading-relaxed">
              <p>
                Just like a tree grows from a small seed into a magnificent oak, 
                every learning journey begins with curiosity and a willingness to explore.
              </p>
              
              <p>
                We believe that <span className="font-semibold text-primary">everyone has unlimited potential</span> to 
                master new skills, discover passions, and create solutions. Whether you want to learn a new language, 
                build an app, play music, or solve complex problems—the path starts with taking that first step.
              </p>
              
              <p>
                Our mission is to provide <span className="font-semibold text-growth">free, accessible tools</span> that 
                empower your self-directed learning journey. We start with language learning and translation tools, 
                but this is just the beginning of what your learning tree can become.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="text-center p-4 rounded-lg bg-card/50 border border-border/30">
                <div className="text-2xl mb-2">🌱</div>
                <div className="font-semibold text-primary">Start Small</div>
                <div className="text-sm text-muted-foreground">Every expert was once a beginner</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-card/50 border border-border/30">
                <div className="text-2xl mb-2">🚀</div>
                <div className="font-semibold text-primary">Grow Big</div>
                <div className="text-sm text-muted-foreground">Your imagination is the limit</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}