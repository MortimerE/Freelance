//import { useRef, useEffect } from 'react';
import * as THREE from 'three';
//import GLTFLoader from 'three-gltf-loader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import { createCanvas } from 'canvas';
import { createRef } from 'react';

import { useEffect, useRef } from 'react';
import { Cache, QuadraticBezierCurve3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { Water } from 'three/addons/objects/Water.js';


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
    //const derekParent = new THREE.Object3D();
    //derekParent.position.set(-60, 0, 0);
    console.time("loaded in");

    //renderer
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias:true });
    renderer.setClearColor(0xffffff, 1);
    renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );

    //Manual water 
    const waterGeometry = new THREE.PlaneGeometry( 6000, 6000 );
    var water = new Water(
      waterGeometry,
      {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: new THREE.TextureLoader().load( 'textures/waternormals.jpg', function ( texture ) {

          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

        } ),
        sunDirection: new THREE.Vector3(0, -1, -1),
        sunColor: 0xFFA500,
        waterColor: 0x001e0f,
        distortionScale: 3.7,
        fog: scene.fog !== undefined,
        //shadowSide: THREE.BackSide,
      }
    )

    //Manual sky 
    // Create the sphere geometry
    const sphereGeometry = new THREE.SphereGeometry(3000);

    // Create the sphere material with the environment map
    const sphereMaterial = new THREE.MeshStandardMaterial({
      metalness: 0.5,
      roughness: 0,
      side : THREE.BackSide,
      envMapIntensity: 1 // Set the environment map intensity
    });

    // Create the sphere mesh with the geometry and material
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    // Load the HDRI environment map
    const pmremGenerator = new THREE.PMREMGenerator( renderer );
    const hdrLoader = new THREE.TextureLoader();
    hdrLoader.load('./Textures/tex (1)/Ultimate_Skies_4k_0058.jpg', function (texture) {
      const prefilteredCubeMap = pmremGenerator.fromEquirectangular( texture ).texture;
      //prefilteredCubeMap.encoding = THREE.sRGBEncoding;
      sphere.material.envMap = prefilteredCubeMap;
      sphere.material.needsUpdate = true; // Update the material
      //water.material.envMap = prefilteredCubeMap;
      pmremGenerator.dispose();
    });

    // Importing entire scene from c4d export
    loader.load('./glTF/About Us_v3_Avatars Only.glb', (gltf) => {
      const root = gltf.scene;
      scene.add(root);
      //var waterFloor = root.getObjectByName('Water_Floor');
      mattAvatar = root.getObjectByName('Matt');
      derekAvatar = root.getObjectByName('Derek');
      mattAvatar.getObjectByName("Matt_1").material.reflectivity = 0.1;
      mattAvatar.getObjectByName("Matt_1").material.ambientIntensity = 1;
      mattAvatar.getObjectByName("Hand_M").material.ambientIntensity = 0;
      //console.log(mattAvatar.rotation.y);
      //derekAvatar.getObjectByName("Hand_D").excludeFromLight = true;
      //scene.add(mattAvatar);
      //scene.add(derekAvatar);
      /*const exclusionList = ["Hand_M", "Hand_D", "Sunnies_D", "Sunnies_M"];

      root.traverse((child) => {
        if (child instanceof THREE.Mesh && !exclusionList.includes(child.name)) {
          child.material.emissive = new THREE.Color(0xffe0ae);
          child.material.emissiveIntensity = 0.1;
        }
      });*/
   
      //Bright sky
      //var sphere = root.getObjectByName("Sphere");
      //sphere.material.emissive = new THREE.Color(0xff0000); // set the emissive color to white
      //sphere.material.emissiveIntensity = 1 // increase the emissive intensity to make it brighter
      //derekAvatar.position.y = 88;
      //mattAvatar.position.y = 77;
      console.log(dumpObject(root).join('\n'));
      //centerpoint = new THREE.Vector3((mattAvatar.position.x + derekAvatar.position.x)/2, (mattAvatar.position.y + derekAvatar.position.y)/2, (mattAvatar.position.z - derekAvatar.position.z)/2);
      //console.timeLog("loaded in");
      //console.log(camera.position);
   });

    // Set up the Three.js scene, camera, and renderer

    const light = new THREE.AmbientLight(0xffffff, .9);
    // Hemisphere Lighting
    const lamp = new THREE.HemisphereLight(0xffffbb, 0x080820, .6);
    //const sun = new THREE.PointLight(0xffb0b0, 1, 3000);
    const sun = new THREE.PointLight(0xffaa10, 1, 3000);
    sun.position.set(-500, 235, -7);
    sun.visible = false;
    sun.lookAt(0,0,0);
    scene.add(light);
   //scene.add(lamp);
    //scene.add(sun);
    water.rotation.x = - Math.PI / 2;
    
    scene.add( sphere );
    sphere.position.set(0, 750, 0);
    sphere.material.transparent = true;
    //sphere.material.opacity = 0;
    sphere.material.ambientIntensity = 0;
    sphere.material.reflectivity = 0;
    scene.add( water );

    camera = new THREE.PerspectiveCamera(75, canvasRef.current.width / canvasRef.current.height, 0.1, 4000);
    //camera.position.set(0, 75, 0);
    scene.add(camera);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2.0;
    controls.target.set( 0, 80, 0);
    controls.enablePan = false;
    controls.rotateSpeed = .5; // reduce the maximum orbit speed
    controls.zoomSpeed = 0.5; // reduce the maximum zoom speed
    controls.minPolarAngle = Math.PI/3.5; // lock vertical rotation
    controls.maxPolarAngle = Math.PI/1.5; // lock vertical rotation
    controls.minDistance = 250;
    controls.maxDistance = 500;

    var framecount = 0;
    var rotateAvatar = 0;
    renderer.setAnimationLoop(animate);

    function animate() {
      // Translating camera on a horizontal fixed orbit
      controls.update();
      //sphere.rotation.z += Math.PI/4;

      if (rotateAvatar === 0){
        // Calculate the angle between the camera and the avatars
        var avatarAngle = Math.atan2(
          camera.position.x - mattAvatar.position.x,
          camera.position.z - mattAvatar.position.z
        );
        if (avatarAngle > Math.PI) {
          avatarAngle -= 2 * Math.PI;
        }
    
        // Check if the difference is more than 100 degrees
        if (Math.abs(avatarAngle) >= (100 * Math.PI / 180)) {
          // Determine the direction to rotate based on the sign of the angle difference
          console.log(avatarAngle);
          console.log(mattAvatar.rotation.y);
          rotateAvatar = (avatarAngle > 0) ? 1 : -1;
          console.log(rotateAvatar);
        }
      }
      else {
        // Rotate the avatars by a small amount
        mattAvatar.rotation.y += rotateAvatar * Math.PI / 40;
        derekAvatar.rotation.y += rotateAvatar * Math.PI / 40;
        framecount ++;
        if (framecount >= 30){
          framecount = 0;
          rotateAvatar = 0;
        }
      }
      //console.log(rotate_avatar);

      //water
			water.material.uniforms.time.value += 1.0 / 60.0;

      //console.log(camera.position);
      renderer.render(scene, camera);

    }

  }, []); // The empty array ensures that this effect only runs once when the component mounts

  return (
    <div id = "main">
      <canvas ref={canvasRef} className = "three" style={{maxHeight:"100%", maxWidth:"100%"}} width="1920px" height="1080px" />
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
