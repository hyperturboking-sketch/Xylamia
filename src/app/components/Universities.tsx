import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { UniversityCard } from "./UniversityCard";
import { universities, type University } from "../data/universities";
import { Search, Filter, SlidersHorizontal, Star } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Slider } from "./ui/slider";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";
import { CheckCircle2, AlertCircle } from "lucide-react";

export function Universities() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("match");
  const [filterRating, setFilterRating] = useState<number>(0);
  const [maxAcceptanceRate, setMaxAcceptanceRate] = useState<number[]>([100]);
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort universities
  let filteredUniversities = universities.filter((uni) => {
    const matchesSearch = 
      uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.programs.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesRating = filterRating === 0 || uni.rating >= filterRating;
    const matchesAcceptance = uni.acceptanceRate <= maxAcceptanceRate[0];

    return matchesSearch && matchesRating && matchesAcceptance;
  });

  // Sort universities
  if (sortBy === "match") {
    filteredUniversities.sort((a, b) => b.recommendationScore - a.recommendationScore);
  } else if (sortBy === "rating") {
    filteredUniversities.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "acceptance") {
    filteredUniversities.sort((a, b) => b.acceptanceRate - a.acceptanceRate);
  } else if (sortBy === "name") {
    filteredUniversities.sort((a, b) => a.name.localeCompare(b.name));
  }

  const resetFilters = () => {
    setFilterRating(0);
    setMaxAcceptanceRate([100]);
    setSearchQuery("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold mb-2">Explore Universities</h2>
        <p className="text-muted-foreground">
          Browse and compare universities tailored to your profile
        </p>
      </div>

      {/* Search and Filter Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, location, or program..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="match">Best Match</SelectItem>
                  <SelectItem value="rating">Highest Rating</SelectItem>
                  <SelectItem value="acceptance">Acceptance Rate</SelectItem>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <SlidersHorizontal className="size-4" />
                Filters
                {(filterRating > 0 || maxAcceptanceRate[0] < 100) && (
                  <Badge variant="secondary" className="ml-1">
                    {(filterRating > 0 ? 1 : 0) + (maxAcceptanceRate[0] < 100 ? 1 : 0)}
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Minimum Rating</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[filterRating]}
                      onValueChange={(value) => setFilterRating(value[0])}
                      max={5}
                      step={1}
                      className="flex-1"
                    />
                    <div className="flex items-center gap-1 w-20">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`size-3 ${
                            i < filterRating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Maximum Acceptance Rate: {maxAcceptanceRate[0]}%</Label>
                  <Slider
                    value={maxAcceptanceRate}
                    onValueChange={setMaxAcceptanceRate}
                    max={100}
                    step={5}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            Found {filteredUniversities.length} {filteredUniversities.length === 1 ? 'university' : 'universities'}
          </p>
        </div>

        {filteredUniversities.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Filter className="size-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold mb-2">No universities found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Try adjusting your search or filters
              </p>
              <Button onClick={resetFilters}>Clear Filters</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUniversities.map((university) => (
              <UniversityCard
                key={university.id}
                university={university}
                onViewDetails={() => setSelectedUniversity(university)}
              />
            ))}
          </div>
        )}
      </div>

      {/* University Details Dialog */}
      <Dialog open={!!selectedUniversity} onOpenChange={() => setSelectedUniversity(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedUniversity && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedUniversity.name}</DialogTitle>
                <DialogDescription>{selectedUniversity.location}</DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="requirements">Requirements</TabsTrigger>
                  <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Description</h4>
                    <p className="text-sm text-muted-foreground">{selectedUniversity.description}</p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Top Programs</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedUniversity.programs.map((program) => (
                        <Badge key={program} variant="secondary">{program}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Acceptance Rate</h4>
                      <p className="text-2xl font-semibold">{selectedUniversity.acceptanceRate}%</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Tuition</h4>
                      <p className="text-sm">{selectedUniversity.tuition}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="requirements" className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Average SAT Score</h4>
                    <p className="text-lg">{selectedUniversity.avgSAT}</p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Average GPA</h4>
                    <p className="text-lg">{selectedUniversity.avgGPA}</p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Application Deadline</h4>
                    <p className="text-lg">{selectedUniversity.applicationDeadline}</p>
                  </div>
                </TabsContent>

                <TabsContent value="analysis" className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Match Score</h4>
                    <div className="flex items-center gap-4">
                      <Progress value={selectedUniversity.recommendationScore} className="flex-1" />
                      <span className="font-semibold">{selectedUniversity.recommendationScore}%</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-green-500" />
                      Strengths
                    </h4>
                    <ul className="space-y-1">
                      {selectedUniversity.strengths.map((strength) => (
                        <li key={strength} className="text-sm text-muted-foreground">• {strength}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <AlertCircle className="size-4 text-yellow-500" />
                      Considerations
                    </h4>
                    <ul className="space-y-1">
                      {selectedUniversity.weaknesses.map((weakness) => (
                        <li key={weakness} className="text-sm text-muted-foreground">• {weakness}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-primary/5 rounded-lg border">
                    <p className="text-sm">
                      <strong>AI Recommendation:</strong> Based on your profile, {selectedUniversity.name} is a{" "}
                      {selectedUniversity.recommendationScore >= 85 ? "strong" : "good"} match. 
                      {selectedUniversity.recommendationScore >= 90 
                        ? " This should be one of your top choices!" 
                        : " Consider applying as part of a balanced college list."}
                    </p>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex gap-2">
                <Button className="flex-1">Add to My List</Button>
                <Button variant="outline" className="flex-1">Share</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
