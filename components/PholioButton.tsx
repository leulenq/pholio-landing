import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import "./PholioButton.css";

type PholioButtonTone = "light" | "dark";

type SharedProps = {
  children: ReactNode;
  tone?: PholioButtonTone;
  compact?: boolean;
  className?: string;
};

type AnchorProps = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonProps = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

export type PholioButtonProps = AnchorProps | ButtonProps;

function cx(...values: Array<string | false | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function PholioButton({
  children,
  tone = "light",
  compact = false,
  className,
  href,
  ...props
}: PholioButtonProps) {
  const classes = cx(
    "pholio-btn",
    "pholio-btn--primary",
    tone === "dark" && "pholio-btn--tone-dark",
    compact && "pholio-btn--compact",
    className,
  );

  if (href) {
    return (
      <a href={href} className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
