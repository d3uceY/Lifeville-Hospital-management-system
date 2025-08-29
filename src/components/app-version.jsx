import React from "react";
import { Badge } from "@/components/ui/badge";
import packageJson from '../../package.json'

export default function AppVersion() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">App Version</span>
      <Badge variant="secondary" className="">v{packageJson.version}</Badge>
    </div>
  );
}
