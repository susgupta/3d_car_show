import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { RepeatWrapping, TextureLoader } from "three";

function FloatingGrid() {

    //const FLOOR_Y_POSITION = 0.425;
    const FLOOR_Y_POSITION = 0;

    const diffuse = useLoader(TextureLoader, "textures/grid-texture.png");

    useEffect(() => {
        diffuse.wrapS = RepeatWrapping;
        diffuse.wrapT = RepeatWrapping;
        diffuse.anisotropy = 4;
        diffuse.repeat.set(30, 30);
        diffuse.offset.set(0, 0);
    }, [diffuse]);

    //animate the grid, use this hook on per frame basis
    useFrame((state, delta) => {
        let timeDifference = state.clock.getElapsedTime() * 0.70;
        //basically give the impression that floor is moving, really just offsetting the texture
        diffuse.offset.set(0, timeDifference);
    });

    return (
        <mesh rotation-x={-Math.PI * 0.5} position={[0, FLOOR_Y_POSITION, 0]}>
            <planeGeometry args={[35, 35]} />
            <meshBasicMaterial 
                color={[1, 1, 1]}
                opacity={[0.15]}
                map={diffuse}
                alphaMap={diffuse}
                transparent={true}
            />
        </mesh>
    )
}

export default FloatingGrid