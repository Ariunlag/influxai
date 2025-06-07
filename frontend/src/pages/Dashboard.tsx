import React, {useState} from "react";
import MeasurementSelector from "../components/MeasurementSelector";

const Dashboard: React.FC =() =>{
    const [allMeasurements]= useState([
        'Chicagohome_001/humidity',
        'Chicagohome_002/humidity',
        'Chicagohome_003/temperature',
        'Chicagohome_004/pressure',
    ]);

    const [selected, setSelected] = useState<string[]>([]);

    const handleToggle = (value: string) =>{
        setSelected((prev)=>
        prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    )
    console.log("Selected: ", selected)
}

    return (
        <div>
            <h2>IoT Dashboard</h2>
            <MeasurementSelector
                options={allMeasurements}
                selected={selected}
                onToggle={handleToggle}
            />
        </div>
    )
}

export default Dashboard;