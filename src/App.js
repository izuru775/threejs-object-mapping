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
import { IceCream } from "./IcecreamCart";
import { Statue } from "./Statue";
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

function App() {
  const baseURL = "/api";
    const [objects, setObjects] = useState();
    axios
      .get(baseURL)
      .then((result) => {
        if (result.data.data[0].environmentName === "VRPlane") {
          const { environmentName, environmentCreator, vrObject } =
            result.data.data[0];
          const { url, position, scale, rotation } = vrObject[0];
          console.log(url)
          let fbx = useFBX("icecream.fbx");
          (<mesh>
            <primitive object={fbx} dispose={null} />
          </mesh>)
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
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[50, 0, 10]}
            scale={[[0.05, 0.05, 0.05]]}
          >
            <IceCream />
          </mesh>
        </Suspense>

        <Suspense>
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[-30, 0, 20]}
            scale={[0.05, 0.05, 0.05]}
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
