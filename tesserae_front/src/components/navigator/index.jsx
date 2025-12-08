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
import { InfoOutlinedIcon } from "@/components/ui/icons/ant-design-info-outlined";
import { CodeOutlinedIcon } from "@/components/ui/icons/ant-design-code-outlined";
import { CoffeeOutlinedIcon } from "@/components/ui/icons/ant-design-coffee-outlined";
import { FunctionOutlinedIcon } from "@/components/ui/icons/ant-design-function-outlined";
import { LoginOutlinedIcon } from "@/components/ui/icons/ant-design-login-outlined";


// Music player was removed for multiple reasons,
// Including avoiding copyright and that it was sort of useless

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

        <NavigationMenuItem>
          <NavigationMenuTrigger className="gap-3 bg-slate-900 text-white hover:bg-slate-800 hover:text-white" showChevron={false}>
            <LoginOutlinedIcon color="#ffffff"/>
            Login
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>Link</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>


      </NavigationMenuList>
    </NavigationMenu>
  );
}
