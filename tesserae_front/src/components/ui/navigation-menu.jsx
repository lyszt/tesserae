import { createSignal, createContext, useContext, Show, onMount, onCleanup } from "solid-js"
import { cva } from "class-variance-authority"
import {AppstoreOutlinedIcon } from "@/components/ui/icons/ant-design-appstore-outlined";
import { cn } from "@/lib/utils"

const ItemContext = createContext()

function NavigationMenu({ className, children, viewport = true, ...props }) {
  return (
    <nav data-slot="navigation-menu" className={cn("relative flex shadow-sm shadow-gray-100 w-[80%] m-auto mt-[1%] rounded-2xl border border-gray-100 p-2 flex-1 items-center justify-center", className)} {...props}>
      {children}
      {viewport && <NavigationMenuViewport />}
    </nav>
  )
}

function NavigationMenuList({ className, ...props }) {
  return (
    <ul data-slot="navigation-menu-list" className={cn("flex flex-1 list-none items-center justify-center gap-1", className)} {...props} />
  )
}

function NavigationMenuItem(props, section = "") {
  const [open, setOpen] = createSignal(false)
  let menuRef;
  let closeTimeout;

  onMount(() => {
    const handleClickOutside = (event) => {
      if (menuRef && !menuRef.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    onCleanup(() => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (closeTimeout) clearTimeout(closeTimeout);
    });
  });

  const handleMouseEnter = () => {
    if (closeTimeout) clearTimeout(closeTimeout);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout = setTimeout(() => {
      setOpen(false);
    }, 200);
  };

  return (
    <ItemContext.Provider value={{ open, setOpen }}>
      <li
        ref={menuRef}
        data-slot="navigation-menu-item"
        className={cn("relative", props.className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {props.children}
      </li>
    </ItemContext.Provider>
  )
}

const navigationMenuTriggerStyle = cva(
  "inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 outline-none transition-[color,box-shadow]"
)

function ChevronDown({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )
}

function NavigationMenuTrigger({ className, children, showChevron = true, ...props }) {
  const ctx = useContext(ItemContext)
  return (
    <button
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), "group", className)}
      onClick={() => ctx?.setOpen && ctx.setOpen(!ctx.open())}
      {...props}
    >
      {children}
      {showChevron && (
        <span style={{ "margin-left": "6px" }}>
          <ChevronDown className="relative top-[1px] size-3 transition duration-300" />
        </span>
      )}
    </button>
  )
}

function NavigationMenuContent({ className, children, ...props }) {
  const ctx = useContext(ItemContext)
  return (
    <div
      data-slot="navigation-menu-content"
      className={cn("absolute top-full left-0 w-auto p-2 mt-1.5 rounded-md shadow-lg bg-white border border-gray-200 z-50 transition-opacity duration-200", className)}
      style={{
        opacity: ctx?.open() ? 1 : 0,
        "pointer-events": ctx?.open() ? "auto" : "none"
      }}
      {...props}
    >
      {children}
    </div>
  )
}

function NavigationMenuViewport({ className, ...props }) {
  return (
    <div className={cn("absolute top-full left-0 isolate z-50 flex justify-center", className)} {...props} />
  )
}

function NavigationMenuLink({ className, ...props }) {
  return (
    <a data-slot="navigation-menu-link" className={cn("p-2 text-sm rounded-sm", className)} {...props} />
  )
}

function NavigationMenuIndicator({ className, ...props }) {
  return (
    <div data-slot="navigation-menu-indicator" className={cn("top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden", className)} {...props}>
      <div className="bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md" />
    </div>
  )
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
}
