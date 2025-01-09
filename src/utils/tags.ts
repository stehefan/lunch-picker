
export function toggleTag(tags: string[], tagToToggle: string): string[] {
    return tags.includes(tagToToggle)
        ? tags.filter((t: string) => t !== tagToToggle)
        : [...tags, tagToToggle];
}