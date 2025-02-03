/**
 * 
 */
import { useEffect } from 'react';

//import * as THREE from 'three';
import SceneInit from './lib/SceneInit';
import GuiInit from './lib/GuiInit';
import CylinderMaker from './lib/CylinderMaker';
import DataOBJClass from './lib/DataOBJClass';

function App() {
  useEffect(() => {
    // Scene gen
    const sceneInit = new SceneInit('myThreeJsCanvas');
    sceneInit.initialize();
    sceneInit.animate();
    
    let scene = sceneInit.getScene();
    let grid = sceneInit.getGrid();

    // data class
    const dataOBJClass = new DataOBJClass(); 
    let dataOBJ = dataOBJClass.get();
    console.log(dataOBJ);
    // mk cylinder class 
    const c_mkr = new CylinderMaker( dataOBJ, scene, grid );
    // gui class 
    const gui_Init = new GuiInit(c_mkr);
    gui_Init.initialize();

    //c_mkr.makeCylinder();

    // const boxGeometry = new THREE.BoxGeometry(12, 12, 12);
    // const boxMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    // const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    // test.scene.add(boxMesh);

    // PART 1 - Initialize
    //const gui = new GUI();

    // PART 2 - Changing Geometry (scale, rotation)
    // gui.add(boxMesh.rotation, 'x', 0, Math.PI).name('Rotate X Axis');
    // gui.add(boxMesh.rotation, 'y', 0, Math.PI).name('Rotate Y Axis');
    // gui.add(boxMesh.rotation, 'z', 0, Math.PI).name('Rotate Z Axis');
    // gui.add(boxMesh.scale, 'x', 0, 2).name('Scale X Axis');
    // gui.add(boxMesh.scale, 'y', 0, 2).name('Scale Y Axis');
    // gui.add(boxMesh.scale, 'z', 0, 2).name('Scale Z Axis');

    // const boxGeometry = new THREE.BoxGeometry(12, 12, 12);
    // const boxMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    // const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

    // const myObject = {
    //   addBox: function() {
    //     test.scene.add(boxMesh);
    //   },
    //   removeBox: function() {
    //     test.scene.remove(boxMesh)
    //   }
    // };

    // gui.add( myObject, 'addBox' ); // Button
    // gui.add( myObject, 'removeBox' ); // Button


    // PART 3 - Updating Material (color, wireframe)
    // const materialParams = {
    //   boxMeshColor: boxMesh.material.color.getHex(),
    // };
    // gui.add(boxMesh.material, 'wireframe');
    // gui
    //   .addColor(materialParams, 'boxMeshColor')
    //   .onChange((value) => boxMesh.material.color.set(value));

    // PART 4 - Refactor GUI with Folders
    // const geometryFolder = gui.addFolder('Mesh Geometry');
    // geometryFolder.open();
    // const rotationFolder = geometryFolder.addFolder('Rotation');
    // rotationFolder.add(boxMesh.rotation, 'x', 0, Math.PI).name('Rotate X Axis');
    // rotationFolder.add(boxMesh.rotation, 'y', 0, Math.PI).name('Rotate Y Axis');
    // rotationFolder.add(boxMesh.rotation, 'z', 0, Math.PI).name('Rotate Z Axis');
    // const scaleFolder = geometryFolder.addFolder('Scale');
    // scaleFolder.add(boxMesh.scale, 'x', 0, 2).name('Scale X Axis');
    // scaleFolder.add(boxMesh.scale, 'y', 0, 2).name('Scale Y Axis');
    // scaleFolder.add(boxMesh.scale, 'z', 0, 2).name('Scale Z Axis');
    // scaleFolder.open();

    // const materialFolder = gui.addFolder('Mesh Material');
    // const materialParams = {
    //   boxMeshColor: boxMesh.material.color.getHex(),
    // };
    // materialFolder.add(boxMesh.material, 'wireframe');
    // materialFolder
    //   .addColor(materialParams, 'boxMeshColor')
    //   .onChange((value) => boxMesh.material.color.set(value));

    // PART 5 - Custom Function
    // const customFunctionFolder = gui.addFolder('Custom Function');
    // customFunctionFolder.open();
    // const customParams = {
    //   printHello: false,
    // };
    // customFunctionFolder
    //   .add(customParams, 'printHello')
    //   .name('Print "Hello!"')
    //   .onChange((value) => {
    //     if (value === true) {
    //       console.log('Hello!');
    //     }
    //   });

    
    // Destroy the GUI on reload to prevent multiple stale UI from being displayed on screen.
    return () => {
      gui_Init.gui.destroy();
    };
  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;
