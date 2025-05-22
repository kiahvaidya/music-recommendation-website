
import { BarChart, Disc, History, Music } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type Section = "genre" | "mood" | "trending" | "history";

interface NavigationProps {
  currentSection: Section;
}

const navItems = [
  {
    name: "Genre",
    href: "/genre",
    value: "genre" as Section,
    icon: Disc,
  },
  {
    name: "Mood",
    href: "/mood",
    value: "mood" as Section,
    icon: Music,
  },
  {
    name: "Trending",
    href: "/trending",
    value: "trending" as Section,
    icon: BarChart,
  },
  {
    name: "History",
    href: "/history",
    value: "history" as Section,
    icon: History,
  },
];

export function Navigation({ currentSection }: NavigationProps) {
  return (
    <nav className="flex justify-center my-8 overflow-x-auto">
      <div className="flex space-x-1 rounded-full bg-muted p-1">
        {navItems.map((item) => (
          <Link
            key={item.value}
            to={item.href}
            className={cn(
              "inline-flex items-center justify-center rounded-full px-3 py-1.5 text-sm font-medium transition-all hover:bg-background hover:shadow",
              currentSection === item.value
                ? "bg-background shadow"
                : "text-muted-foreground"
            )}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
