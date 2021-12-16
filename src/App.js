import "./App.css";
import * as THREE from "three";
import React, { Suspense } from "react";
import { Player } from "./Player";
import { Canvas, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  Stars,
  useFBX,
  PointerLockControls,
  Sky,
} from "@react-three/drei";
import { Physics, useBox, usePlane } from "@react-three/cannon";
import Ground from "./assets/rough-ground.jpg";
import { IceCream } from "./IcecreamCart";
import { Statue } from "./Statue";
import { Plane } from "./Plane";

const statueData = {
  Name: "statue",
  Creator: "unkown",
  vrObject: [
    {
      url: "statue.fbx",
      position: [-100, 0, 15],
      scale: [0.05, 0.05, 0.05],
      rotation: [-Math.PI / 2, 0, 0],
    },
  ],
};
const cartData = {
  Name: "icecream-cart",
  Creator: "unkown",
  vrObject: [
    {
      url: "icecream.fbx",
      position: [50, 0, 10],
      scale: [0.05, 0.05, 0.05],
      rotation: [-Math.PI / 2, 0, 0],
    },
  ],
};
const planeData = {
  Name: "plane",
  Creator: "unkown",
  vrObject: [
    {
      url: "",
      position: [0, 0, 0],
      rotation: [-Math.PI / 2, 0, 0],
    },
  ],
};

// function Box() {
//   const [ref, api] = useBox(() => ({ mass: 1, position: [0, 2, 0] }));
//   return (
//     <mesh
//       onClick={() => {
//         api.velocity.set(0, 2, 0);
//       }}
//       ref={ref}
//       position={[0, 2, 0]}
//     >
//       <boxBufferGeometry attach="geometry" />
//       <meshLambertMaterial attach="material" color="hotpink" />
//     </mesh>
//   );
// }

function App() {
  return (
    <Canvas camera={{ fov: 35 }}>
      <Sky sunPosition={[100, 5, 50]} />
      <ambientLight intensity={0.5} />
      <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
      <Physics gravity={[0, -30, 0]}>
        <Suspense>
          <mesh
            position={planeData.vrObject[0].position}
            rotation={planeData.vrObject[0].rotation}
          >
            <Plane />
          </mesh>
        </Suspense>

        <Suspense>
          <mesh
            rotation={cartData.vrObject[0].rotation}
            position={cartData.vrObject[0].position}
            scale={cartData.vrObject[0].scale}
          >
            <IceCream />
          </mesh>
        </Suspense>

        <Suspense>
          <mesh
            rotation={statueData.vrObject[0].rotation}
            position={statueData.vrObject[0].position}
            scale={statueData.vrObject[0].scale}
          >
            <Statue />
          </mesh>
        </Suspense>

        {/* <OrbitControls /> */}
        <Player />
      </Physics>
      <PointerLockControls />
    </Canvas>
  );
}

export default App;
