import * as THREE from "three";
import { Physics, useBox, usePlane } from "@react-three/cannon";
import Ground from "./assets/rough-ground.jpg";
import { Canvas, useLoader } from "@react-three/fiber";

export const Plane=(props)=> {
    const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0] }));
    const texture = useLoader(THREE.TextureLoader, Ground);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(200, 200);
    return (
      <mesh >
        <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
        <meshLambertMaterial attach="material" map={texture} />
      </mesh>
    );
  }