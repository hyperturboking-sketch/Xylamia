export interface University {
  id: string;
  name: string;
  location: string;
  rating: number;
  acceptanceRate: number;
  avgSAT: string;
  avgGPA: string;
  tuition: string;
  programs: string[];
  strengths: string[];
  weaknesses: string[];
  applicationDeadline: string;
  recommendationScore: number; // 0-100 how well it matches user profile
  image: string;
  description: string;
}

export const universities: University[] = [
  {
    id: "1",
    name: "Stanford University",
    location: "Stanford, CA",
    rating: 5,
    acceptanceRate: 3.9,
    avgSAT: "1470-1570",
    avgGPA: "3.9-4.0",
    tuition: "$57,693/year",
    programs: ["Computer Science", "Engineering", "Business", "Medicine"],
    strengths: ["World-class faculty", "Innovation hub", "Strong industry connections"],
    weaknesses: ["Extremely competitive", "High cost of living"],
    applicationDeadline: "January 5, 2027",
    recommendationScore: 95,
    image: "stanford campus architecture",
    description: "A leading research university with exceptional programs in technology and innovation."
  },
  {
    id: "2",
    name: "Massachusetts Institute of Technology",
    location: "Cambridge, MA",
    rating: 5,
    acceptanceRate: 4.0,
    avgSAT: "1510-1580",
    avgGPA: "3.9-4.0",
    tuition: "$57,986/year",
    programs: ["Engineering", "Computer Science", "Physics", "Mathematics"],
    strengths: ["Cutting-edge research", "Strong STEM programs", "Entrepreneurial culture"],
    weaknesses: ["Intense workload", "Limited liberal arts focus"],
    applicationDeadline: "January 1, 2027",
    recommendationScore: 92,
    image: "mit campus building",
    description: "Premier institution for science, technology, and engineering education and research."
  },
  {
    id: "3",
    name: "Harvard University",
    location: "Cambridge, MA",
    rating: 5,
    acceptanceRate: 3.4,
    avgSAT: "1480-1580",
    avgGPA: "3.9-4.0",
    tuition: "$54,269/year",
    programs: ["Law", "Business", "Medicine", "Liberal Arts"],
    strengths: ["Prestigious reputation", "Extensive alumni network", "World-class resources"],
    weaknesses: ["Extremely selective", "High pressure environment"],
    applicationDeadline: "January 1, 2027",
    recommendationScore: 88,
    image: "harvard university campus",
    description: "Oldest institution of higher learning in the US with unparalleled prestige and resources."
  },
  {
    id: "4",
    name: "University of California, Berkeley",
    location: "Berkeley, CA",
    rating: 5,
    acceptanceRate: 11.6,
    avgSAT: "1330-1530",
    avgGPA: "3.8-4.0",
    tuition: "$14,312/year (in-state), $44,066/year (out-of-state)",
    programs: ["Engineering", "Computer Science", "Business", "Environmental Science"],
    strengths: ["Top public university", "Diverse student body", "Research opportunities"],
    weaknesses: ["Large class sizes", "Competitive environment"],
    applicationDeadline: "November 30, 2026",
    recommendationScore: 90,
    image: "uc berkeley campus",
    description: "Leading public research university known for academic excellence and social activism."
  },
  {
    id: "5",
    name: "Carnegie Mellon University",
    location: "Pittsburgh, PA",
    rating: 5,
    acceptanceRate: 11.3,
    avgSAT: "1460-1560",
    avgGPA: "3.8-4.0",
    tuition: "$61,344/year",
    programs: ["Computer Science", "Robotics", "Engineering", "Drama"],
    strengths: ["Top CS program", "Interdisciplinary approach", "Strong industry ties"],
    weaknesses: ["High tuition", "Intense academic pressure"],
    applicationDeadline: "January 3, 2027",
    recommendationScore: 87,
    image: "carnegie mellon university",
    description: "Renowned for computer science, engineering, and performing arts programs."
  },
  {
    id: "6",
    name: "University of Michigan",
    location: "Ann Arbor, MI",
    rating: 4,
    acceptanceRate: 17.7,
    avgSAT: "1340-1530",
    avgGPA: "3.7-4.0",
    tuition: "$17,786/year (in-state), $57,273/year (out-of-state)",
    programs: ["Engineering", "Business", "Medicine", "Law"],
    strengths: ["Strong academics", "School spirit", "Research opportunities"],
    weaknesses: ["Large campus", "Cold winters"],
    applicationDeadline: "February 1, 2027",
    recommendationScore: 85,
    image: "university of michigan campus",
    description: "Top public university offering excellent programs across all disciplines."
  },
  {
    id: "7",
    name: "Georgia Institute of Technology",
    location: "Atlanta, GA",
    rating: 4,
    acceptanceRate: 16.4,
    avgSAT: "1370-1530",
    avgGPA: "3.7-4.0",
    tuition: "$12,852/year (in-state), $33,794/year (out-of-state)",
    programs: ["Engineering", "Computer Science", "Business", "Architecture"],
    strengths: ["Excellent STEM programs", "Affordable tuition", "Industry connections"],
    weaknesses: ["Male-dominated", "Heavy workload"],
    applicationDeadline: "January 4, 2027",
    recommendationScore: 83,
    image: "georgia tech campus",
    description: "Premier technological university with strong engineering and computing programs."
  },
  {
    id: "8",
    name: "University of Texas at Austin",
    location: "Austin, TX",
    rating: 4,
    acceptanceRate: 29.1,
    avgSAT: "1230-1480",
    avgGPA: "3.6-3.9",
    tuition: "$11,698/year (in-state), $40,996/year (out-of-state)",
    programs: ["Business", "Engineering", "Computer Science", "Liberal Arts"],
    strengths: ["Affordable", "Vibrant campus life", "Strong programs"],
    weaknesses: ["Automatic admission constraints", "Large classes"],
    applicationDeadline: "December 1, 2026",
    recommendationScore: 78,
    image: "ut austin campus tower",
    description: "Large public research university in a thriving tech city with diverse academic programs."
  },
  {
    id: "9",
    name: "New York University",
    location: "New York, NY",
    rating: 4,
    acceptanceRate: 12.2,
    avgSAT: "1350-1530",
    avgGPA: "3.6-4.0",
    tuition: "$58,168/year",
    programs: ["Business", "Film", "Arts", "Law"],
    strengths: ["NYC location", "Global network", "Diverse opportunities"],
    weaknesses: ["Expensive", "No traditional campus"],
    applicationDeadline: "January 5, 2027",
    recommendationScore: 80,
    image: "nyu campus new york",
    description: "Urban university in the heart of Manhattan offering diverse programs and global perspective."
  },
  {
    id: "10",
    name: "University of Washington",
    location: "Seattle, WA",
    rating: 4,
    acceptanceRate: 45.4,
    avgSAT: "1220-1470",
    avgGPA: "3.5-3.9",
    tuition: "$12,076/year (in-state), $40,740/year (out-of-state)",
    programs: ["Computer Science", "Medicine", "Engineering", "Environmental Science"],
    strengths: ["Strong research", "Beautiful campus", "Tech industry access"],
    weaknesses: ["Competitive CS admission", "Rainy weather"],
    applicationDeadline: "November 15, 2026",
    recommendationScore: 82,
    image: "university washington seattle",
    description: "Top public research university with excellent STEM programs and access to Seattle's tech scene."
  },
];
