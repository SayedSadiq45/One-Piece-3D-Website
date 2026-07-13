"use client";

import { forwardRef, ReactNode } from "react";
import { Float } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";

import { SodaCan, SodaCanProps } from "@/components/SodaCan";
import { Group } from "three";

type FloatingCanProps = Omit<GroupProps, "flavor"> & {
  flavor?: SodaCanProps["flavor"];
  floatSpeed?: number;
  rotationIntensity?: number;
  floatIntensity?: number;
  floatingRange?: [number, number];
  children?: ReactNode;
};

const FloatingCan = forwardRef<Group, FloatingCanProps>(
  (
    {
      flavor = "luffy",
      floatSpeed = 1.5,
      rotationIntensity = 1,
      floatIntensity = 1,
      floatingRange = [-0.1, 0.1],
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <group ref={ref} {...props}>
        <Float
          speed={floatSpeed}
          rotationIntensity={rotationIntensity}
          floatIntensity={floatIntensity}
          floatingRange={floatingRange}
        >
          {children}
          <SodaCan flavor={flavor} />
        </Float>
      </group>
    );
  },
);

FloatingCan.displayName = "FloatingCan";

export default FloatingCan;
