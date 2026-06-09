import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { 
  User, 
  GraduationCap, 
  Award, 
  Target, 
  BookOpen,
  Briefcase,
  Plus,
  X,
  Save,
  TrendingUp
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function Profile() {
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    grade: "12",
    gpa: "3.8",
    satScore: "1420",
    actScore: "32",
    intendedMajor: "Computer Science",
    location: "California, USA",
    interests: ["Technology", "Mathematics", "Robotics"],
    extracurriculars: [
      { id: 1, activity: "Robotics Club", role: "President", years: "3" },
      { id: 2, activity: "Math Olympiad", role: "Team Member", years: "2" },
      { id: 3, activity: "Volunteer Tutor", role: "Volunteer", years: "2" },
    ],
  });

  const [newInterest, setNewInterest] = useState("");
  const [editMode, setEditMode] = useState(false);

  const handleAddInterest = () => {
    if (newInterest.trim()) {
      setProfile({
        ...profile,
        interests: [...profile.interests, newInterest.trim()],
      });
      setNewInterest("");
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setProfile({
      ...profile,
      interests: profile.interests.filter((i) => i !== interest),
    });
  };

  const calculateProfileCompletion = () => {
    let completed = 0;
    const total = 10;

    if (profile.name) completed++;
    if (profile.email) completed++;
    if (profile.grade) completed++;
    if (profile.gpa) completed++;
    if (profile.satScore || profile.actScore) completed++;
    if (profile.intendedMajor) completed++;
    if (profile.location) completed++;
    if (profile.interests.length > 0) completed++;
    if (profile.extracurriculars.length > 0) completed++;
    completed++; // Basic info section

    return Math.round((completed / total) * 100);
  };

  const profileCompletion = calculateProfileCompletion();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-semibold mb-2">My Profile</h2>
        <p className="text-muted-foreground">
          Keep your profile updated to get the best university recommendations
        </p>
      </div>

      {/* Profile Completion */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Profile Completion</CardTitle>
              <CardDescription>
                Complete your profile to get better recommendations
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-semibold">{profileCompletion}%</div>
              <div className="text-xs text-muted-foreground">Complete</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={profileCompletion} className="h-2" />
        </CardContent>
      </Card>

      {/* Main Profile Content */}
      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        {/* Basic Information */}
        <TabsContent value="basic">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="size-5" />
                Basic Information
              </CardTitle>
              <CardDescription>Your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    disabled={!editMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    disabled={!editMode}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="grade">Current Grade</Label>
                  <Select
                    value={profile.grade}
                    onValueChange={(value) => setProfile({ ...profile, grade: value })}
                    disabled={!editMode}
                  >
                    <SelectTrigger id="grade">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9">9th Grade (Freshman)</SelectItem>
                      <SelectItem value="10">10th Grade (Sophomore)</SelectItem>
                      <SelectItem value="11">11th Grade (Junior)</SelectItem>
                      <SelectItem value="12">12th Grade (Senior)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    disabled={!editMode}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                {editMode ? (
                  <>
                    <Button onClick={() => setEditMode(false)} className="gap-2">
                      <Save className="size-4" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => setEditMode(false)}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setEditMode(true)}>Edit Profile</Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Academic Information */}
        <TabsContent value="academic">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="size-5" />
                Academic Performance
              </CardTitle>
              <CardDescription>Your academic achievements and test scores</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gpa">GPA (Unweighted)</Label>
                  <Input
                    id="gpa"
                    value={profile.gpa}
                    onChange={(e) => setProfile({ ...profile, gpa: e.target.value })}
                    placeholder="3.8"
                  />
                  <p className="text-xs text-muted-foreground">Out of 4.0</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sat">SAT Score</Label>
                  <Input
                    id="sat"
                    value={profile.satScore}
                    onChange={(e) => setProfile({ ...profile, satScore: e.target.value })}
                    placeholder="1420"
                  />
                  <p className="text-xs text-muted-foreground">Out of 1600</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="act">ACT Score</Label>
                  <Input
                    id="act"
                    value={profile.actScore}
                    onChange={(e) => setProfile({ ...profile, actScore: e.target.value })}
                    placeholder="32"
                  />
                  <p className="text-xs text-muted-foreground">Out of 36</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="major">Intended Major</Label>
                <Select
                  value={profile.intendedMajor}
                  onValueChange={(value) => setProfile({ ...profile, intendedMajor: value })}
                >
                  <SelectTrigger id="major">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Medicine">Medicine</SelectItem>
                    <SelectItem value="Law">Law</SelectItem>
                    <SelectItem value="Liberal Arts">Liberal Arts</SelectItem>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Physics">Physics</SelectItem>
                    <SelectItem value="Biology">Biology</SelectItem>
                    <SelectItem value="Undecided">Undecided</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Academic Insights */}
              <div className="p-4 bg-primary/5 rounded-lg border space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <TrendingUp className="size-4" />
                  Academic Insights
                </h4>
                <div className="space-y-2 text-sm">
                  <p>
                    • Your GPA of <strong>{profile.gpa}</strong> is competitive for most top universities
                  </p>
                  <p>
                    • Your SAT score of <strong>{profile.satScore}</strong> is above the national average
                  </p>
                  <p>
                    • Consider taking SAT Subject Tests related to {profile.intendedMajor}
                  </p>
                </div>
              </div>

              <Button className="gap-2">
                <Save className="size-4" />
                Save Academic Info
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activities */}
        <TabsContent value="activities">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="size-5" />
                  Extracurricular Activities
                </CardTitle>
                <CardDescription>Showcase your involvement outside the classroom</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.extracurriculars.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium">{activity.activity}</h4>
                      <p className="text-sm text-muted-foreground">
                        {activity.role} • {activity.years} years
                      </p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <X className="size-4" />
                    </Button>
                  </div>
                ))}

                <Button variant="outline" className="w-full gap-2">
                  <Plus className="size-4" />
                  Add Activity
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="size-5" />
                  Interests & Passions
                </CardTitle>
                <CardDescription>What are you passionate about?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest) => (
                    <Badge key={interest} variant="secondary" className="gap-1 pr-1">
                      {interest}
                      <button
                        onClick={() => handleRemoveInterest(interest)}
                        className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
                      >
                        <X className="size-3" />
                      </button>
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input
                    placeholder="Add an interest"
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddInterest()}
                  />
                  <Button onClick={handleAddInterest} size="icon">
                    <Plus className="size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Preferences */}
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="size-5" />
                College Preferences
              </CardTitle>
              <CardDescription>Help us recommend the right universities for you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Preferred Location</Label>
                <Select defaultValue="any">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Location</SelectItem>
                    <SelectItem value="west">West Coast</SelectItem>
                    <SelectItem value="east">East Coast</SelectItem>
                    <SelectItem value="midwest">Midwest</SelectItem>
                    <SelectItem value="south">South</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>School Size Preference</Label>
                <Select defaultValue="any">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Size</SelectItem>
                    <SelectItem value="small">Small (&lt;5,000)</SelectItem>
                    <SelectItem value="medium">Medium (5,000-15,000)</SelectItem>
                    <SelectItem value="large">Large (15,000+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>School Type</Label>
                <Select defaultValue="any">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Type</SelectItem>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="liberal-arts">Liberal Arts</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Maximum Budget (Annual)</Label>
                <Select defaultValue="50k+">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="20k">Under $20,000</SelectItem>
                    <SelectItem value="30k">Under $30,000</SelectItem>
                    <SelectItem value="40k">Under $40,000</SelectItem>
                    <SelectItem value="50k">Under $50,000</SelectItem>
                    <SelectItem value="50k+">No Limit</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="gap-2">
                <Save className="size-4" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
