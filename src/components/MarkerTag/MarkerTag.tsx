import './MarkerTag.css';

export type MarkerTagProps = {
    title: string;
    tags: string[];
}

export function MarkerTag({ title }: MarkerTagProps) {
    return (
        <span className='map-tag'>{title}</span>
    )
}
