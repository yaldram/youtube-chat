import { HomeIcon, MoonIcon, PaletteIcon, SunIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useRouteLoading } from '@/hooks/useRouteLoading';
import { COLOR_SCHEMS, THEMES } from '@/lib/constants';
import { useTheme } from '@/contexts/ThemeContext';
import { ColorScheme } from '@/types';
import { Button } from '../ui/button';
import { Spinner } from '../ui/spinner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export function Navbar() {
  const navigate = useNavigate();

  // Fetch loading status and theme-related data using custom hooks
  const routeLoading = useRouteLoading();
  const { selectedColorScheme, setColorScheme, setTheme } = useTheme();

  return (
    <nav className="py-2 border-b flex justify-between px-14">
      {/* Home button */}
      <Button onClick={() => navigate('/')} variant="ghost">
        <HomeIcon className="h-[1.2rem] mr-2 w-[1.2rem] dark:-bg-white bg-dark" />{' '}
        Youtube Chat
      </Button>

      <div className="flex gap-6 items-center">
        {/* Display a spinner while the route is loading */}
        {routeLoading && (
          <div className="text-accent-foreground">
            <Spinner />
          </div>
        )}

        {/* Color scheme selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-9 px-0">
              <PaletteIcon className="h-[1.2rem] w-[1.2rem] dark:-bg-white bg-dark" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuRadioGroup
              value={selectedColorScheme}
              // Set selected color scheme on change
              onValueChange={(value) => setColorScheme(value as ColorScheme)}
            >
              {/* Display available color schemes */}
              {COLOR_SCHEMS.map((scheme) => (
                <DropdownMenuRadioItem key={scheme} value={scheme}>
                  {scheme}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-9 px-0">
              {/* Toggle theme icons */}
              <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* Display available themes */}
            {THEMES.map((theme) => (
              <DropdownMenuItem key={theme} onClick={() => setTheme(theme)}>
                {theme}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
