/**
 *  Scene File for init 
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';

export default class SceneInit {
  constructor(canvasId) {
	// NOTE: Core components to initialize Three.js app.
	this.scene = new THREE.Scene();
	this.camera = undefined;
	this.renderer = undefined;

	// NOTE: Camera params;
	this.fov = 45;
	this.nearPlane = 1;
	this.farPlane = 200;
	this.canvasId = canvasId;

	// NOTE: Additional components.
	this.clock = undefined;
	this.stats = undefined;
	this.controls = undefined;

	// NOTE: Lighting is basically required.
	this.ambientLight = undefined;
	this.directionalLight = undefined;

	this.grid = undefined;
  }

  getScene()
  {
	return this.scene
  }

  getGrid()
  {
	return this.grid;
  }

  initialize() 
  {
	//this.scene = new THREE.Scene();
	this.camera = new THREE.PerspectiveCamera(
	  this.fov,
	  window.innerWidth / window.innerHeight,
	  1,
	  1000
	);
	this.camera.position.z = 48;

	// NOTE: Specify a canvas which is already created in the HTML.
	const canvas = document.getElementById(this.canvasId);
	this.renderer = new THREE.WebGLRenderer({
	  canvas,
	  // NOTE: Anti-aliasing smooths out the edges.
	  antialias: true,
	});
	this.renderer.setSize(window.innerWidth, window.innerHeight);
	// this.renderer.shadowMap.enabled = true;
	document.body.appendChild(this.renderer.domElement);

	this.clock = new THREE.Clock();
	this.controls = new OrbitControls(this.camera, this.renderer.domElement);
	this.stats = Stats();
	document.body.appendChild(this.stats.dom);

	// ambient light which is for the whole scene
	this.ambientLight = new THREE.AmbientLight(0xffffff, 1);
	this.ambientLight.castShadow = true;
	this.scene.add(this.ambientLight);

	// directional light - parallel sun rays
	this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
	// this.directionalLight.castShadow = true;
	this.directionalLight.position.set(10, 32, 64);
	//this.scene.add(this.directionalLight);

	// if window resizes
	window.addEventListener('resize', () => this.onWindowResize(), false);

	// sky box 
	this.scene.background = new THREE.CubeTextureLoader()
    .setPath( './sky/' )
    .load([
      'skybox_px.jpg',
      'skybox_nx.jpg',
      'skybox_py.jpg',
      'skybox_ny.jpg',
      'skybox_pz.jpg',
      'skybox_nz.jpg'
    ]);

	// light 
	const light = new THREE.DirectionalLight( 0xffffff, 3 );
    light.position.set( 1.0, 1.0, 1.0 ).normalize();
    this.scene.add( light );
	// light 
    const light1 = new THREE.DirectionalLight( 0xffffff, 3 );
    light1.position.set( -1.0, -1.0, -1.0 ).normalize();
    this.scene.add( light1 );
	// light 
    // const light2 = new THREE.DirectionalLight( 0xffffff, 5 );
    // light1.position.set( 1.0, -1.0, 1.0 ).normalize();
    // this.scene.add( light2 );
	
	// grid 
    this.grid = new THREE.GridHelper( 100, 100, 0xffffff, 0x7b7b7b );
	this.scene.add( this.grid );
	console.log(this.grid.position);


	// NOTE: Load space background.
	// this.loader = new THREE.TextureLoader();
	// this.scene.background = this.loader.load('./pics/space.jpeg');

	// NOTE: Declare uniforms to pass into glsl shaders.
	// this.uniforms = {
	//   u_time: { type: 'f', value: 1.0 },
	//   colorB: { type: 'vec3', value: new THREE.Color(0xfff000) },
	//   colorA: { type: 'vec3', value: new THREE.Color(0xffffff) },
	// };
  }


  animate() {
	// NOTE: Window is implied.
	// requestAnimationFrame(this.animate.bind(this));
	window.requestAnimationFrame(this.animate.bind(this));
	this.render();
	this.stats.update();
	this.controls.update();
  }

  render() {
	// NOTE: Update uniform data on each render.
	// this.uniforms.u_time.value += this.clock.getDelta();
	//this.renderer.clear();
	//this.renderer.clearDepth();
	this.renderer.render(this.scene, this.camera);
	
  }

  onWindowResize() {
	this.camera.aspect = window.innerWidth / window.innerHeight;
	this.camera.updateProjectionMatrix();
	this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
