import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';


let scene, camera, renderer, textEdges, textMesh;

init();
animate();

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 100;

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.7);
  dirLight.position.set(1, 1, 2);
  scene.add(dirLight);

  const loader = new FontLoader();
  loader.load('/public/fonts/nrb.json', function (font) {
    const geometry = new TextGeometry('funnytummylol', {
      font: font,
      size: 10,
      height: 1,
      curveSegments: 6,
      bevelEnabled: true,
      bevelThickness: 2,
      bevelSize: 0.5,
      bevelSegments: 12,
    });
    geometry.center();

    // Outline (edges)
    const edges = new THREE.EdgesGeometry(geometry);
    textEdges = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 })
    );
    scene.add(textEdges);


    textMesh = new THREE.Mesh(
      geometry,
      new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0,
        roughness: 0.15,
        transmission: 1,
        transparent: true,
        opacity: 0.10,
        ior: 1.5,
        thickness: 1,
        side: THREE.DoubleSide,
      })
    );
    scene.add(textMesh);
  });

  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  if (textEdges) {
    textEdges.rotation.y += 0.01;
  }
  if (textMesh) {
    textMesh.rotation.y += 0.01;
  }

  renderer.render(scene, camera);
}
