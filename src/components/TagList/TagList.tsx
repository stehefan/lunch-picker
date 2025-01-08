import './TagList.css';

export type TagListProps = {
    tags: Record<string, string>;
    selectedTags: string[];
    handleTagChange: (tag: string) => void;
}

export function TagList({ tags, selectedTags, handleTagChange }: TagListProps) {
    return (
        <div className='tag-container'>
            {Object.entries(tags).map(([tag, color], index) => {
                const isSelected = selectedTags.includes(tag);
                return (
                    <label
                        key={`tag-${index}`}
                        className='tag'
                        style={{
                            backgroundColor: color
                        }}
                    >
                        {tag}
                        <input
                            disabled={selectedTags.length === 1 && isSelected}
                            type='checkbox'
                            id={`tag-${index}`}
                            name='selected-tag'
                            value={tag}
                            checked={isSelected}
                            onChange={() => handleTagChange(tag)}
                        />
                    </label>
                )
            })}
        </div>
    )
}