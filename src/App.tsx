import {useState} from 'react';
import './App.css';

import {getHero, getCaptain, getTraitor, getCursed, getMage, Dice} from './dices/dice.tsx';
import DiceComponent from './components/DiceComponent.tsx';
import {getTeamValue} from "./algo/resolver.tsx";
import {getLevels} from "./levels/levels.tsx";

/* ------- mapping id -> instance unique de dé -------------------------- */
// Création de plusieurs instances pour chaque type de dé
const levels = getLevels();

const generateDiceMap = (level: number) => {
    const levelDices = levels[level];
    console.log(levelDices, level);
    const diceMap: Record<string, Dice[]> = {};
    for (const dice of levelDices) {
        const type = dice.type;
        if (!diceMap[type]) {
            diceMap[type] = [];
        }
        diceMap[type].push(dice);
    }

    return diceMap;
};


/* ------- zone réceptrice réutilisable --------------------------------- */
function DiceZone({
                      title,
                      diceIds,
                      onDropDice,
                      diceMap,
                  }: {
    title: string;
    diceIds: string[];
    onDropDice: (id: string) => void;
    diceMap: Record<string, Dice[]>;
}) {
    const [over, setOver] = useState(false);
    const allow = (e: React.DragEvent) => e.preventDefault();

    return (
        <div
            className="dice-zone"
            style={{
                background: over ? '#e0f7fa' : 'transparent',
                borderColor: over ? '#039be5' : '#888',
            }}
            onDragOver={allow}
            onDragEnter={() => setOver(true)}
            onDragLeave={() => setOver(false)}
            onDrop={(e) => {
                e.preventDefault();
                setOver(false);
                onDropDice(e.dataTransfer.getData('text/plain'));
            }}
        >
            <span className="zone-title">{title}</span>
            <div style={{display: 'flex', gap: '.5rem', flexWrap: 'wrap'}}>
                {diceIds.map((id) => {
                    const [type, index] = id.split('-'); // Sépare le type et l'indice du dé
                    const dice = diceMap[type][parseInt(index)]; // Récupère l'instance de dé par son type et son index
                    return <DiceComponent key={id} id={id} dice={dice}/>;
                })}
            </div>
        </div>
    );
}

/* ------------------------- APP --------------------------------------- */
export default function App() {

    const [teamA, setTeamA] = useState<string[]>([]);
    const [teamB, setTeamB] = useState<string[]>([]);
    const [scoreA, setScoreA] = useState(0);
    const [scoreB, setScoreB] = useState(0);
    const [level, setLevel] = useState(1);
    const [diceMap, setDiceMap] = useState(generateDiceMap(level));
    const [reserve, setReserve] = useState(() =>
        Object.entries(diceMap).flatMap(([type, diceArray]) =>
            diceArray.map((_, index) => `${type}-${index}`)
        )
    );

    /* déplace l'id vers la destination voulue */
    const move = (id: string, to: 'reserve' | 'A' | 'B') => {
        // retire l'id de toutes les listes
        setReserve((l) => l.filter((x) => x !== id));
        setTeamA((l) => l.filter((x) => x !== id));
        setTeamB((l) => l.filter((x) => x !== id));

        // ajoute à la liste cible
        if (to === 'reserve') setReserve((l) => [...l, id]);
        else if (to === 'A') setTeamA((l) => [...l, id]);
        else setTeamB((l) => [...l, id]);
    };

    /* Fonction de validation */
    const handleValidate = () => {
        let diceTeamA = [];
        let diceTeamB = [];
        for (const id of teamA) {
            const [type, index] = id.split('-');
            diceTeamA.push(diceMap[type][parseInt(index)]);
        }
        for (const id of teamB) {
            const [type, index] = id.split('-');
            diceTeamB.push(diceMap[type][parseInt(index)]);
        }
        let teamValueA = getTeamValue(diceTeamA);
        let teamValueB = getTeamValue(diceTeamB);
        setScoreA(teamValueA);
        setScoreB(teamValueB);
        if (teamValueA === teamValueB) {
            setTimeout(() => {
                let newDiceMap = generateDiceMap(level + 1);
                setDiceMap(newDiceMap);
                setLevel(level + 1);
                setReserve(() =>
                    Object.entries(newDiceMap).flatMap(([type, diceArray]) =>
                        diceArray.map((_, index) => `${type}-${index}`)
                    )
                );
                setTeamA([]);
                setTeamB([]);
                setScoreA(0);
                setScoreB(0);
            }, 2000);
        }
    };

    return (
        <div style={{padding: '1rem'}}>
            <h1 className="levelTitle">{'Niveau ' + level}</h1>
            <h2>Drag &amp; Drop tes dés</h2>

            {/* réserve */}
            <DiceZone
                title="Réserve"
                diceIds={reserve}
                onDropDice={(id) => move(id, 'reserve')}
                diceMap={diceMap}
            />

            {/* équipes */}
            <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                <DiceZone title="Équipe A" diceIds={teamA} onDropDice={(id) => move(id, 'A')} diceMap={diceMap}/>
                <DiceZone title="Équipe B" diceIds={teamB} onDropDice={(id) => move(id, 'B')} diceMap={diceMap}/>
            </div>

            {/* Bouton de validation */}
            <button className="validateBtn" onClick={handleValidate} style={{marginTop: '1rem'}} disabled={reserve.length > 0}>
                Valider
            </button>
            <div style={{marginTop: '1rem'}}>
                <h3>Scores</h3>
                <p>Équipe A: {scoreA}</p>
                <p>Équipe B: {scoreB}</p>
            </div>
            <div>
                <h2 className="winTitle" style={{color: "green"}} hidden={!(scoreA > 0 && scoreB > 0 && scoreB == scoreA)}>OUI OUI OUI OUI
                    C'EST GAGNÉ</h2>
            </div>
        </div>
    );
}
