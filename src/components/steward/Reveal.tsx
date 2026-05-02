import { useEffect, useRef, useState, type ElementType, type ReactNode, type CSSProperties } from "react";

type Variant = "rise" | "fade" | "left" | "right";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  variant?: Variant;
  delay?: number;
  threshold?: number;
  className?: string;
  style?: CSSProperties;
  once?: boolean;
  [key: string]: unknown;
}

export const Reveal = ({
  children,
  as: Tag = "div",
  variant = "rise",
  delay = 0,
  threshold = 0.15,
  className = "",
  style,
  once = true,
  ...rest
}: RevealProps) => {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, once]);

  return (
    <Tag
      ref={ref as never}
      className={`reveal reveal-${variant}${visible ? " is-visible" : ""} ${className}`}
      style={{ ...style, ["--reveal-delay" as never]: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
