//import { useRef, useEffect } from 'react';
import * as THREE from 'three';
//import GLTFLoader from 'three-gltf-loader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { createCanvas } from 'canvas';
import { createRef } from 'react';

import { useEffect, useRef } from 'react';
import { Cache } from 'three';

// Global context var 
var direction = 0;

// Homepage logo demo 
/*
export default function App() {
  // Canvas ref
  const canvasRef = useRef();

  useEffect(() => {
    // Get user input 
    const canvas = canvasRef.current;
    canvas.addEventListener('mousemove', handleMouseMove);

    // Primary floating object
    var coinDisc = new THREE.Mesh();
    const loader = new GLTFLoader();

    loader.load('./glTF/Logo Chrome.gltf', (gltf) => {
      const root = gltf.scene;
      //scene.add(root);
      coinDisc = root.getObjectByName('Icon_Logo');
      coinDisc.position.set(0,0,0);
      coinDisc.scale.set(.1,.1,.1);

      // HDRI setup
      const pmremGenerator = new THREE.PMREMGenerator( renderer );
      const hdrLoader = new THREE.TextureLoader();
      hdrLoader.load('./Textures/Ultimate_Skies_4k_0058_BOOSTED.jpg', function (texture) {

        const prefilteredCubeMap = pmremGenerator.fromEquirectangular( texture ).texture;

        // Set the texture as the environment map for a material
        coinDisc.material.envMap = prefilteredCubeMap;
        pmremGenerator.dispose();
        console.log(texture.status);
      
      });    
      scene.add(coinDisc);

      //console.log(dumpObject(root).join('\n'));
    });

    // Set up the Three.js scene, camera, and renderer
    const scene = new THREE.Scene();

    var theta = 0;

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias:true });
    renderer.setClearColor(0xffffff, 1);
    renderer.setSize(canvasRef.current.width, canvasRef.current.height);
    renderer.setAnimationLoop(animate);

    const camera = new THREE.PerspectiveCamera(75, canvasRef.current.width / canvasRef.current.height, 0.1, 1000);
    camera.position.z = 100;

    renderer.render(scene, camera);

    function animate() {
      // Translating camera on a horizontal fixed orbit
      var frame = Math.PI/360
      var r = 100;
      theta -= frame; //this gives the illusion of rotation by orbiting the camera 
      coinDisc.rotation.y -= frame * direction; //rotating the mesh should give reflections animation
      theta += frame * direction; //applying counterspin
      var coordinates = calculate_orbit(r, theta);
      camera.position.x = coordinates[0]
      camera.position.z = coordinates[1]
      console.log("("+camera.position.x+","+camera.position.z+")")
    
      // Rotating camera to track origin
      camera.lookAt(new THREE.Vector3(0, 0, 0));

      // Rotating camera to track origin
      camera.lookAt(new THREE.Vector3(0, 0, 0));

      // Rotating by 1 degree per frame (1 degree = pi/180 radians)
      renderer.render(scene, camera);
      }
    return () => {
      canvasRef.current.removeEventListener("mousemove", handleMouseMove);
    };

  }, []); // The empty array ensures that this effect only runs once when the component mounts

  return (
    <div id = "main">
      <canvas ref={canvasRef} className = "three" style={{maxHeight:"100%", maxWidth:"100%"}} width="1000px" height="1000px" />
    </div>
  );
}
*/


// About page scene demo
export default function App() {
  // Canvas ref
  const canvasRef = useRef();

  useEffect(() => {
    // Get user input 
    const canvas = canvasRef.current;
    canvas.addEventListener('wheel', handleScroll);

    // Scene
    const scene = new THREE.Scene();

    // variables for control 
    var mattAvatar = new THREE.Mesh();
    let derekAvatar = new THREE.Mesh();
    let camera = new THREE.PerspectiveCamera();
    const loader = new GLTFLoader();
    let centerpoint = new THREE.Vector3();
    console.time("loaded in");

    // Importing entire scene from c4d export
    loader.load('./glTF/About Us_v2.glb', (gltf) => {
      const root = gltf.scene;
      scene.add(root);
      var waterFloor = root.getObjectByName('Water_Floor');
      mattAvatar = root.getObjectByName('Matt');
      derekAvatar = root.getObjectByName('Derek');
      // HDRI setup
      const pmremGenerator = new THREE.PMREMGenerator( renderer );
      const hdrLoader = new THREE.TextureLoader();
      hdrLoader.load('./Textures/Ultimate_Skies_4k_0058_BOOSTED.jpg', function (texture) {

        const prefilteredCubeMap = pmremGenerator.fromEquirectangular( texture ).texture;

        // Set the texture as the environment map for a material
        var water = waterFloor.getObjectByName("Polygon")
        mattAvatar.traverse((child) => {
          if (child.isMesh) {
            child.material.envMap = prefilteredCubeMap;
          }
        });
        derekAvatar.traverse((child) => {
          if (child.isMesh) {
            child.material.envMap = prefilteredCubeMap;
          }
        });
        water.material.envMap = prefilteredCubeMap;
        pmremGenerator.dispose();
        //console.log(texture.status);
      
      });

      //camera = root.getObjectByName('Camera');
      console.log(dumpObject(root).join('\n'));
      centerpoint = new THREE.Vector3(mattAvatar.position.x - derekAvatar.position.x, mattAvatar.position.y - derekAvatar.position.y, mattAvatar.position.z - derekAvatar.position.z);
      console.log(centerpoint);
      console.timeLog("loaded in");
      //console.log(camera.position);
    });

    const mattGeometry = new THREE.BoxGeometry(1,3,1);
    mattGeometry.bevelEnabled = true;
    mattGeometry.bevelThickness = 32;
    const mattMaterial = new THREE.MeshStandardMaterial({ color: 0x436681, metalness: .3, emissive: 0xFFFFFF, emissiveIntensity: 0.1 });
    const mattr = new THREE.Mesh(mattGeometry, mattMaterial);

    // Set up the Three.js scene, camera, and renderer
    const light = new THREE.AmbientLight(0xffffff, 1);
    // Hemisphere Lighting
    const sun = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    scene.add(light);
    scene.add(sun);

    camera = new THREE.PerspectiveCamera(75, canvasRef.current.width / canvasRef.current.height, 0.1, 4000);
    camera.position.y = 150

    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias:true });
    renderer.setClearColor(0xffffff, 1);
    renderer.setSize(canvasRef.current.width, canvasRef.current.height);

    var theta = Math.PI/2;
    renderer.setAnimationLoop(animate);

    var orbit_magnitude = 0;
    var rotate_avatar = 0;
    var framecount = 0;

    function animate() {
      // Translating camera on a horizontal fixed orbit
      var frame = 2*Math.PI/3600
      var r = 500;
      var coordinates = calculate_orbit(r, theta);
      //camera.position.x = coordinates[0] - 295.460323974609 //offsetting to "scene origin" which is not true origin
      camera.position.x = coordinates[0] - centerpoint.x;
      camera.position.z = coordinates[1] - centerpoint.z;
    
      // Rotating camera to track midpoint between avatars, which is not the true origin
      //camera.lookAt(new THREE.Vector3(-295.460323974609, 758.3621655634962, 0));
      camera.lookAt(centerpoint);

      theta += frame * direction;
      //console.log(direction) 
      //console.log(theta)
      
      // Every time the camera rotates through 1/3 of the scene, Matt and Derek's pose changes 
      // When they change pose, they rotate to face ahead of the Camera 
      orbit_magnitude += direction * frame; 

      if(orbit_magnitude >= Math.PI/3) {
        orbit_magnitude = 0;
        rotate_avatar = -1;
      }

      if(orbit_magnitude <= -Math.PI/3) {
        orbit_magnitude = 0;
        rotate_avatar = 1;
      }
      
      if(rotate_avatar !== 0){
        framecount += 1;
        mattAvatar.rotation.y += rotate_avatar * Math.PI/30;
        derekAvatar.rotation.y += rotate_avatar * Math.PI/30;
      }
      if(Math.abs(framecount) >= 20){
        rotate_avatar = 0;
        framecount = 0;
      }
      //console.log(rotate_avatar);

      if (theta === 2*Math.PI/3) {
        // play the animation
        //animationMixer.clipAction(gltf.animations[0]).play();
      }
      //console.log(camera.position);
      renderer.render(scene, camera);

    }

    return () => {
      canvasRef.current.removeEventListener("wheel", handleScroll);
    };
    
  }, []); // The empty array ensures that this effect only runs once when the component mounts

  return (
    <div>
      <canvas ref={canvasRef} width="600" height="600" />
    </div>
  );
}

// Draws a circular orbit around (0,0)
function calculate_orbit(r, theta){
  var x = (r * Math.cos(theta));
  var y = r * Math.sin(theta);
  return [x, y]
}

// Tracks user interaction
let timeout;
function handleMouseMove(event) {
  var coefficient = 1;
  direction = event.movementX * coefficient;
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    direction = 0;
  }, 100);
}
function handleScroll(event) {
  event.preventDefault();
  var coefficient = 1;
  direction = event.deltaY * coefficient;
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    direction = 0;
  }, 2500);
}
function dumpObject(obj, lines = [], isLast = true, prefix = '') {
  const localPrefix = isLast ? '└─' : '├─';
  lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`);
  const newPrefix = prefix + (isLast ? '  ' : '│ ');
  const lastNdx = obj.children.length - 1;
  obj.children.forEach((child, ndx) => {
    const isLast = ndx === lastNdx;
    dumpObject(child, lines, isLast, newPrefix);
  });
  return lines;
}