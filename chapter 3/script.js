
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

const canvas =  document.getElementById('draw');

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);


// math.pi is 180 in radius
let clock = new THREE.Clock()

function animate() {
    window.requestAnimationFrame(animate);
    renderer.render(scene, camera);
    cube.rotation.y = clock.getElapsedTime();
}

animate()