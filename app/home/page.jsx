"use client";

import React from "react";
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

export default function Page() {
  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink className="navigation-link">Link 1</NavigationMenuLink>
              <NavigationMenuLink className="navigation-link">Link 2</NavigationMenuLink>
              <NavigationMenuLink className="navigation-link">Link 3</NavigationMenuLink>
              <NavigationMenuLink className="navigation-link">Link 4</NavigationMenuLink>
              <NavigationMenuLink className="navigation-link">Link 5</NavigationMenuLink>
              <NavigationMenuLink className="navigation-link">Link 6</NavigationMenuLink>
              <NavigationMenuLink className="navigation-link">Link 7</NavigationMenuLink>
              <NavigationMenuLink className="navigation-link">Link 8</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
