import { useEffect, useLayoutEffect, useMemo, useState } from 'react';

// ----------------------------------------------------------------------

type ScreenSize = {
  width: number;
  height: number;
};

type Breakpoints = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
};

type ResponsiveQueries = {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isXs: boolean;
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
  isXxl: boolean;
  isSmUp: boolean;
  isMdUp: boolean;
  isLgUp: boolean;
  isXlUp: boolean;
  isSmDown: boolean;
  isMdDown: boolean;
  isLgDown: boolean;
  isXlDown: boolean;
};

export type UseResponsiveReturn = ScreenSize &
  ResponsiveQueries & {
    breakpoints: Breakpoints;
  };

// ----------------------------------------------------------------------

const defaultBreakpoints: Breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function useResponsive(customBreakpoints?: Partial<Breakpoints>): UseResponsiveReturn {
  const breakpoints = useMemo(
    () => ({ ...defaultBreakpoints, ...customBreakpoints }),
    [customBreakpoints]
  );

  const [screenSize, setScreenSize] = useState<ScreenSize>(() => {
    if (typeof window !== 'undefined') {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    }
    return { width: 0, height: 0 };
  });

  useIsomorphicLayoutEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    // Set initial size
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const responsiveQueries = useMemo((): ResponsiveQueries => {
    const { width } = screenSize;

    return {
      // Device categories
      isMobile: width < breakpoints.md,
      isTablet: width >= breakpoints.md && width < breakpoints.lg,
      isDesktop: width >= breakpoints.lg,

      // Exact breakpoint matches
      isXs: width >= breakpoints.xs && width < breakpoints.sm,
      isSm: width >= breakpoints.sm && width < breakpoints.md,
      isMd: width >= breakpoints.md && width < breakpoints.lg,
      isLg: width >= breakpoints.lg && width < breakpoints.xl,
      isXl: width >= breakpoints.xl && width < breakpoints.xxl,
      isXxl: width >= breakpoints.xxl,

      // Up queries (greater than or equal)
      isSmUp: width >= breakpoints.sm,
      isMdUp: width >= breakpoints.md,
      isLgUp: width >= breakpoints.lg,
      isXlUp: width >= breakpoints.xl,

      // Down queries (less than)
      isSmDown: width < breakpoints.sm,
      isMdDown: width < breakpoints.md,
      isLgDown: width < breakpoints.lg,
      isXlDown: width < breakpoints.xl,
    };
  }, [screenSize, breakpoints]);

  const memoizedValue = useMemo(
    () => ({
      ...screenSize,
      ...responsiveQueries,
      breakpoints,
    }),
    [screenSize, responsiveQueries, breakpoints]
  );

  return memoizedValue;
}
