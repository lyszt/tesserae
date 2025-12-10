import { A } from "@solidjs/router";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { InfoOutlinedIcon } from "@/components/ui/icons/ant-design-info-outlined";
import { CodeOutlinedIcon } from "@/components/ui/icons/ant-design-code-outlined";
import { CoffeeOutlinedIcon } from "@/components/ui/icons/ant-design-coffee-outlined";
import { FunctionOutlinedIcon } from "@/components/ui/icons/ant-design-function-outlined";
import { LoginOutlinedIcon } from "@/components/ui/icons/ant-design-login-outlined";
import { isAuthenticated, removeToken, validateToken } from "@/utils/api";
import { onMount, onCleanup } from "solid-js";

// Music player was removed for multiple reasons,
// Including avoiding copyright and that it was sort of useless

function ListItem(props) {
  return (
    <li>
      <A
        href={props.href}
        class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
      >
        <div class="text-sm font-medium leading-none">{props.title}</div>
        <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {props.children}
        </p>
      </A>
    </li>
  );
}

export default function Navigator(props) {
  const logout = () => {
    removeToken();
    window.location.href = "/";
  };

  let intervalId = null;
  onMount(() => {
    const checkAuth = async () => {
      if (isAuthenticated()) {
        if (!(await validateToken())) {
          removeToken();
          window.location.href = "/auth";
        }
      }
      checkAuth();
      intervalId = window.setInterval(checkAuth, 6e5);
      onCleanup(() => clearInterval(intervalId));
    };
  });

  onCleanup(() => {
    if (intervalId) clearInterval(intervalId);
  });

  return (
    <NavigationMenu className="fixed left-[6%] bg-white p-4">
      <span className="ml-[2%]">LYSZT</span>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="gap-3">Home</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>Link</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="gap-3">
            <InfoOutlinedIcon color="#5a5f73" />
            About
          </NavigationMenuTrigger>
          {/* Resume should now come here, not inside its own category, or linked down below*/}
          <NavigationMenuContent>
            <NavigationMenuLink>Link</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="gap-3">
            <CodeOutlinedIcon color="#5a5f73" />
            Labs
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>Link</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="gap-3">
            <CoffeeOutlinedIcon color="#5a5f73" />
            Stories
          </NavigationMenuTrigger>
          {/* This will be based on the verge*/}
          <NavigationMenuContent>
            <ul class="w-[30vw] gap-2 p-2 flex flex-row">
              <div>
                <ListItem className="w-full" href="/news" title="News">
                  Browse the latest tech stories
                </ListItem>
              </div>
              <div>
                <ListItem className="w-full" href="/feed" title="Feed">
                  Read the community feed
                </ListItem>
              </div>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="gap-3">
            <FunctionOutlinedIcon color="#5a5f73" />
            Toolkit
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>Link</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {isAuthenticated() && (
          <NavigationMenuItem>
            <NavigationMenuTrigger className="gap-3">
              <CoffeeOutlinedIcon color="#5a5f73" />
              Profile
            </NavigationMenuTrigger>
            {/* This will be based on the verge*/}
            <NavigationMenuContent>
              <ul class="w-[30vw] gap-2 p-2 flex flex-row">
                <div>
                  <ListItem className="w-full" href="/news" title="Profile">
                    View your profile
                  </ListItem>
                </div>
                <div>
                  <ListItem className="w-full" href="/feed" title="Friends">
                    Open your friends list
                  </ListItem>
                </div>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}

        <A href={isAuthenticated() ? "#" : "/auth"}>
          <Button
            onClick={isAuthenticated() ? logout : undefined}
            className="bg-slate-900 text-white hover:bg-slate-800 ml-2"
          >
            <LoginOutlinedIcon color="#ffffff" />
            {isAuthenticated() ? "Logout" : "Login"}
          </Button>
        </A>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
