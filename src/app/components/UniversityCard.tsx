import { Star, MapPin, TrendingUp, DollarSign, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { University } from "../data/universities";

interface UniversityCardProps {
  university: University;
  onViewDetails?: () => void;
}

const universityImages: Record<string, string> = {
  "1": "https://images.unsplash.com/photo-1687904908300-820df75676a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFuZm9yZCUyMGNhbXB1cyUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3ODEwMjE1NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "2": "https://images.unsplash.com/photo-1658604520420-7569f9685b69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaXQlMjBjYW1wdXMlMjBidWlsZGluZ3xlbnwxfHx8fDE3ODEwMjE1NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "3": "https://images.unsplash.com/photo-1672613784793-91c64990806e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXJ2YXJkJTIwdW5pdmVyc2l0eSUyMGNhbXB1c3xlbnwxfHx8fDE3ODEwMjE1NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "4": "https://images.unsplash.com/photo-1778268406028-84bbdaf02e65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1YyUyMGJlcmtlbGV5JTIwY2FtcHVzfGVufDF8fHx8MTc4MTAyMTU2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
  "5": "https://images.unsplash.com/photo-1598463035674-3ded88d65be2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJuZWdpZSUyMG1lbGxvbiUyMHVuaXZlcnNpdHl8ZW58MXx8fHwxNzgxMDIxNTY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "6": "https://images.unsplash.com/photo-1780104966799-c6d946ad5791?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwb2YlMjBtaWNoaWdhbiUyMGNhbXB1c3xlbnwxfHx8fDE3ODEwMjE1NzF8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "7": "https://images.unsplash.com/photo-1562774053-701939374585?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb2xsZWdlJTIwY2FtcHVzJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzgxMDIxNTc0fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "8": "https://images.unsplash.com/photo-1760960553755-0f355491749e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwYXJjaGl0ZWN0dXJlJTIwY2xvY2slMjB0b3dlcnxlbnwxfHx8fDE3ODEwMjE1NzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "9": "https://images.unsplash.com/photo-1678830031045-5915e39cb79e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXclMjB5b3JrJTIwdW5pdmVyc2l0eSUyMGJ1aWxkaW5nfGVufDF8fHx8MTc4MTAyMTU3NHww&ixlib=rb-4.1.0&q=80&w=1080",
  "10": "https://images.unsplash.com/photo-1502175353174-a7a70e73b362?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwd2FzaGluZ3RvbiUyMHNlYXR0bGV8ZW58MXx8fHwxNzgxMDIxNTcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
};

export function UniversityCard({ university, onViewDetails }: UniversityCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={universityImages[university.id]}
          alt={university.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-background/90 backdrop-blur">
            {Array.from({ length: university.rating }).map((_, i) => (
              <Star key={i} className="size-3 fill-yellow-400 text-yellow-400 inline" />
            ))}
          </Badge>
        </div>
        <div className="absolute top-2 left-2">
          <Badge className="bg-primary/90 backdrop-blur">
            {university.recommendationScore}% Match
          </Badge>
        </div>
      </div>

      <CardHeader>
        <CardTitle>{university.name}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <MapPin className="size-3" />
          {university.location}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {university.description}
        </p>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Match Score</span>
            <span className="font-medium">{university.recommendationScore}%</span>
          </div>
          <Progress value={university.recommendationScore} />
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <TrendingUp className="size-4 text-muted-foreground" />
            <div>
              <div className="text-xs text-muted-foreground">Acceptance</div>
              <div className="font-medium">{university.acceptanceRate}%</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="size-4 text-muted-foreground" />
            <div>
              <div className="text-xs text-muted-foreground">Tuition</div>
              <div className="font-medium text-xs">{university.tuition.split(',')[0]}</div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">Top Programs</div>
          <div className="flex flex-wrap gap-1">
            {university.programs.slice(0, 3).map((program) => (
              <Badge key={program} variant="outline" className="text-xs">
                {program}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="size-4" />
          <span className="text-xs">Deadline: {university.applicationDeadline}</span>
        </div>

        <Button className="w-full" onClick={onViewDetails}>
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
