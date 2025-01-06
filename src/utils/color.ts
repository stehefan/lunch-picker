export const generateTagColors = (numColors: number): string[] => {
    return Array.from({ length: numColors }, (_, i) => {
        const hue = (i * 360) / numColors;
        return `hsl(${hue}, 70%, 50%, 0.75)`; // Using HSL for consistent brightness
    });
};
