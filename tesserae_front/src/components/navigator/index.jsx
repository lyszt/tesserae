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
import { HomeOutlinedIcon } from "@/components/ui/icons/ant-design-home-outlined";
import { InfoOutlinedIcon } from "@/components/ui/icons/ant-design-info-outlined";
import { CodeOutlinedIcon } from "@/components/ui/icons/ant-design-code-outlined";
import { CoffeeOutlinedIcon } from "@/components/ui/icons/ant-design-coffee-outlined";
import { GithubOutlinedIcon } from "@/components/ui/icons/ant-design-github-outlined";
import { FunctionOutlinedIcon } from "@/components/ui/icons/ant-design-function-outlined";
import MusicPlayer from "@/components/music-player";

export default function Navigator() {
 

  return (
    <NavigationMenu>
      <span className="ml-[2%]">LYSZT</span>
      <NavigationMenuList>
      
        <NavigationMenuItem>
          <NavigationMenuTrigger className="gap-3">
            Home
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>Link</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="gap-3">
            <InfoOutlinedIcon color="#5a5f73"/>
            About
          </NavigationMenuTrigger>
          {/* Resume should now come here, not inside its own category, or linked down below*/}
          <NavigationMenuContent>
            <NavigationMenuLink>Link</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>

         <NavigationMenuItem>
          <NavigationMenuTrigger className="gap-3">
            <CodeOutlinedIcon color="#5a5f73"/>
            Projects
            </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>Link</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>

         <NavigationMenuItem>
          <NavigationMenuTrigger className="gap-3">
            <CoffeeOutlinedIcon color="#5a5f73"/>
            Stories
            </NavigationMenuTrigger>
          {/* This will be based on the verge*/}
          <NavigationMenuContent>
            <NavigationMenuLink>Link</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="gap-3">
            <FunctionOutlinedIcon color="#5a5f73"/>
            Public Utility
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>Link</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>


      </NavigationMenuList>
      <MusicPlayer />
    </NavigationMenu>
  );
}
