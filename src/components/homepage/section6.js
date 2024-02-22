import style from "./section6.module.css";
import { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import SceneInit from '../../utils/SceneInit';

// const Model = () => {
//   const group = useRef();
//   const { scene } = useThree(); // Access the scene from the fiber context

//   useEffect(() => {
//     const mtlLoader = new MTLLoader();
//     mtlLoader.load('/flower1.mtl', function (materials) {
//       materials.preload();
//       const objLoader = new OBJLoader();
//       objLoader.setMaterials(materials);
//       objLoader.load('/flower1.obj', function (object) {
//         group.current.add(object); // Use the group ref to add the object to the scene
//       });
//     });
//   }, []); // Empty dependency array to run the effect only once on mount

//   return <group ref={group} scale={.7}/>;
// };

function section6() {
  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initialize();

    // const boxGeometry = new THREE.BoxGeometry(8, 8, 8);
    // const boxMaterial = new THREE.MeshNormalMaterial();
    // const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    // test.scene.add(boxMesh);

    let loadedModel;
    const glftLoader = new GLTFLoader();
    glftLoader.load('/flower1.gltf', (gltfScene) => {
      loadedModel = gltfScene;
      // console.log(loadedModel);

      gltfScene.scene.position.y = 3;
      gltfScene.scene.scale.set(10, 10, 10);
      test.scene.add(gltfScene.scene);
    });
  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default section6;