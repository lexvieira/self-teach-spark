import { useState, useMemo } from "react";
import { MapPin, Calendar, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import travelData from "@/data/recommendations.json";
import travelHero from "@/assets/travel-hero.webp";

interface Place {
  image: string;
  title: string;
  visible: boolean;
  subtitle: string;
  link?: string;
  contact?: string;
  cost?: string;
}

interface Region {
  region: string;
  description: string;
  image?: string;
  data: Place[];
}

interface Country {
  country: string;
  description: string;
  image: string;
  linkreadmore?: string;
  source?: string;
  data: Region[];
}

const Travel = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");

  const countries = useMemo(() => travelData as Country[], []);

  const selectedCountryData = useMemo(() => {
    return countries.find((c) => c.country === selectedCountry);
  }, [selectedCountry, countries]);

  const districts = useMemo(() => {
    if (!selectedCountryData) return [];
    return selectedCountryData.data.map((region) => region.region);
  }, [selectedCountryData]);

  const selectedDistrictData = useMemo(() => {
    if (!selectedCountryData || !selectedDistrict) return null;
    return selectedCountryData.data.find((region) => region.region === selectedDistrict);
  }, [selectedCountryData, selectedDistrict]);

  const handleSearch = () => {
    if (selectedDistrict) {
      const element = document.getElementById("results");
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getImageUrl = (imagePath: string) => {
    if (imagePath.startsWith("http")) return imagePath;
    return `https://travel.ilearnbymyself.com/${imagePath}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="relative h-[70vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${travelHero})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Venturing Beyond Borders: Exploring the World
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-2">
            Welcome, adventurers! 🗺️✨
          </p>
          <p className="text-lg text-white/80 mb-8 max-w-3xl mx-auto">
            Embarking on a journey beyond Brazil, I've traversed diverse destinations,
            propelled by an insatiable passion for exploration.
          </p>

          {/* Search Box */}
          <div className="bg-background/95 backdrop-blur-sm rounded-lg shadow-2xl p-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Select Country
                </label>
                <Select value={selectedCountry} onValueChange={(value) => {
                  setSelectedCountry(value);
                  setSelectedDistrict("");
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.country} value={country.country}>
                        {country.country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  Select District/Village
                </label>
                <Select 
                  value={selectedDistrict} 
                  onValueChange={setSelectedDistrict}
                  disabled={!selectedCountry}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a district" />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map((district) => (
                      <SelectItem key={district} value={district}>
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleSearch}
                disabled={!selectedCountry || !selectedDistrict}
                className="h-10"
                size="lg"
              >
                <Search className="h-4 w-4 mr-2" />
                Explore Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Destinations */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Recommended Destinations</h2>

        <Tabs defaultValue={countries[0]?.country} className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-8">
            {countries.map((country) => (
              <TabsTrigger key={country.country} value={country.country}>
                {country.country}
              </TabsTrigger>
            ))}
          </TabsList>

          {countries.map((country) => (
            <TabsContent key={country.country} value={country.country} className="space-y-8">
              {/* Country Overview */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-4">{country.country}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {country.description}
                  </p>
                  {country.linkreadmore && (
                    <a 
                      href={country.linkreadmore} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Google/Wikipedia →
                    </a>
                  )}
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src={country.image} 
                    alt={country.country}
                    className="w-full h-64 object-cover"
                  />
                </div>
              </div>

              {/* Regions */}
              <div className="space-y-6">
                {country.data.slice(0, 3).map((region) => (
                  <Card key={region.region}>
                    <CardHeader>
                      <CardTitle>{region.region}</CardTitle>
                      <CardDescription>{region.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Search Results */}
      {selectedDistrictData && (
        <section id="results" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-2">{selectedDistrictData.region}</h2>
              <p className="text-lg text-muted-foreground">{selectedDistrictData.description}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedDistrictData.data
                .filter((place) => place.visible)
                .map((place, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video w-full overflow-hidden">
                      <img 
                        src={getImageUrl(place.image)} 
                        alt={place.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">{place.title}</CardTitle>
                      <CardDescription className="line-clamp-3">{place.subtitle}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {place.contact && (
                        <p className="text-sm text-muted-foreground">
                          📞 {place.contact}
                        </p>
                      )}
                      {place.cost && (
                        <p className="text-sm font-semibold text-primary">
                          💰 {place.cost}
                        </p>
                      )}
                      {place.link && (
                        <a 
                          href={place.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-2"
                        >
                          <Button variant="outline" size="sm">
                            View on Map →
                          </Button>
                        </a>
                      )}
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Travel;
