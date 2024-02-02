import * as THREE from "three";
import React, { useRef, useState, Suspense, forwardRef, useMemo } from "react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import {
    shaderMaterial,
    OrbitControls,
    usePerformanceMonitor,
} from "@react-three/drei";
import { MathUtils, Vector2 } from "three";

import vertShader from "../shader/gradientVertex.glsl";
import fragShader from "../shader/gradientFragment.glsl";
import {
    EffectComposer,
    Bloom,
    HueSaturation,
} from "@react-three/postprocessing";

import styles from "./background.module.css";
import { useControls } from "leva";

const GradientMaterial = shaderMaterial(
    // Uniforms
    {
        uTime: 0,
        uColor1: new THREE.Color(0xff813a),
        uColor2: new THREE.Color(0xdf43ff),
        uColor3: new THREE.Color(0x426bff),
        uColor4: new THREE.Color(0xeafba1),
        uMouse: new THREE.Vector3(0.0, 0.0, 0.0),
        uNoiseFreq: 15,
        uNoiseAmp: 0.6,
        uNoiseSpeed: 0.03,
        uOffset1: 0.03,
        uOffset2: 0.17,
        uOffset3: 0.05,
        uSmoothstepMin: 0.1,
        uSmoothstepMax: 0.5,
        uDistRadius: 0.1,
        uSeed: MathUtils.randFloat(0, 10000),
    },
    vertShader,
    fragShader
);

extend({ GradientMaterial });

const GradientEffect = (props) => {
    const ref = useRef();

    useFrame(({ clock, raycaster, scene }) => {
        ref.current.uTime = clock.getElapsedTime();

        // get point where ray intersects sphere
        const intersections = raycaster.intersectObjects(scene.children);
        if (intersections.length >= 1) {
            ref.current.uMouse = intersections[0].point;
        }
    });

    // comment this for final version
    // const { uColor1,
    //   uColor2,
    //   uColor3,
    //   uNoiseFreq,
    //   uNoiseAmp,
    //   uNoiseSpeed,
    //   uOffset1,
    //   uOffset2,
    //   uSmoothstepMin,
    //   uSmoothstepMax,
    //   uDistRadius,
    //   uSeed } = useControls({ uColor1: '#ff813a',
    //                           uColor2: '#df43ff',
    //                           uColor3: '#426bff',
    //                           uNoiseFreq: 15,
    //                           uNoiseAmp: 0.5,
    //                           uNoiseSpeed: 0.03,
    //                           uOffset1: 0.03,
    //                           uOffset2: 0.17,
    //                           uSmoothstepMin: 0.1,
    //                           uSmoothstepMax: 0.5,
    //                           uDistRadius: 0.1,
    //                           uSeed: MathUtils.randFloat(0, 10000) })

    return (
        <mesh>
            <sphereGeometry args={[1.5, 64, 32]} />
            {/* also replace this w below for final version */}
            {/* <gradientMaterial uColor1={uColor1}
                        uColor2={uColor2}
                        uColor3={uColor3}
                        uNoiseFreq={uNoiseFreq}
                        uNoiseAmp={uNoiseAmp}
                        uNoiseSpeed={uNoiseSpeed}
                        uOffset1={uOffset1}
                        uOffset2={uOffset2}
                        uSmoothstepMin={uSmoothstepMin}
                        uSmoothstepMax={uSmoothstepMax}
                        uDistRadius={uDistRadius}
                        uSeed={uSeed}
                        ref={ref} 
                        side={THREE.DoubleSide}
                         /> */}
            <gradientMaterial ref={ref} side={THREE.DoubleSide} />
        </mesh>
    );
};

const Droplet = () => {
    const { viewport } = useThree();
    const dropletRef = useRef();
    // const { scale } = useControls({ scale: 0.07 })

    useFrame(({ mouse }) => {
        const mouseX = (mouse.x * viewport.width) / 2;
        const mouseY = (mouse.y * viewport.height) / 2;
        const currentX = dropletRef.current.position.x;
        const currentY = dropletRef.current.position.y;
        const diff = new Vector2(mouseX - currentX, mouseY - currentY);

        const easing = 0.05;

        dropletRef.current.position.x += diff.x * easing;
        dropletRef.current.position.y += diff.y * easing;
    });

    return (
        <mesh position={dropletRef.mouse} ref={dropletRef} scale={0.15}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshPhysicalMaterial
                roughness={0}
                transmission={1}
                thickness={20}
            />
        </mesh>
    );
};

const Scene = (props) => {
    return (
        <>
            <GradientEffect />
            {props.home ? <Droplet /> : null}

            <EffectComposer>
                <HueSaturation saturation={0.5} />
                <Bloom />
            </EffectComposer>
        </>
    );
};

// home: if true then it shows the interactive blob thing
export function Background(props) {
    return (
        <div className={styles.background}>
            <Canvas camera={{ position: [0, 0, 1], fov: 40 }}>
                {/* <OrbitControls /> */}
                <Suspense fallback={null}>
                    <Scene home={props.home} debug={props.debug} />
                </Suspense>
            </Canvas>
        </div>
    );
}
