import React from "react";

interface MeasurementSelectorProps {
    options: string[];
    selected: string[];
    onToggle: (value: string) => void;
}

const MeasurementSelector: React.FC<MeasurementSelectorProps> =({ options, selected, onToggle}) => {
    return (
        <div>
            <h3>Select Measurement</h3>
            <ul style = {{listStyle :'none', padding :0}}>
                {options.map((m) => (
                    <li key={m}>
                        <label >
                            <input
                                type="checkbox"
                                checked={selected.includes(m)}
                                onChange={() => onToggle(m)}
                            />
                            <span style={{marginLeft: '8px'}}>{m}</span>
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default MeasurementSelector;