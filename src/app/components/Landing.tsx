import { Link } from "react-router";
import { ArrowRight, Bell, GraduationCap, MessageSquare, Star, Target } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const campusImage =
  "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&q=80&w=1600";

export function Landing() {
  return (
    <main className="min-h-screen bg-[#fbfbf8] text-[#151515]">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-md bg-[#151515] text-white">
            <GraduationCap className="size-5" />
          </div>
          <span className="font-semibold tracking-normal">Xylamia</span>
        </Link>

        <nav className="flex items-center gap-2">
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link to="/universities">Explore</Link>
          </Button>
          <Button asChild className="bg-[#151515] text-white hover:bg-[#2a2a2a]">
            <Link to="/dashboard">
              Open App
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </nav>
      </header>

      <section className="mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center gap-10 px-5 pb-8 pt-4 sm:px-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="max-w-2xl space-y-8">
          <div className="space-y-5">
            <Badge variant="outline" className="w-fit border-[#d8d3c3] bg-white/80 text-[#476052]">
              AI admissions advisor
            </Badge>
            <h1 className="max-w-2xl text-5xl font-semibold leading-[1.02] tracking-normal text-[#151515] sm:text-6xl lg:text-7xl">
              Xylamia
            </h1>
            <p className="max-w-xl text-lg leading-8 text-[#55524b]">
              A calm college planning workspace that helps students compare universities,
              understand admissions steps, and choose stronger-fit schools.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-11 bg-[#151515] px-5 text-white hover:bg-[#2a2a2a]">
              <Link to="/dashboard">
                Start Planning
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-11 border-[#d8d3c3] bg-white px-5">
              <Link to="/chat">
                Ask Xylamia
                <MessageSquare className="size-4" />
              </Link>
            </Button>
          </div>

          <div className="grid max-w-xl grid-cols-3 gap-3">
            {[
              { icon: Star, label: "1-5 ratings", tone: "text-[#b88a2b]" },
              { icon: Target, label: "Fit scoring", tone: "text-[#4d6d9a]" },
              { icon: Bell, label: "Deadline alerts", tone: "text-[#7b5f8f]" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-md border border-[#e3ded0] bg-white/80 p-3">
                  <Icon className={`mb-2 size-4 ${item.tone}`} />
                  <p className="text-sm text-[#55524b]">{item.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative min-h-[26rem] overflow-hidden rounded-md border border-[#e3ded0] bg-white shadow-sm lg:min-h-[34rem]">
          <img
            src={campusImage}
            alt="Students walking across a university campus"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-white/90 p-5 backdrop-blur">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-[#6b675f]">Top match</p>
                <h2 className="text-xl font-semibold leading-7">Computer Science, West Coast</h2>
              </div>
              <Badge className="bg-[#476052] text-white">92%</Badge>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="rounded-md bg-[#f4f1e8] p-3">
                <p className="text-[#6b675f]">Rating</p>
                <p className="font-semibold">5 stars</p>
              </div>
              <div className="rounded-md bg-[#eef3f1] p-3">
                <p className="text-[#6b675f]">Deadline</p>
                <p className="font-semibold">Jan 5</p>
              </div>
              <div className="rounded-md bg-[#f1eef4] p-3">
                <p className="text-[#6b675f]">List</p>
                <p className="font-semibold">Target</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
