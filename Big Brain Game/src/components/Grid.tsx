import React, { useState, useEffect } from 'react';
import Block from './Block';
import audio from '../assets/audio/aaa.mp3';

const randomNum = (max: number) => {
    return Math.floor(1 + Math.random() * max);
};

const Grid = () => {
    const jumpscares = [
        "https://media1.tenor.com/m/wcutUgQDtNcAAAAd/susto-fnaf.gif",
        "https://media1.tenor.com/m/dqY3jP5sr6UAAAAd/cat.gif",
        "https://media1.tenor.com/m/VXLAU_AIlF4AAAAd/jumpscare-ring-jumpscare.gif",
        "https://media1.tenor.com/m/0J2OzX5owj0AAAAd/grossa-shell-it-sucks-too.gif",
        "https://media1.tenor.com/m/CMkD8MSaJb8AAAAd/jumpscare.gif"
    ];

    const totalBlocks = 90;

    const [count, setCount] = useState(1);
    const [level, setLevel] = useState(6);
    const [blockData, setBlockData] = useState<{ num: number; empty: boolean }[]>([]);

    useEffect(() => {
        generateBlocks();
    }, [level]);
    
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.code === 'Space') {
                clearArray();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
    }, []);


    const clearArray = () => {
        generateBlocks();
        setCount(1);
    };
    
    const generateBlocks = () => {
        const newEmptyIndices = new Set<number>();

        while (newEmptyIndices.size < level) {
            newEmptyIndices.add(Math.floor(Math.random() * totalBlocks));
        }

        const shuffledNums = Array.from({ length: level }, (_, i) => i + 1)
            .sort(() => Math.random() - 0.5);

        const newBlockData = Array.from({ length: totalBlocks }, (_, i) => {
            if (newEmptyIndices.has(i)) { 
                const n = shuffledNums.pop();
                return {
                    num: n ?? 0,
                    empty: false,
                };
            } else {
                return { num: 0, empty: true };
            }
        });

        setBlockData(newBlockData);
    };

    const random = randomNum(8);
    if (count != 1 && random == 1) {
        const randomJump = randomNum(5) - 1;
        new Audio(audio).play();
        return (
        
        <img id='jump' src={jumpscares[randomJump]} alt="LOL"></img>)
    }

    return (
        <div id="grid">
        {blockData.map((block, index) => (
            <Block
            key={index}
            num={block.num}
            empty={block.empty}
            onClear={clearArray}
            count={count}
            setCount={setCount}
            level={level}
            setLevel={setLevel}
            />
        ))}
        </div>
    );
};

export default Grid;
