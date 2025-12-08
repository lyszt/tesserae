import { splitProps } from "solid-js"

import { cn } from "@/lib/utils"

function Input(props) {
  const [local, others] = splitProps(props, ["class", "className", "type"])
  return (
    <input
      type={local.type}
      data-slot="input"
      class={cn(
        "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive md:text-sm",
        local.class || local.className
      )}
      {...others} />
  );
}

export { Input }
