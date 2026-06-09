import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { UniversityCard } from "./UniversityCard";
import { universities } from "../data/universities";
import { 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  BookOpen,
  Target,
  Calendar,
  MessageSquare
} from "lucide-react";
import { Link } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function Dashboard() {
  const [selectedUniversity, setSelectedUniversity] = useState<typeof universities[0] | null>(null);

  // Get top 3 recommended universities
  const topRecommendations = [...universities]
    .sort((a, b) => b.recommendationScore - a.recommendationScore)
    .slice(0, 3);

  // Mock notifications
  const notifications = [
    {
      id: 1,
      type: "deadline",
      title: "University of Washington",
      message: "Application deadline in 5 days",
      urgent: true,
    },
    {
      id: 2,
      type: "match",
      title: "New Match Found",
      message: "Carnegie Mellon University is a great fit for your profile",
      urgent: false,
    },
    {
      id: 3,
      type: "update",
      title: "Stanford University",
      message: "Updated their Computer Science curriculum",
      urgent: false,
    },
  ];

  // Mock application progress
  const applicationStats = {
    total: 10,
    completed: 3,
    inProgress: 4,
    notStarted: 3,
  };

  const completionPercentage = (applicationStats.completed / applicationStats.total) * 100;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl font-semibold mb-2">Welcome back, Student!</h2>
        <p className="text-muted-foreground">
          Let's get you into your dream university. Here's your personalized dashboard.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <Target className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{applicationStats.total}</div>
            <p className="text-xs text-muted-foreground">
              {applicationStats.completed} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{applicationStats.inProgress}</div>
            <p className="text-xs text-muted-foreground">
              Keep working on them
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <TrendingUp className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{completionPercentage.toFixed(0)}%</div>
            <Progress value={completionPercentage} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
            <Calendar className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">2</div>
            <p className="text-xs text-muted-foreground">
              Within next 7 days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Notifications and Quick Actions */}
        <div className="space-y-6">
          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Important updates and reminders</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  {notification.urgent ? (
                    <AlertCircle className="size-5 text-destructive flex-shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle2 className="size-5 text-primary flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{notification.title}</div>
                    <div className="text-xs text-muted-foreground">{notification.message}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link to="/chat">
                <Button className="w-full justify-start gap-2" variant="outline">
                  <MessageSquare className="size-4" />
                  Ask AI Advisor
                </Button>
              </Link>
              <Link to="/universities">
                <Button className="w-full justify-start gap-2" variant="outline">
                  <BookOpen className="size-4" />
                  Explore Universities
                </Button>
              </Link>
              <Link to="/profile">
                <Button className="w-full justify-start gap-2" variant="outline">
                  <Target className="size-4" />
                  Update Profile
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Recommended Universities */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Universities for You</CardTitle>
              <CardDescription>
                Based on your profile, these universities are great matches
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {topRecommendations.map((university) => (
                  <UniversityCard
                    key={university.id}
                    university={university}
                    onViewDetails={() => setSelectedUniversity(university)}
                  />
                ))}
              </div>
              <div className="mt-4">
                <Link to="/universities">
                  <Button variant="outline" className="w-full">
                    View All Universities
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
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
