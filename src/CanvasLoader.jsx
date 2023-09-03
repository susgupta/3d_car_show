import { Html, useProgress } from "@react-three/drei";

function CanvasLoader () {

    const { progress } = useProgress();

    return (
        <Html
            as='div'
            center
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
            }}
        >
        
        <p
            style={{
                fontSize: 40,
                color: "#F1F1F1",
                fontWeight: 800,
                marginTop: 40
            }}
        >
            Loading...<br />
        </p>
        
        <span className='canvas-loader'></span>

        <p
            style={{
                fontSize: 40,
                color: "#F1F1F1",
                fontWeight: 800,
                marginTop: 40
            }}
        >
            {progress.toFixed(2)}%
        </p>

       </Html>
    )
}

export default CanvasLoader