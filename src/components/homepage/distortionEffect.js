import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useLoader, extend, useThree, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from "three";
import { shaderMaterial } from '@react-three/drei';
import glsl from 'glslify';
import styles from "./distortionEffect.module.css"

// Define your shader material extending it with uniforms for the texture
const DistortionShaderMaterial = shaderMaterial(
  // Uniforms (add your texture uniform here)
  { 
    uTexture: null,
    uDataTexture: null,
    uMouse: new THREE.Vector2(),
    uResolution: new THREE.Vector2(),
    uStrength: 0.3,
    uRadius: 0.3
  },
  // Vertex Shader
  glsl`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader (use the texture in your shader)
  glsl`
    uniform sampler2D uTexture;
    uniform sampler2D uDataTexture;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    uniform float uRadius;
    uniform float uStrength;
    varying vec2 vUv;
    void main() {
      vec2 newUV = (vUv - vec2(0.5)) + vec2(0.5);
      vec2 mousePos = uMouse / uResolution;
      vec2 pos = gl_FragCoord.xy / uResolution.xy;
      float dist = distance(pos, mousePos);
      vec4 color = texture2D(uTexture,vUv);
      vec4 offset = texture2D(uDataTexture,vUv);
      if (dist < uRadius) {
        gl_FragColor = texture2D(uTexture,newUV - uStrength * offset.rg * (uRadius - dist)); // Blue color within the circle
      } else {
        // vec4 textureColor = texture2D(uTexture,newUV - 0.02*offset.rg);
        gl_FragColor = color; // Original texture color outside the circle
      }

      gl_FragColor = texture2D(uTexture,newUV - uStrength * offset.rg);
    }
  `
);

extend({ DistortionShaderMaterial });

// Create a component that uses the shader material
const DistortionEffect = () => {
  const { size } = useThree();
  const texture = useLoader(TextureLoader, './Mushroom Full Piece.png'); // Load the texture
  const materialRef = useRef(null);
  const [dataTexture, setDataTexture] = useState(null);
  const gridSize = 32;
  const [prevMouse, setPrevMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const data = new Uint8Array(gridSize * gridSize * 4);
    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.random() * 255;
      data[i + 1] = Math.random() * 255;
      data[i + 2] = Math.random() * 255;
      data[i + 3] = 255;
    }
    const texture = new THREE.DataTexture(data, gridSize, gridSize, THREE.RGBAFormat);
    texture.magFilter = texture.minFilter = THREE.NearestFilter;
    texture.needsUpdate = true;
    setDataTexture(texture);
  }, [])

  useEffect(() => {
    if (!materialRef.current) {
      return;
    }
    materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
  }, [size, dataTexture])

  useFrame((state) => {
    const { pointer } = state;
    const x = (pointer.x + 1.0) * size.width;
    const y = (pointer.y + 1.0) * size.height;
    materialRef.current.uniforms.uMouse.value.set(x, y);

    let data = dataTexture.image.data;
    // loop through all the pixels of dataTexture
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        
        let gridPos = new THREE.Vector2((i / gridSize - 0.5) * 2, (j / gridSize - 0.5) * 2);
        
        let distance = gridPos.distanceTo(new THREE.Vector2(pointer.x, pointer.y));
        if (distance < 0.25) {
          let index = 4 * (i + gridSize * j); // get the pixel coordinate on screen
          // data[index] = Math.abs(pointer.x - prevMouse.x) * 1500; // mouse speed
          // data[index + 1] = Math.abs(pointer.y - prevMouse.y) * 1500; // mouse speed
          data[index] = 255 / 0.2 * (0.25 - distance) * 0.7; // mouse speed
          data[index + 1] = 255 / 0.2 * (0.25 - distance) * 0.7; // mouse speed
        }
      }
    }
    // slowly move system towards 0 distortion
    for (let i = 0; i < data.length; i += 4) {
      data[i] *= 0.9
      data[i + 1] *= 0.9
    }
    dataTexture.needsUpdate = true;
    setPrevMouse({ x: pointer.x, y: pointer.y });
  });

  return (
    <mesh>
      <planeGeometry args={[10, 10]} />
      {dataTexture && <distortionShaderMaterial ref={materialRef} uTexture={texture} uDataTexture={dataTexture} />}
    </mesh>
  );
};

// Your Canvas component where you render the scene
const Scene = () => {
  return (
    <div className={styles.background}>
      <Canvas>
        <DistortionEffect />
      </Canvas>
    </div>
  )
};

export default Scene;
