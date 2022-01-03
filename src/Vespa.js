import * as THREE from "three";
import React from "react";
import {
    OrbitControls,
    Stars,
    useFBX,
    PointerLockControls,
    Sky,
  } from "@react-three/drei";


export const Vespa = (props) => {
    let fbx = useFBX("vespa.fbx");
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