import { useState } from "react";

export function LifecycleDemo() {
    console.log("1️⃣ Component LifecycleDemo được gọi!");
    return <div><h3>Lifecycle Demo (F12 xem log)</h3></div>;
}

export function BadCounter() {
    let count = 0; 
    return (
        <div>
            <h3>Bad Counter: {count}</h3>
            <button onClick={() => { count++; console.log(count); }}>Tăng biến thường</button>
        </div>
    );
}

export function GoodCounter() {
    const [count, setCount] = useState(0);
    return (
        <div>
            <h3>Good Counter: {count}</h3>
            <button onClick={() => setCount(count + 1)}>Tăng useState</button>
        </div>
    );
}

export function FlowDemo() {
    const [step, setStep] = useState(1);
    return (
        <div>
            <h3>Flow Demo - Bước: {step}</h3>
            <button onClick={() => setStep(step + 1)}>Tiếp theo</button>
            {step === 1 && <p>Bước 1</p>}
            {step === 2 && <p>Bước 2</p>}
        </div>
    );
}