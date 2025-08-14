import { LearningCard } from "./ui/learning-card";
import { Globe, BookOpen, Code, Music, Wrench, Lightbulb } from "lucide-react";

export function Tools() {
  const currentTools = [
    {
      title: "Language Translator",
      description: "Practice multiple languages with our simple, free translation tool powered by Google API. Perfect for language learners.",
      icon: <Globe className="w-6 h-6" />,
      action: () => window.open('https://translate.ilearnbymyself.com/', '_blank'),
      available: true
    },
    {
      title: "Language Learning Apps",
      description: "Free applications designed to help students learn languages effectively without any cost barriers.",
      icon: <BookOpen className="w-6 h-6" />,
      action: () => {},
      available: true
    }
  ];

  const futureTools = [
    {
      title: "Coding Playground",
      description: "Learn programming languages with interactive coding exercises and real-time feedback.",
      icon: <Code className="w-6 h-6" />,
      available: false
    },
    {
      title: "Music Learning Suite",
      description: "Master musical instruments with guided lessons and practice tools.",
      icon: <Music className="w-6 h-6" />,
      available: false
    },
    {
      title: "DIY Project Guides",
      description: "Learn to fix, build, and create things with step-by-step visual guides.",
      icon: <Wrench className="w-6 h-6" />,
      available: false
    },
    {
      title: "Creative Thinking Tools",
      description: "Develop problem-solving skills and unleash your creative potential.",
      icon: <Lightbulb className="w-6 h-6" />,
      available: false
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-section gradient-text-learning">
            Your Learning Tools
          </h2>
          <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
            Start with our current tools and watch as your learning tree grows with new branches of knowledge.
          </p>
          <div className="w-20 h-1 bg-gradient-learning rounded-full mx-auto" />
        </div>

        {/* Current Tools */}
        <div className="mb-16">
          <h3 className="text-feature font-semibold text-primary mb-8 text-center">
            🌿 Available Now
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {currentTools.map((tool, index) => (
              <LearningCard
                key={index}
                title={tool.title}
                description={tool.description}
                icon={tool.icon}
                onClick={tool.action}
                className="hover:border-growth/50"
              />
            ))}
          </div>
        </div>

        {/* Future Tools */}
        <div>
          <h3 className="text-feature font-semibold text-muted-foreground mb-8 text-center">
            🌳 Growing Soon
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {futureTools.map((tool, index) => (
              <LearningCard
                key={index}
                title={tool.title}
                description={tool.description}
                icon={tool.icon}
                className="opacity-75 hover:opacity-90 hover:border-muted-foreground/30"
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12 p-6 rounded-2xl bg-gradient-to-r from-secondary/50 to-accent/20 border border-border/30">
          <h4 className="text-feature font-semibold text-primary mb-3">
            The Tree Keeps Growing
          </h4>
          <p className="text-muted-foreground">
            These tools represent just the beginning. As our learning community grows, 
            so does our collection of free educational resources. Your feedback and suggestions 
            help determine which branches we grow next.
          </p>
        </div>
      </div>
    </section>
  );
}