import { useResponsive } from '../../hooks/use-responsive';

// ----------------------------------------------------------------------

export function ResponsiveDemo() {
    const responsive = useResponsive();

    return (
        <div style={{ padding: '20px', fontFamily: 'monospace' }}>
            <h2>Responsive Hook Demo</h2>

            <div style={{ marginBottom: '20px' }}>
                <h3>Screen Dimensions:</h3>
                <p>Width: {responsive.width}px</p>
                <p>Height: {responsive.height}px</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>Device Categories:</h3>
                <p>Mobile: {responsive.isMobile ? '✅' : '❌'}</p>
                <p>Tablet: {responsive.isTablet ? '✅' : '❌'}</p>
                <p>Desktop: {responsive.isDesktop ? '✅' : '❌'}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>Exact Breakpoints:</h3>
                <p>XS (0-575px): {responsive.isXs ? '✅' : '❌'}</p>
                <p>SM (576-767px): {responsive.isSm ? '✅' : '❌'}</p>
                <p>MD (768-991px): {responsive.isMd ? '✅' : '❌'}</p>
                <p>LG (992-1199px): {responsive.isLg ? '✅' : '❌'}</p>
                <p>XL (1200-1399px): {responsive.isXl ? '✅' : '❌'}</p>
                <p>XXL (1400px+): {responsive.isXxl ? '✅' : '❌'}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>Up Queries (≥):</h3>
                <p>SM Up: {responsive.isSmUp ? '✅' : '❌'}</p>
                <p>MD Up: {responsive.isMdUp ? '✅' : '❌'}</p>
                <p>LG Up: {responsive.isLgUp ? '✅' : '❌'}</p>
                <p>XL Up: {responsive.isXlUp ? '✅' : '❌'}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>Down Queries (&lt;):</h3>
                <p>SM Down: {responsive.isSmDown ? '✅' : '❌'}</p>
                <p>MD Down: {responsive.isMdDown ? '✅' : '❌'}</p>
                <p>LG Down: {responsive.isLgDown ? '✅' : '❌'}</p>
                <p>XL Down: {responsive.isXlDown ? '✅' : '❌'}</p>
            </div>

            <div>
                <h3>Breakpoints:</h3>
                <pre>{JSON.stringify(responsive.breakpoints, null, 2)}</pre>
            </div>
        </div>
    );
}
