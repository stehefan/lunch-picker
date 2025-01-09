import { ReactNode } from 'react';
import './FilterSection.css';
interface FilterSectionProps {
    title: string;
    children: ReactNode;
    className?: string;
}

export function FilterSection({ title, children, className }: FilterSectionProps) {
    return (
        <div className={className}>
            <span className='filter-title'>{title}</span>
            {children}
        </div>
    );
} 