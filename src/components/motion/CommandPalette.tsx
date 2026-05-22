"use client";

import { Command } from "cmdk";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  ArrowUpRight,
  Briefcase,
  Code2,
  Copy,
  CornerDownLeft,
  FileText,
  Home,
  MoonStar,
  Search,
  User,
  Users,
  Wrench,
} from "lucide-react";
import { SiGithub, SiLinkedin, SiX } from "react-icons/si";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const EMAIL = "adithya25905@gmail.com";

interface BaseAction {
  id: string;
  label: string;
  shortcut?: string;
  keywords?: string;
  icon: React.ReactNode;
}

interface NavCommand extends BaseAction {
  type: "anchor" | "route";
  target: string;
}

interface ExternalCommand extends BaseAction {
  type: "external";
  href: string;
}

interface ActionCommand extends BaseAction {
  type: "action";
  perform: (ctx: PaletteContext) => void;
}

type CommandEntry = NavCommand | ExternalCommand | ActionCommand;

interface PaletteContext {
  setTheme: (theme: string) => void;
  resolvedTheme: string | undefined;
  router: ReturnType<typeof useRouter>;
  close: () => void;
}

interface CommandPaletteProps {
  /** If true, open as soon as the component mounts (used after lazy-load). */
  initialOpen?: boolean;
}

/**
 * ⌘/Ctrl + K opens the palette. Commands fall into three groups:
 *   Navigation — jump to a section anchor or open another route
 *   Actions    — copy email, toggle theme
 *   External   — open GitHub / LinkedIn / X in a new tab
 *
 * cmdk handles focus trap, fuzzy search, arrow-key nav, esc-to-close,
 * and rendering through a portal. We just style and wire the actions.
 */
export function CommandPalette({ initialOpen = false }: CommandPaletteProps = {}) {
  const [open, setOpen] = useState(initialOpen);
  const { resolvedTheme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Global keyboard shortcut (active once the palette has lazy-loaded — the
  // mount wrapper owns the pre-load listener).
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== "k") return;
      if (!(event.metaKey || event.ctrlKey)) return;
      event.preventDefault();
      setOpen((prev) => !prev);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  const scrollToAnchor = useCallback((anchor: string) => {
    const id = anchor.startsWith("#") ? anchor.slice(1) : anchor;
    const node = document.getElementById(id);
    if (node) {
      node.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const commands: CommandEntry[] = useMemo(
    () => [
      // ─── Navigation ──────────────────────────────────────────
      // "Home" only when we're somewhere else — redundant on /.
      ...(isHome
        ? []
        : [
            {
              id: "nav-home",
              label: "Home",
              icon: <Home aria-hidden="true" size={14} />,
              type: "route",
              target: "/",
              keywords: "back start landing",
            } as NavCommand,
          ]),
      {
        id: "nav-about",
        label: "About",
        icon: <User aria-hidden="true" size={14} />,
        type: "anchor",
        target: "#about",
        keywords: "hero name profile",
      },
      {
        id: "nav-experience",
        label: "Experience",
        icon: <Briefcase aria-hidden="true" size={14} />,
        type: "anchor",
        target: "#experience",
        keywords: "work roles umbra odpay",
      },
      {
        id: "nav-projects",
        label: "Projects",
        icon: <Code2 aria-hidden="true" size={14} />,
        type: "anchor",
        target: "#projects",
        keywords: "work zk web3 rust",
      },
      {
        id: "nav-stack",
        label: "Tech Stack",
        icon: <Wrench aria-hidden="true" size={14} />,
        type: "anchor",
        target: "#stack",
        keywords: "skills tools tech",
      },
      {
        id: "nav-blogs",
        label: "Recent Articles",
        icon: <FileText aria-hidden="true" size={14} />,
        type: "anchor",
        target: "#blogs",
        keywords: "writing posts blogs",
      },
      {
        id: "nav-connect",
        label: "Connect",
        icon: <Users aria-hidden="true" size={14} />,
        type: "anchor",
        target: "#contact",
        keywords: "email social contact",
      },
      {
        id: "route-blog",
        label: "Open Blog",
        icon: <FileText aria-hidden="true" size={14} />,
        type: "route",
        target: "/blog",
        keywords: "posts writing",
      },
      {
        id: "route-archive",
        label: "Open Archive",
        icon: <Briefcase aria-hidden="true" size={14} />,
        type: "route",
        target: "/archive",
        keywords: "work history full",
      },

      // ─── Actions ─────────────────────────────────────────────
      {
        id: "act-email",
        label: "Copy email",
        shortcut: "Y",
        icon: <Copy aria-hidden="true" size={14} />,
        type: "action",
        keywords: "yank clipboard mail contact send mailto",
        perform: () => {
          navigator.clipboard.writeText(EMAIL);
          toast.success("Email yanked to clipboard!", {
            description: EMAIL,
            duration: 2000,
          });
        },
      },
      {
        id: "act-theme",
        label: "Toggle theme",
        shortcut: "⌘⇧L",
        icon: <MoonStar aria-hidden="true" size={14} />,
        type: "action",
        keywords: "dark light noir",
        perform: (ctx: PaletteContext) => {
          ctx.setTheme(ctx.resolvedTheme === "dark" ? "light" : "dark");
        },
      },

      // ─── External ────────────────────────────────────────────
      {
        id: "ext-github",
        label: "GitHub",
        icon: <SiGithub aria-hidden="true" size={14} />,
        type: "external",
        href: "https://github.com/adithya-adee",
        keywords: "code repos open source",
      },
      {
        id: "ext-linkedin",
        label: "LinkedIn",
        icon: <SiLinkedin aria-hidden="true" size={14} />,
        type: "external",
        href: "https://linkedin.com/in/adithya-a-8bb28128a",
        keywords: "profile work",
      },
      {
        id: "ext-twitter",
        label: "X (Twitter)",
        icon: <SiX aria-hidden="true" size={14} />,
        type: "external",
        href: "https://x.com/glitchy_moon_",
        keywords: "twitter social glitchy_moon",
      },
    ],
    [isHome]
  );

  const handleSelect = useCallback(
    (entry: CommandEntry) => {
      const ctx: PaletteContext = { setTheme, resolvedTheme, router, close };
      switch (entry.type) {
        case "anchor":
          close();
          if (isHome) {
            // On the home page — scroll to the section.
            requestAnimationFrame(() => scrollToAnchor(entry.target));
          } else {
            // Elsewhere — route to "/#anchor" so the browser picks up the
            // section after the page hydrates.
            router.push(`/${entry.target}`);
          }
          break;
        case "route":
          close();
          router.push(entry.target);
          break;
        case "external":
          window.open(entry.href, "_blank", "noopener,noreferrer");
          close();
          break;
        case "action":
          entry.perform(ctx);
          close();
          break;
      }
    },
    [close, isHome, resolvedTheme, router, scrollToAnchor, setTheme]
  );

  const groups = useMemo(
    () => [
      { heading: "Navigation", items: commands.filter((c) => c.type === "anchor" || c.type === "route") },
      { heading: "Actions", items: commands.filter((c) => c.type === "action") },
      { heading: "External", items: commands.filter((c) => c.type === "external") },
    ],
    [commands]
  );

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command palette"
      shouldFilter
      loop
      // The Dialog renders to a portal; we style its overlay + content here.
      overlayClassName="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0"
      contentClassName={cn(
        "fixed left-1/2 top-[20%] z-[70] w-[92vw] max-w-[600px] -translate-x-1/2 overflow-hidden rounded-xl border border-strong bg-surface-3 shadow-elev-3 backdrop-blur-md",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
      )}
    >
      {/* Radix Dialog requires a Title child for screen-reader labelling.
          We register one here visually hidden so the chrome stays clean. */}
      <DialogPrimitive.Title className="sr-only">Command palette</DialogPrimitive.Title>
      <DialogPrimitive.Description className="sr-only">
        Jump between sections, copy contact info, toggle theme, or open social links.
      </DialogPrimitive.Description>

      {/* Input row */}
      <div className="flex items-center gap-3 border-b border-soft px-4 py-3">
        <Search aria-hidden="true" className="h-4 w-4 shrink-0 text-tertiary" />
        <Command.Input
          placeholder="Search commands…"
          className="w-full bg-transparent font-mono text-body-2 text-primary placeholder:text-muted focus:outline-none"
        />
        <kbd className="hidden items-center gap-0.5 rounded border border-soft bg-surface-2 px-1.5 py-0.5 font-mono text-[11px] tracking-wider text-tertiary sm:inline-flex">
          ESC
        </kbd>
      </div>

      <Command.List className="max-h-[420px] overflow-y-auto p-2">
        <Command.Empty className="px-3 py-8 text-center font-mono text-label text-muted">
          No commands found.
        </Command.Empty>

        {groups.map((group, gi) => (
          <Command.Group
            key={group.heading}
            heading={group.heading}
            className={cn(
              "mt-1 first:mt-0",
              "[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.15em] [&_[cmdk-group-heading]]:text-tertiary",
              gi > 0 && "mt-2 border-t border-soft pt-2"
            )}
          >
            {group.items.map((item) => {
              const isExternal = item.type === "external";
              return (
                <Command.Item
                  key={item.id}
                  value={`${item.label} ${item.keywords ?? ""}`}
                  onSelect={() => handleSelect(item)}
                  className={cn(
                    "group/item flex cursor-pointer items-center justify-between gap-3 rounded-md px-3 py-2.5 text-body-2 text-secondary",
                    "data-[selected=true]:bg-surface-2 data-[selected=true]:text-primary"
                  )}
                >
                  <div className="flex items-center gap-3">
                    {/* Accent bar that fades in on the focused item */}
                    <span
                      aria-hidden="true"
                      className="h-4 w-[2px] rounded-full bg-accent opacity-0 transition-opacity duration-fast group-data-[selected=true]/item:opacity-100"
                    />
                    <span className="text-tertiary group-data-[selected=true]/item:text-accent">
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.shortcut ? (
                      <kbd className="rounded border border-soft bg-surface-2 px-1.5 py-0.5 font-mono text-[11px] tracking-wider text-tertiary">
                        {item.shortcut}
                      </kbd>
                    ) : null}
                    {isExternal ? (
                      <ArrowUpRight
                        aria-hidden="true"
                        size={14}
                        className="text-tertiary group-data-[selected=true]/item:text-accent"
                      />
                    ) : null}
                  </div>
                </Command.Item>
              );
            })}
          </Command.Group>
        ))}
      </Command.List>

      {/* Footer hints */}
      <div className="flex items-center justify-between border-t border-soft bg-surface-2/60 px-4 py-2.5 font-mono text-[11px] uppercase tracking-wider text-muted">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5">
            <CornerDownLeft aria-hidden="true" size={12} className="text-tertiary" />
            select
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden="true">↑↓</span>
            navigate
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5">
          <kbd className="rounded border border-soft bg-surface-2 px-1 py-0.5 text-[10px] tracking-wider text-tertiary">
            ⌘K
          </kbd>
          to toggle
        </span>
      </div>
    </Command.Dialog>
  );
}
