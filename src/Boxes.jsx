import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";


function Box({color}) {

    const BOX_Z_DIRECTION = -10;

    const box = useRef();
    const time = useRef(0);
    
    const [position, setPosition] = useState(getInitialPosition());
    const [xRotationSpeed] = useState(() => Math.random());
    const [yRotationSpeed] = useState(() => Math.random());
    
    //basically elevating and randomize the scale for box
    const [scale] = useState(() => Math.pow(Math.random(), 2.0) * 0.5 + 0.05);

    function getInitialPosition() {
        let vector = new Vector3((Math.random() * 2 - 1) * 3, Math.random() * 2.5 + 0.1, (Math.random() * 2 - 1) * 15); 
        if(vector.x < 0) vector.x -= 1.75;
        if(vector.x > 0) vector.x += 1.75;
    
        return vector;
    }

    function resetPosition() {
        let vector = new Vector3((Math.random() * 2 - 1) * 3, Math.random() * 2.5 + 0.1, Math.random() * 10 + 10); 
        if(vector.x < 0) vector.x -= 1.75;
        if(vector.x > 0) vector.x += 1.75;
    
        setPosition(vector);
    }

    useFrame((state, delta) => {

        //get the time in frame everytime there was update in it
        time.current += delta * 1.2;
        let newZ = position.z - (time.current);
        
        if (newZ < BOX_Z_DIRECTION) {
            resetPosition();
            time.current = 0;
        }

        box.current.position.set(position.x, position.y, newZ);
        box.current.rotation.x += delta * xRotationSpeed;
        box.current.rotation.y += delta * yRotationSpeed;
    }, [xRotationSpeed, yRotationSpeed, position]);

    return (
        <mesh ref={box} scale={scale} castShadow>
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color={color} envMapIntensity={0.15}/>
        </mesh>
    )
}


function Boxes(){
    const [array] = useState(() => {
        let item = [];
        for(let i = 0; i < 100; i++) item.push(0);
        return item;
    });
    
    //create many boxes
    return <>
        {array.map((element, index) => <Box key={index} color={index % 2 === 0 ? [0.4, 0.1, 0.1] : [0.05, 0.15, 0.4] }/>)}
    </>
}

export default Boxes