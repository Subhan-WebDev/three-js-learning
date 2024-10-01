import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as lil from  'lil-gui';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);



const Highintensitylight = new THREE.DirectionalLight( 0xffffff, 2 );
Highintensitylight.position.set(10, 20, 15)
scene.add( Highintensitylight );

const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
directionalLight.position.set(5, 10, 7.5)
scene.add( directionalLight );

const light = new THREE.AmbientLight( 0x404040 ); 
scene.add( light );

const Pointlight = new THREE.PointLight( 0xff0000, 1, 100 );
Pointlight.position.set( 0, 50, 0 );
scene.add( Pointlight );


let loader = new THREE.TextureLoader();
let color = loader.load("./paper_0025_1k_yhtBn2/paper_0025_color_1k.jpg")
let roughness  = loader.load("./paper_0025_1k_yhtBn2/paper_0025_roughness_1k.jpg");
let normal  = loader.load("./paper_0025_1k_yhtBn2/paper_0025_normal_opengl_1k.png");
let height  = loader.load("./paper_0025_1k_yhtBn2/paper_0025_height_1k.png");

// const geometry = new THREE.SphereGeometry( 2, 32, 16 );
const geometry = new THREE.BoxGeometry( 3, 1.8, 2); 
const material = new THREE.MeshStandardMaterial({ map: color, roughnessMap: roughness, normalMap: normal, });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

camera.position.z = 5;

const canvas  = document.getElementById('canvas');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);


 const gui = new lil.GUI();

 const materialFolder =  gui.addFolder('Material');
 materialFolder.add(material, 'roughness', 0, 1).name("Roughness");
 materialFolder.add(material, 'metalness', 0, 1).name("Metalness");
 materialFolder.addColor(material, 'color').name("Color");
materialFolder.open()


 const meshFolder =  gui.addFolder('Mesh');
 meshFolder.add(sphere.scale, 'x', 0.1, 5).name("Scale X");
 meshFolder.add(sphere.scale, 'y', 0.1, 5).name("Scale Y");
 meshFolder.add(sphere.scale, 'z', 0.1, 5).name("Scale Z");
 meshFolder.add(sphere.position, 'x', -10, 10).name("Position X");
 meshFolder.add(sphere.position, 'y', -10, 10).name("Position Y");
 meshFolder.add(sphere.position, 'z', -10, 10).name("Position z");
 meshFolder.open()

window.addEventListener("resize", ()=>{
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
})

const controls  = new OrbitControls(camera, renderer.domElement);
controls.enableDamping  = true; 
// controls.autoRotate =  true;

function animate() {
  window.requestAnimationFrame(animate)
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  controls.update()
  renderer.render(scene, camera);

}
animate();