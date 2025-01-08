import './TagList.css';

export type TagListProps = {
    tags: string[];
    selectedTags: string[];
    handleTagChange: (tag: string) => void;
}

export function TagList({ tags, selectedTags, handleTagChange }: TagListProps) {
    return (
        <div className='tag-container'>
            {tags.map((tag, index) => {
                const isSelected = selectedTags.includes(tag);
                return (
                    <label key={`tag-${index}`} className='tag'>
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