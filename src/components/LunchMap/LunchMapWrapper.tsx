import { APIProvider } from "@vis.gl/react-google-maps";
import { LunchMap, LunchMapProps } from "./LunchMap";

export function LunchMapWrapper(lunchMapProps: LunchMapProps) {
    return (
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY!}>
            <LunchMap {...lunchMapProps} />
        </APIProvider>
    );
}