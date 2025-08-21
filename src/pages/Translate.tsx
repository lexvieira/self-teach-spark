import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Play, Rewind, FastForward, Volume2, VolumeX } from "lucide-react";
import { toast } from "sonner";

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
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-hero gradient-text-hero mb-4">
            Language Translator
          </h1>
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
              <Input
                placeholder="Type your text here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                className="text-lg"
              />
              
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
      </div>
    </div>
  );
};

export default Translate;