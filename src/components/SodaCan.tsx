"use client";

import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

useGLTF.preload("/Soda-can.gltf");

// One Piece character can labels — replace the placeholder PNGs in
// /public/labels with your own art. Size: 1086 x 583 px (wraps the can).
const flavorTextures = {
  luffy: "/labels/luffy.png",
  zoro: "/labels/zoro.png",
  nami: "/labels/nami.png",
  sanji: "/labels/sanji.png",
  chopper: "/labels/chopper.png",
  ace: "/labels/ace.png",
};

// ─── Front-facing adjustment ────────────────────────────────────────────
// The label image wraps the full 360° of the can. This value slides that
// wrap left/right so you can choose exactly which part of the image faces
// the camera by default (the carousel, hero, etc. all use this rotation).
//
// Range 0–1 (it wraps around, so 1 === 0). If your character's face is on
// the side or back of the can, nudge this number — try 0, 0.25, 0.5, 0.75
// and refresh, then fine-tune from there until the face is dead center.
const LABEL_FRONT_OFFSET = 0.5;

const metalMaterial = new THREE.MeshStandardMaterial({
  roughness: 0.3,
  metalness: 1,
  color: "#bbbbbb",
});

export type SodaCanProps = {
  flavor?: keyof typeof flavorTextures;
  scale?: number;
};

export function SodaCan({
  flavor = "luffy",
  scale = 2,
  ...props
}: SodaCanProps) {
  const { nodes } = useGLTF("/Soda-can.gltf");

  const labels = useTexture(flavorTextures);

  Object.values(labels).forEach((texture) => {
    // Fixes upside down labels
    texture.flipY = false;
    // Lets us rotate the label around the can via offset (below)
    texture.wrapS = THREE.RepeatWrapping;
    texture.offset.x = LABEL_FRONT_OFFSET;
  });

  const label = labels[flavor];

  return (
    <group {...props} dispose={null} scale={scale} rotation={[0, -Math.PI, 0]}>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.cylinder as THREE.Mesh).geometry}
        material={metalMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.cylinder_1 as THREE.Mesh).geometry}
      >
        <meshStandardMaterial roughness={0.15} metalness={0.7} map={label} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Tab as THREE.Mesh).geometry}
        material={metalMaterial}
      />
    </group>
  );
}
