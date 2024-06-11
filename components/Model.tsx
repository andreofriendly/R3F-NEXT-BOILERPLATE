import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh } from 'three';
import { MeshTransmissionMaterial, Text } from '@react-three/drei';
import { useControls } from 'leva';
import { iridescence } from 'three/examples/jsm/nodes/Nodes.js';

export default function Model() {
    const { viewport } = useThree();
    const torusRef = useRef<Mesh>(null);

    useFrame(() => {
        if (torusRef.current) {
            torusRef.current.rotation.y += 0.01;
        }
    });

    const materialProps = useControls({
        thickness: { value: 0.5, min: 0, max: 3, step: 0.05 },
        roughness: { value: 0.2, min: 0, max: 1, step: 0.1 },
        iridescence: { value: 0.2, min: 0, max: 1, step: 0.1 },
        transmission: {value: 1, min: 0, max: 1, step: 0.1},
        ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
        chromaticAberration: { value: 0.02, min: 0, max: 1},
        backside: { value: false},
    })
    

    return (
        <group scale={viewport.width / 3.75}>
            <Text 
                font={'/fonts/PPNeueMontreal-Bold.otf'} 
                position={[0, 0, -1]} 
                fontSize={0.5} 
                color="white" 
                anchorX="center" 
                anchorY="middle"
            >
                R3F + NEXTJS
            </Text>

            <mesh ref={torusRef} scale={[0.05, 0.05, 0.05]} rotation={[45,0,0]}>
                <torusGeometry args={[10, 3, 16, 100]} />
                <MeshTransmissionMaterial {...materialProps}/>
            </mesh>
        </group>
    );
}
