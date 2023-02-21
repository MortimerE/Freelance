// DEPRECATED App.js 

//import { useRef, useEffect } from 'react';
import * as THREE from 'three';
//import GLTFLoader from 'three-gltf-loader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { createCanvas } from 'canvas';
import { createRef } from 'react';

import { useEffect, useRef } from 'react';
// Homepage logo demo 

// Global context var 
var direction = 0;

export default function App() {
  // Canvas ref
  const canvasRef = useRef();

  useEffect(() => {
    // Get user input 
    const canvas = canvasRef.current;
    canvas.addEventListener('mousemove', handleMouseMove);

    // Primary floating object
    /*
    const coinGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.1, 32);
    coinGeometry.bevelEnabled = true;
    coinGeometry.bevelThickness = 32;
    const coinDiscMaterial = new THREE.MeshStandardMaterial({ color: 0x436681, metalness: .3, emissive: 0xFFFFFF, emissiveIntensity: 0.1 });
    const coinDisc = new THREE.Mesh(coinGeometry, coinDiscMaterial);
    coinDisc.scale.set(2, 1, 1);
    coinDisc.rotation.x += 1.5708;
    // rotating about the x axis so we see the face 
    */
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
    /*
    // Ambient Scene Lighting 
    const light = new THREE.AmbientLight(0xffffff, 1);
    // Hemisphere Lighting
    const sun = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    // Point light
    const reflection = new THREE.PointLight(0xffffff, 1, 100);
    // Set the position of the light
    reflection.position.set(0, 100, 30);
    reflection.lookAt(new THREE.Vector3(0, 0, 0));

    const cGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.1, 32);
    const cDiscMaterial = new THREE.MeshStandardMaterial({ color: 0x436681, metalness: 1, emissive: 0xFFFFFF, emissiveIntensity: 0.1 });
    const disc = new THREE.Mesh(cGeometry, cDiscMaterial);
    disc.scale.set(20, 10, 10);
    disc.rotation.x += 1.5708;
    disc.rotation.z += 1.5708;
    disc.position.z += 50;
    disc.position.x += 100;*/

    // Set up the Three.js scene, camera, and renderer
    const scene = new THREE.Scene();
    /*scene.add(light);
    scene.add(sun);
    scene.add(reflection);
    scene.add(disc);*/

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
      //theta += frame * direction;
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
      //coinDisc.rotation.y -= frame;
      renderer.render(scene, camera);
      //requestAnimationFrame(animate);
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
/*


// About page scene demo
export default function App() {
  // Canvas ref
  const canvasRef = useRef();

  useEffect(() => {
    // Get user input 
    const canvas = canvasRef.current;
    canvas.addEventListener('wheel', handleScroll);

    // Primary floating object
    const mattGeometry = new THREE.BoxGeometry(1,3,1);
    mattGeometry.bevelEnabled = true;
    mattGeometry.bevelThickness = 32;
    const mattMaterial = new THREE.MeshStandardMaterial({ color: 0x436681, metalness: .3, emissive: 0xFFFFFF, emissiveIntensity: 0.1 });
    const mattAvatar = new THREE.Mesh(mattGeometry, mattMaterial);
    //mattAvatar.scale.set(2, 1, 1);
    //mattAvatar.rotation.x += 1.5708;
    mattAvatar.translateX(1);
    // rotating about the x axis so we see the face 
    // Derek
    const derekGeometry = new THREE.BoxGeometry(1,3,1);
    derekGeometry.bevelEnabled = true;
    derekGeometry.bevelThickness = 32;
    const derekMaterial = new THREE.MeshStandardMaterial({ color: 0x436681, metalness: .3, emissive: 0xFFFFFF, emissiveIntensity: 0.1 });
    const derekAvatar = new THREE.Mesh(derekGeometry, derekMaterial);
    //mattAvatar.scale.set(2, 1, 1);
    //derekAvatar.rotation.x += 1.5708;
    derekAvatar.translateX(-1);
    // rotating about the x axis so we see the face 

    // Set up the terrain geometry
    // Create a new 2D array to represent the heightmap
    var heightmap = [
      [1, 2, 3, 4, 5],
      [-1.5, 2.5, 3.5, 4.5, 5.5],
      [-2.2, -2.8, -3.3, 3.8, 4.2],
      [1.8, 2.3, 2.7, 3.2, 3.7],
      [1.2, 1.7, 2.1, 2.6, 3.1]
    ];

    // Create a new 3D grid of vertices using the `THREE.PlaneGeometry` class
    var terrainWidth = 100;
    var terrainHeight = 100;
    var terrainGeometry = new THREE.PlaneGeometry(100, 100, heightmap.length - 1, heightmap[0].length - 1);
    // Vertex positions
    var positions = terrainGeometry.attributes.position.array;
    // Set the height of each vertex based on the corresponding value in the heightmap
    for (var i = 0; i < positions.length; i += 3) {
      var x = (i / 3) % (heightmap[0].length) * terrainWidth / (heightmap[0].length - 1) - terrainWidth / 2;
      var z = Math.floor(i / 3 / heightmap[0].length) * terrainHeight / (heightmap.length - 1) - terrainHeight / 2;
      var y = heightmap[Math.floor(i / 3 / heightmap[0].length)][(i / 3) % (heightmap[0].length)];
      positions[i] = x;
      positions[i + 1] = y;
      positions[i + 2] = z;
  }
    // Update the attribute with the modified vertex position data
    terrainGeometry.attributes.position.needsUpdate = true;

    // Create the terrain mesh using a simple material
    var terrainMaterial = new THREE.MeshStandardMaterial({
      color: 0x10ffee, // set the color of the material
      roughness: 0.8,
      metalness: 0.2,
      side: THREE.DoubleSide
    });
    var terrain = new THREE.Mesh(terrainGeometry, terrainMaterial);
    terrain.position.set(0, -1, 0);
    terrain.rotation.x = 2*Math.PI;
    terrain.name = "Terrain";


    // Ambient Scene Lighting 
    const light = new THREE.AmbientLight(0xffffff, 1);
    // Hemisphere Lighting
    const sun = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);

    // Set up the Three.js scene, camera, and renderer
    const scene = new THREE.Scene();
    scene.add(mattAvatar);
    scene.add(derekAvatar);
    scene.add(terrain);
    scene.add(light);
    scene.add(sun);

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias:true });
    renderer.setClearColor(0xffffff, 1);
    renderer.setSize(canvasRef.current.width, canvasRef.current.height);

    var theta = Math.PI/2;
    renderer.setAnimationLoop(animate);

    const camera = new THREE.PerspectiveCamera(75, canvasRef.current.width / canvasRef.current.height, 0.1, 1000);
    camera.position.x = 10;
    camera.position.y = 10;

    var orbit_magnitude = 0;
    var rotate_avatar = 0;
    var framecount = 0;

    function animate() {
      // Translating camera on a horizontal fixed orbit
      var frame = 2*Math.PI/3600
      var r = 10;
      var coordinates = calculate_orbit(r, theta);
      camera.position.x = coordinates[0]
      camera.position.z = coordinates[1]
    
      // Rotating camera to track origin
      camera.lookAt(new THREE.Vector3(0, 0, 0));

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
        mattAvatar.rotation.y += rotate_avatar * Math.PI/60;
        derekAvatar.rotation.y += rotate_avatar * Math.PI/60;
      }
      if(Math.abs(framecount) >= 30){
        rotate_avatar = 0;
        framecount = 0;
      }
      //console.log(rotate_avatar);

      /*if (theta === 2*Math.PI/3) {
        // play the animation
        animationMixer.clipAction(gltf.animations[0]).play();
      }/
      
      // Animate the waves
      for ( var i = 0; i < positions.length; i += 3 ) {
        var x = positions[ i ];
        var z = positions[ i + 2 ];
        var y = (Math.sin(x * theta) + Math.cos(z * theta) - 1);
        positions[ i + 1 ] = y;
      }
      terrainGeometry.attributes.position.needsUpdate = true;
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
*/
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