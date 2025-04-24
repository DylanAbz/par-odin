import React from 'react';
import './DiceComponent.css';
import { Dice, DiceType } from '../dices/dice.tsx';

const LABEL: Record<DiceType, string> = {
    [DiceType.HERO]:    'Hero',
    [DiceType.CAPTAIN]: 'Captain',
    [DiceType.SOLDIER]: 'Soldier',
    [DiceType.TRAITOR]: 'Traitor',
    [DiceType.MAGE]:    'Mage',
    [DiceType.CURSED]:  'Cursed',
};

const CLASS_BY_TYPE: Record<DiceType, string> = {
    [DiceType.HERO]:    'dice-hero',
    [DiceType.CAPTAIN]: 'dice-captain',
    [DiceType.SOLDIER]: 'dice-soldier',
    [DiceType.TRAITOR]: 'dice-traitor',
    [DiceType.MAGE]:    'dice-mage',
    [DiceType.CURSED]:  'dice-cursed',
};

interface DiceComponentProps {
    dice: Dice;
    /** identifiant unique pour le drag */
    id: string;
    sizeRem?: number;
}

const DiceComponent: React.FC<DiceComponentProps> = ({
                                                         dice,
                                                         id,
                                                         sizeRem = 7,
                                                     }) => {
    const { type, value } = dice;
    const className = `dice ${CLASS_BY_TYPE[type]}`;
    const tooltip   = `${LABEL[type]} (${value >= 0 ? '+' : ''}${value})`;

    const handleDragStart: React.DragEventHandler<HTMLDivElement> = (e) => {
        e.dataTransfer.setData('text/plain', id);   // on transporte l’id
        e.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div
            className={className}
            title={tooltip}
            style={{ width: `${sizeRem}rem`, height: `${sizeRem}rem` }}
            draggable
            onDragStart={handleDragStart}
        >
            <span className="dice-value">{LABEL[type] + ' (' + value + ')'}</span>
        </div>
    );
};

export default DiceComponent;
