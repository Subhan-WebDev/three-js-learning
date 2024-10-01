import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

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


// const geometry = new THREE.SphereGeometry( 2, 32, 16 );
const geometry = new THREE.BoxGeometry( 2, 2, 3); 
const material = new THREE.MeshStandardMaterial({ color: "red", roughness: 0.8, metalness: .3});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

camera.position.z = 5;

const canvas  = document.getElementById('canvas');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

window.addEventListener("resize", ()=>{
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
})

const controls  = new OrbitControls(camera, renderer.domElement);
controls.enableDamping  = true; 
controls.autoRotate =  true;

function animate() {
  window.requestAnimationFrame(animate)
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  controls.update()
  renderer.render(scene, camera);

}
animate();