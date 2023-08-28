import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Color } from "three";

function Rings() {

    const RING_SPACE = 3.5;
    const RING_UNITS = 7;

    const ringsRef = useRef([]);

    useFrame((state) => {

        let elapsedTime = state.clock.getElapsedTime();
        
        for (let i = 0; i < ringsRef.current.length; i++) {
            let mesh = ringsRef.current[i];

            //set z position with distance, move the rings by that distance of same unit
            let z = (i - RING_UNITS) * RING_SPACE + ((elapsedTime * 0.4) % RING_SPACE) * 2;
            mesh.position.set(0, 0, -z);

            //how far is ring away from scene
            let dist = Math.abs(z);
            mesh.scale.set(1 - dist * 0.04, 1 - dist * 0.04, 1 - dist * 0.04);
            
            //set fade out color scale
            let colorScale = 1;
            if (dist > 2) {
                //this will diminish the scale as distance increases and vice versa
                colorScale = 1 - ( Math.min(dist, 12) - 2 ) / 10;
            }
            colorScale *= 0.5;

            //now have alternating ring colours
            if (i % 2 == 1) {
                mesh.material.emissive = new Color(6, 0.15, 0.7).multiplyScalar(colorScale);
            } 
            else {
                mesh.material.emissive = new Color(0.1, 0.7, 3).multiplyScalar(colorScale);
            }
        }
    });

    return (
        <>
        {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((v, i) => (
            <mesh
                castShadow
                receiveShadow
                position={[0, 0, 0]}
                key={i}
                ref={(el) => (ringsRef.current[i] = el)}
            >
            <torusGeometry args={[3.35, 0.05, 16, 100]} />
            <meshStandardMaterial emissive={[0.5, 0.5, 0.5]} color={[0, 0, 0]} />
            </mesh>
        ))}
        </>
    );
}

export default Rings