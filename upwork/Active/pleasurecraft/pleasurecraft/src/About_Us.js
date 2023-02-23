//import { useRef, useEffect } from 'react';
import * as THREE from 'three';
//import GLTFLoader from 'three-gltf-loader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { createCanvas } from 'canvas';
import { createRef } from 'react';

import { useEffect, useRef } from 'react';
import { Cache, QuadraticBezierCurve3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


// About page scene demo
export default function About() {
  // Canvas ref
  const canvasRef = useRef();

  useEffect(() => {
    // Get user input 
    const canvas = canvasRef.current;
    //canvas.addEventListener('wheel', handleScroll);

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
        water.material.envMap = prefilteredCubeMap;
        pmremGenerator.dispose();
        //console.log(texture.status);
      
      });

      hdrLoader.load('./Textures/tex/derek_tex.png', function (texture) {

        const clothesMap = pmremGenerator.fromEquirectangular( texture ).texture;

        // Set the texture as the environment map for a material
        derekAvatar.traverse((child) => {
          if (child.isMesh) {
            child.material.envMap = clothesMap
          }
        });
        pmremGenerator.dispose();    
      });

      hdrLoader.load('./Textures/tex/matt_tex.png', function (texture) {

        const mattMap = pmremGenerator.fromEquirectangular( texture ).texture;

        // Set the texture as the environment map for a material
        mattAvatar.traverse((child) => {
          if (child.isMesh) {
            child.material.envMap = mattMap
          }
        });
        pmremGenerator.dispose();
      
      });

      const sphere = root.getObjectByName("Sphere");
      sphere.material.emissive = new THREE.Color(0xffffff); // set the emissive color to white
      sphere.material.emissiveIntensity = .5; // increase the emissive intensity to make it brighter

      console.log(dumpObject(root).join('\n'));
      centerpoint = new THREE.Vector3((mattAvatar.position.x + derekAvatar.position.x)/2, (mattAvatar.position.y + derekAvatar.position.y)/2, (mattAvatar.position.z - derekAvatar.position.z)/2);
      console.log(centerpoint);
      console.timeLog("loaded in");
      //console.log(camera.position);
    });

    // Set up the Three.js scene, camera, and renderer

    const light = new THREE.AmbientLight(0xffffff, .1);
    // Hemisphere Lighting
    const sun = new THREE.HemisphereLight(0xffffbb, 0x080820, .9 );
    scene.add(light);
    scene.add(sun);

    camera = new THREE.PerspectiveCamera(75, canvasRef.current.width / canvasRef.current.height, 0.1, 4000);
    camera.position.set(-30, 75, 0);
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias:true });
    renderer.setClearColor(0xffffff, 1);
    renderer.setSize(canvasRef.current.width, canvasRef.current.height);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2.0;
    controls.target.set(-30, 75, 0);
    controls.enablePan = false;
    controls.minPolarAngle = Math.PI/2.4; // lock vertical rotation
    controls.maxPolarAngle = Math.PI/2.4; // lock vertical rotation
    controls.minDistance = 250;
    controls.maxDistance = 1000;

    var previousAngle = 0;
    var framecount = 0;
    renderer.setAnimationLoop(animate);

    function animate() {
      // Translating camera on a horizontal fixed orbit
      controls.update();
      
      var currentAngle = Math.atan2(camera.position.x, camera.position.z);
      var rotate_avatar = 0;

      // Check if we crossed a 1/3 of a revolution boundary
      if (previousAngle !== null && currentAngle !== null) {
          const diff = currentAngle - previousAngle;
          if (Math.abs(diff) >= (2 * Math.PI / 3)) {
          if (diff > 0) {
            rotate_avatar = -1;
            console.log('Turning right');
          } else {
            rotate_avatar = 1;
            console.log('Turning left');
          }
        }
      }

      // Store the current angle as the previous angle for the next update
      previousAngle = currentAngle;
      
      if(rotate_avatar !== 0){
        framecount += 1;
        mattAvatar.rotation.y += rotate_avatar * Math.PI/30;
        derekAvatar.rotation.y += rotate_avatar * Math.PI/30;
      }
      if(framecount >= 30){
        rotate_avatar = 0;
        framecount = 0;
      }
      //console.log(rotate_avatar);

      //console.log(camera.position);
      renderer.render(scene, camera);

    }

    //return () => {
      //canvasRef.current.removeEventListener("wheel", handleScroll);
    //};
    
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
