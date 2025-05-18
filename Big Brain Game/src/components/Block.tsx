import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import bruh from '../assets/audio/bruh.mp3';
import vineBoom from '../assets/audio/boom.mp3';

type BlockProps = {
    num: number;
    empty: boolean;
    count: number;
    level: number;
    onClear: () => void;
    setCount: Dispatch<SetStateAction<number>>;
    setLevel: Dispatch<SetStateAction<number>>;
};
    
const Block = ({ num, empty, onClear, count, setCount, level, setLevel }: BlockProps) => {
    const [isWhite, setIsWhite] = useState(false);
    const [active, setActive] = useState("active");
        useEffect(() => {
        if (!empty) {
            setActive("active");
            setIsWhite(false);
        }
    }, [num, empty, level]);
    
    const blockOnClick = () => {
        if (num !== count) {
            new Audio(vineBoom).play();
            onClear();
            setIsWhite(false);
            setActive("active");
            return;
        }

        if (num === level) {
            setCount(1);
            setLevel(prevLevel => prevLevel + 1);
            setIsWhite(false);
            setActive("active");
            return;
        }

        setActive("inactive");
        setCount(count + 1);
        
        new Audio(bruh).play();
        if (!isWhite) {
            const blocks: NodeListOf<Element> = document.querySelectorAll('.block');
            blocks.forEach(block => {
                block.classList.remove('block');
                block.classList.add('white-block');
                setIsWhite(true);
            });
        }
    };

    if (empty || active == "inactive") {
        return <button className="empty"></button>
    }
    return (
        <button onClick={() => blockOnClick()} className="block">
        <p className="text-font number">{num}</p>
        </button>
    )
}


export default Block;