import { useAtom } from 'jotai';
import { tagsAtom } from '../../atoms/restaurantAtoms';
import { Tag } from '../../types/Filter';
import { AddTagInput } from '../AddTagInput/AddTagInput';
import './TagFilter.css';

interface TagFilterProps {
    showHint?: boolean;
    allowAdd?: boolean;
}

export function TagFilter({ showHint = true, allowAdd = false }: TagFilterProps) {
    const [tags, setTags] = useAtom(tagsAtom);

    const handleTagChange = (tagName: string) => {
        setTags((prev: Tag[]) => prev.map(t =>
            t.name === tagName ? { ...t, selected: !t.selected } : t
        ));
    };

    return (
        <>
            <div className='tag-container'>
                {tags.map((tag, index) => {
                    return (
                        <label key={`tag-${index}`} className='tag'>
                            {tag.name}
                            <input
                                disabled={tags.length === 1 && tag.selected}
                                type='checkbox'
                                id={`tag-${index}`}
                                name='selected-tag'
                                value={tag.name}
                                checked={tag.selected}
                                onChange={() => handleTagChange(tag.name)}
                            />
                        </label>
                    )
                })}
                {allowAdd && <AddTagInput />}
            </div>
            {showHint && <div className='taglist-info'>pick at least one tag to find restaurants</div>}
        </>
    )
}