export type MarkerTagProps = {
    title: string;
    tags: Record<string, string>;
}

export function MarkerTag({ title, tags }: MarkerTagProps) {
    return (
        <div className='map-tag'>
            <span className='map-tag--tags'>
                {Object.entries(tags).map(([tag, color], index) => (
                    <span title={tag} key={`tag-${index}`} className='map-tag--tag' style={{ backgroundColor: color }}></span>
                ))}
            </span>
            <span className='map-tag--title'>{title}</span>
        </div>
    )
}
