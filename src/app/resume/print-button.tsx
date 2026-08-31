"use client";

import { Download } from "lucide-react";

export function PrintButton() {
  return (
    <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 bg-cyber-500 text-white rounded-lg text-sm font-medium hover:bg-cyber-600 transition-colors">
      <Download className="h-4 w-4" /> Print / Save PDF
    </button>
  );
}
