import { useState, KeyboardEvent } from 'react';
import { useSetAtom } from 'jotai';
import { tagsAtom } from '../../atoms/restaurantAtoms';
import './AddTagInput.css';

export function AddTagInput() {
    const [isEditing, setIsEditing] = useState(false);
    const [newTagName, setNewTagName] = useState('');
    const setTags = useSetAtom(tagsAtom);

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && newTagName.trim()) {
            setTags(prev => [...prev, { name: newTagName.trim(), selected: true }]);
            setNewTagName('');
            setIsEditing(false);
        } else if (e.key === 'Escape') {
            setNewTagName('');
            setIsEditing(false);
        }
    };

    if (isEditing) {
        return (
            <input
                type="text"
                className="tag-input"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={() => setIsEditing(false)}
                placeholder="Type and press Enter"
                autoFocus
            />
        );
    }

    return (
        <button
            className="add-tag-button"
            onClick={() => setIsEditing(true)}
        >
            + Add tag
        </button>
    );
} 