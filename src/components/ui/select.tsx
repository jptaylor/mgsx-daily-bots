import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "../../utils/tailwind";

const selectVariants = cva(
  "appearance-none text-white font-semibold bg-no-repeat bg-selectArrow flex h-12 px-3 pr-10 w-full border-2 border-black text-lg ring-ring file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:bg-black focus-visible:bg-selectArrowFocus disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        danger:
          "border-red-500 text-red-500 focus-visible:ring-red-500 placeholder:text-red-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement>,
    VariantProps<typeof selectVariants> {}

export const Select: React.FC<SelectProps> = ({
  variant,
  className,
  children,
  ...props
}) => {
  return (
    <div className="relative w-full">
      <select className={cn(selectVariants({ variant }), className)} {...props}>
        {children}
      </select>
    </div>
  );
};
Select.displayName = "Input";
