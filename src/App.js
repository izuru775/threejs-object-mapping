import "./App.css";
import * as THREE from "three";
import React, { Suspense, useState } from "react";
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

import { Plane } from "./Plane";
import axios from "axios";

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
const Model = () => {
  const fbx = useFBX("https://vespascooter.s3.ap-southeast-2.amazonaws.com/vespa.fbx");
  return (
    <>
     <primitive object={fbx} dispose={null} />;
    </>
  );
};

function App() {
  const baseURL = "/api";
  axios
    .get(baseURL)
    .then((result) => {
      if (result.data.data[0].environmentName === "VRPlane") {
        const { environmentName, environmentCreator, vrObject } =
          result.data.data[0];
        const { url, position, scale, rotation } = vrObject[0];
      }
    })
    .catch((err) => console.log(err));
    
  return (
    <Canvas camera={{ fov: 35 }}>
      <Sky sunPosition={[100, 5, 50]} />
      <ambientLight intensity={0.5} />
      <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
      <Physics gravity={[0, -30, 0]}>
        <Suspense>
          <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <Plane />
          </mesh>
        </Suspense>

        <Suspense>
          <mesh scale={[0.10, 0.10, 0.10]} position={[20, 0, -15]}>
            <Model/>
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
