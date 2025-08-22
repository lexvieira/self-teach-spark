import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Play, Rewind, FastForward, Volume2, VolumeX, Mic, MicOff, Home } from "lucide-react";
import { toast } from "sonner";

// Speech Recognition type declarations
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface Translation {
  language: string;
  lang_code: string;
  translation: string;
  audio: string;
}

interface TranslationResponse {
  language: Record<string, string>;
  translations: Translation[];
}

const AVAILABLE_LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "zh", name: "Chinese" },
  { code: "ar", name: "Arabic" },
  { code: "hi", name: "Hindi" },
];

const PLAYBACK_SPEEDS = [
  { speed: 0.25, label: "0.25x", icon: Rewind },
  { speed: 0.5, label: "0.5x", icon: Rewind },
  { speed: 1, label: "1x", icon: Play },
  { speed: 1.25, label: "1.25x", icon: FastForward },
  { speed: 1.5, label: "1.5x", icon: FastForward },
];

const Translate = () => {
  const [inputText, setInputText] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [detectedLanguage, setDetectedLanguage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});
  const recognitionRef = useRef<any>(null);

  const handleLanguageSelect = (language: string) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(selectedLanguages.filter(lang => lang !== language));
    } else if (selectedLanguages.length < 3) {
      setSelectedLanguages([...selectedLanguages, language]);
    } else {
      toast.error("You can select up to 3 languages for comparison");
    }
  };

  const playAudio = (langCode: string, speed: number) => {
    const audioElement = audioRefs.current[langCode];
    if (audioElement) {
      audioElement.playbackRate = speed;
      audioElement.play().catch(() => {
        toast.error("Failed to play audio");
      });
    }
  };

  const translateText = async () => {
    if (!inputText.trim()) {
      toast.error("Please enter some text to translate");
      return;
    }

    if (selectedLanguages.length === 0) {
      toast.error("Please select at least one language");
      return;
    }

    setIsLoading(true);
    setShowResults(false);

    try {
      const response = await fetch(`https://translate.ilearnbymyself.com/translator?text=${encodeURIComponent(inputText)}`);
      const data: TranslationResponse = await response.json();

      // Filter translations to only include selected languages
      const filteredTranslations = data.translations.filter(translation => 
        selectedLanguages.some(lang => translation.lang_code.startsWith(lang))
      );

      setTranslations(filteredTranslations);
      setDetectedLanguage(Object.values(data.language)[0] || "");
      setShowResults(true);
      setInputText("");
    } catch (error) {
      toast.error("Failed to translate text. Please try again.");
      console.error("Translation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      translateText();
    }
  };

  const toggleSpeechRecognition = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        toast.success("Listening... Speak now!");
      };

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        toast.success("Speech captured successfully!");
      };

      recognitionRef.current.onerror = (event) => {
        toast.error("Speech recognition error: " + event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.start();
    } else {
      toast.error("Speech recognition is not supported in your browser");
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-between items-center mb-4">
            <Button
              variant="outline"
              onClick={() => window.location.href = '/'}
              className="flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Home
            </Button>
            <div></div> {/* Spacer for center alignment */}
            <div></div> {/* Spacer for center alignment */}
          </div>
          <div className="flex items-center justify-center gap-4 mb-4">
            <img 
              src="/lovable-uploads/dcc6f02f-d516-4854-b6f9-0314784a770b.png"
              alt="I Learn by Myself logo"
              className="w-16 h-16 object-contain"
            />
            <h1 className="text-hero gradient-text-hero">
              Language Translator
            </h1>
          </div>
          <p className="text-section text-foreground/80">
            Compare translations across multiple languages
          </p>
        </div>

        {/* Input Section */}
        <Card className="mb-8 shadow-elegant">
          <CardHeader>
            <CardTitle className="text-feature">Enter Text to Translate</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Input
                  placeholder="Type your text here or use the microphone..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="text-lg pr-12"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={toggleSpeechRecognition}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${
                    isListening ? 'text-red-500 animate-pulse' : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-foreground/80">
                  Select languages to compare (max 3):
                </h3>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_LANGUAGES.map((lang) => (
                    <Badge
                      key={lang.code}
                      variant={selectedLanguages.includes(lang.code) ? "default" : "outline"}
                      className="cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => handleLanguageSelect(lang.code)}
                    >
                      {lang.name}
                    </Badge>
                  ))}
                </div>
                {selectedLanguages.length > 0 && (
                  <p className="text-sm text-muted-foreground">
                    Selected: {selectedLanguages.length}/3 languages
                  </p>
                )}
              </div>

              <Button 
                onClick={translateText} 
                disabled={isLoading || !inputText.trim() || selectedLanguages.length === 0}
                className="w-full"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Translating...
                  </>
                ) : (
                  "Translate"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {showResults && (
          <div className="space-y-6">
            {detectedLanguage && (
              <Card className="border-primary/20">
                <CardContent className="pt-6">
                  <p className="text-center text-lg">
                    <span className="font-semibold text-primary">Detected Language:</span>{" "}
                    <span className="font-medium">{detectedLanguage}</span>
                  </p>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {translations.map((translation) => {
                const langCode = translation.lang_code.replace("-", "");
                const hasAudio = translation.audio !== "data:audio/mpeg;base64,No Audio";

                return (
                  <Card key={translation.lang_code} className="shadow-elegant">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center justify-between">
                        <span className="gradient-text-growth">
                          {translation.language} ({translation.lang_code})
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-body italic font-medium">
                        {translation.translation}
                      </p>

                      {hasAudio ? (
                        <div className="space-y-3">
                          <audio
                            ref={(el) => {
                              if (el) audioRefs.current[langCode] = el;
                            }}
                            controls
                            src={translation.audio}
                            className="w-full"
                          />
                          
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Speed:</span>
                            <div className="flex gap-1">
                              {PLAYBACK_SPEEDS.map(({ speed, label, icon: Icon }) => (
                                <Button
                                  key={speed}
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => playAudio(langCode, speed)}
                                  className="h-8 px-2"
                                >
                                  <Icon className="h-3 w-3 mr-1" />
                                  {label}
                                </Button>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <VolumeX className="h-4 w-4" />
                          <span className="text-sm">No audio available</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Educational Section */}
        <div className="mt-16 space-y-8">
          <Card className="shadow-elegant border-growth/20 bg-gradient-to-br from-background to-growth/5">
            <CardHeader className="text-center">
              <CardTitle className="text-feature gradient-text-growth">
                🚀 Learn with Free Technology Tools
              </CardTitle>
              <p className="text-body text-foreground/80 mt-4">
                Discover how to use your keyboard, browser, and free online tools to master English and other languages. 
                No expensive software needed - just creativity and the power of free technology!
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Key Learning Points */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                    💡 What You Can Learn:
                  </h3>
                  <ul className="space-y-2 text-sm text-foreground/80">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-growth"></span>
                      Use Google Translate and similar tools effectively
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-growth"></span>
                      Practice pronunciation with text-to-speech
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-growth"></span>
                      Build your own translation projects
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-growth"></span>
                      Learn programming while learning languages
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                    🛠️ Free Tools to Use:
                  </h3>
                  <ul className="space-y-2 text-sm text-foreground/80">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-wisdom"></span>
                      Google Colab (free coding environment)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-wisdom"></span>
                      GitHub (version control & collaboration)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-wisdom"></span>
                      Web Speech API (browser speech recognition)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-wisdom"></span>
                      Translation APIs (connect real services)
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <a 
                  href="https://colab.research.google.com/github/lexvieira/MultiTranslator_WithSpeak/blob/main/MultiTranslator_WithSpeak.ipynb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <img 
                    src="/colab-badge.svg" 
                    alt="Open In Colab" 
                    className="h-8 hover:scale-105 transition-transform"
                  />
                </a>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 hover:bg-growth/10"
                  onClick={() => window.open('https://github.com/lexvieira/MultiTranslator_WithSpeak', '_blank')}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Original Project
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 hover:bg-wisdom/10"
                  onClick={() => window.open('https://github.com/lexvieira/self-teach-spark', '_blank')}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Self-Teach Spark
                </Button>
              </div>

              {/* Call to Action */}
              <div className="bg-muted/30 rounded-lg p-6 border border-primary/10">
                <h4 className="text-lg font-semibold text-primary mb-3">
                  🎯 Ready to Start Your Learning Journey?
                </h4>
                <p className="text-sm text-foreground/80 mb-4">
                  Join thousands of learners who use free technology tools to master languages and programming. 
                  Start with the Colab notebook above, explore the GitHub repositories, and create your own projects!
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-growth/20 text-growth-foreground">
                    #FreeTools
                  </Badge>
                  <Badge variant="secondary" className="bg-wisdom/20 text-wisdom-foreground">
                    #LanguageLearning
                  </Badge>
                  <Badge variant="secondary" className="bg-earth/20 text-earth-foreground">
                    #Programming
                  </Badge>
                  <Badge variant="secondary" className="bg-energy/20 text-energy-foreground">
                    #SelfTaught
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Translate;