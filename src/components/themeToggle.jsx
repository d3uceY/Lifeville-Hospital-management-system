import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light")


  useEffect(() => {
    const html = document.documentElement;
    if (theme == "dark") {
      html.classList.add("dark")
    } else {
      html.classList.remove("dark")
    }
    localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="flex items-center gap-3">
      <Sun className={`h-5 w-5 transition-colors ${theme === "light" ? "text-yellow-500" : "text-muted-foreground"}`} />
      <Switch
        checked={theme === "dark"}
        onCheckedChange={toggleTheme}
      />
      <Moon className={`h-5 w-5 transition-colors ${theme === "dark" ? "text-blue-400" : "text-muted-foreground"}`} />
    </div>
  );
}
