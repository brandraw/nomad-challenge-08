import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Loader2 className="size-8 animate-spin" />
    </div>
  );
}
