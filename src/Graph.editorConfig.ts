import { Properties, StructurePreviewProps, transformGroupsIntoTabs } from "./piw-utils-internal";
import { GraphPreviewProps } from "../typings/GraphProps";

export function getProperties(
    values: GraphPreviewProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    console.log(values);
    if (platform === "web") {
        transformGroupsIntoTabs(defaultProperties);
    }
    return defaultProperties;
}
export function getPreview(values: GraphPreviewProps): StructurePreviewProps | null {
    console.log(values);
    return null;
}
