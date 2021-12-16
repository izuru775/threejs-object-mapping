import * as THREE from "three";
import React from "react";
import {
    OrbitControls,
    Stars,
    useFBX,
    PointerLockControls,
    Sky,
  } from "@react-three/drei";


export const Statue = (props) => {
    let fbx = useFBX("statue.fbx");
    // wrap fbx in primitive.
    return (
      <mesh>
        <primitive
          object={fbx}
          dispose={null}
        />
      </mesh>
    );
  };