import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';

function completeTask(e) {
    console.log(e.target.parentElement.querySelector("Lottie"))
}


export default function Check({ done }) {
    const { rive, RiveComponent } = useRive({
        src: '../checkmark.riv',
        autoplay: true,
        stateMachines: "based",
        layout: new Layout({
            fit: Fit.Fill,
            alignment: Alignment.TopCenter,
        }),
    });
    if (done) {
        return (
            <div className="done circle-container">
                <button onClick={completeTask} className="circle">
                    <div className="check">
                        <RiveComponent />
                    </div>
                </button>
            </div>
        )
    }
    else {
        return (
            <div className="circle-container">
                <button onClick={completeTask} className="circle">
                    <div className="check">
                        <RiveComponent className="animation" />
                    </div>
                </button>
            </div>
        )
    }
}