import React, { useEffect } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";

function Car() {
    
    const gltf = useLoader(
        GLTFLoader,
        "models/car/scene.gltf"
    )
    
    useEffect(() => {
        gltf.scene.scale.set(0.005, 0.005, 0.005);
        gltf.scene.position.set(0, -0.035, 0);
        gltf.scene.traverse((object) => {
            if (object instanceof Mesh){
                object.castShadow = true;
                object.receiveShadow = true;
                object.material.envMapIntensity = 20;
            }
        })
    }, [gltf]);

    //spin the car wheels
    useFrame((state, delta) => {
        let elapsedTime = state.clock.getElapsedTime();

        let wheelGroup = gltf.scene.children[0].children[0].children[0];
        //find the indexs of the sub-mesh to rotate
        wheelGroup.children[0].rotation.x = elapsedTime * 2;
        wheelGroup.children[2].rotation.x = elapsedTime * 2;
        wheelGroup.children[4].rotation.x = elapsedTime * 2;
        wheelGroup.children[6].rotation.x = elapsedTime * 2;
    });
  
    return (
        <primitive object={gltf.scene}/>
    )
}

export default Car