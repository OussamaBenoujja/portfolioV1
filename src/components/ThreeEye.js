import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

const ThreeEye = ({ darkMode }) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const eyeRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Initialize and animate the scene
  useEffect(() => {
    // Initialize the scene
    const initScene = () => {
      // Create scene
      sceneRef.current = new THREE.Scene();
      
      // Camera setup
      cameraRef.current = new THREE.PerspectiveCamera(
        75,
        containerRef.current.clientWidth / containerRef.current.clientHeight,
        0.1,
        1000
      );
      cameraRef.current.position.z = 3;
      
      rendererRef.current = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true
      });
      rendererRef.current.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
      rendererRef.current.setClearColor(0x000000, 0);
      containerRef.current.appendChild(rendererRef.current.domElement);
      
      // Add lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      sceneRef.current.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
      directionalLight.position.set(1, 1, 1);
      sceneRef.current.add(directionalLight);
      
      // Add spotlight to create glint in the eye
      const spotLight = new THREE.SpotLight(0xffffff, 1);
      spotLight.position.set(3, 3, 3);
      spotLight.angle = Math.PI / 6;
      spotLight.penumbra = 0.1;
      sceneRef.current.add(spotLight);
      
      // Add a debug sphere to confirm rendering is working
      const debugSphere = new THREE.Mesh(
        new THREE.SphereGeometry(1, 32, 32),
        new THREE.MeshPhongMaterial({ 
          color: 0xFF0000,
          specular: 0xFFFFFF,
          shininess: 100
        })
      );
      debugSphere.position.set(0, 0, 0);
      sceneRef.current.add(debugSphere);
      
      // Log for debugging
      console.log("Debug sphere added to scene");
      
      // Load the OBJ model
      const loader = new OBJLoader();
      loader.load(
        '/assets/models/eye.obj', // Path to your eye.obj file
        (obj) => {
          console.log("Eye model loaded successfully", obj);
          
          // Get bounding box to center model
          const bbox = new THREE.Box3().setFromObject(obj);
          const center = bbox.getCenter(new THREE.Vector3());
          
          // Log original size
          const size = bbox.getSize(new THREE.Vector3());
          console.log("Original eye model size:", size);
          
          // Center the model
          obj.position.sub(center);
          
          // Apply scale - try a much larger scale
          obj.scale.set(5, 5, 5); // Much larger scale than before
          
          // Apply material based on dark mode
          const material = new THREE.MeshPhongMaterial({
            color: darkMode ? 0xDD5555 : 0xA00000,
            specular: 0x555555,
            shininess: 100,
            side: THREE.DoubleSide
          });
          
          // Apply material to all meshes
          obj.traverse((child) => {
            if (child.isMesh) {
              child.material = material;
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
          
          eyeRef.current = obj;
          sceneRef.current.add(obj);
          
          // Make a slight initial rotation so eye isn't looking straight ahead
          eyeRef.current.rotation.y = 0.2;
          eyeRef.current.rotation.x = -0.1;
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
        },
        (error) => {
          console.error('An error happened while loading the model:', error);
        }
      );
    };
    
    // Animate the scene
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (eyeRef.current) {
        // Calculate target rotation based on mouse position
        // These values control how far the eye can rotate
        const targetRotationY = mousePosition.x * 0.5; // left-right movement
        const targetRotationX = mousePosition.y * 0.3; // up-down movement
        
        // Smooth interpolation for natural movement
        eyeRef.current.rotation.y += (targetRotationY - eyeRef.current.rotation.y) * 0.1;
        eyeRef.current.rotation.x += (targetRotationX - eyeRef.current.rotation.x) * 0.1;
      }
      
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };
    
    // Handle window resize
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current && containerRef.current) {
        cameraRef.current.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(
          containerRef.current.clientWidth,
          containerRef.current.clientHeight
        );
      }
    };
    
    // Initialize and start animation
    initScene();
    animate();
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [darkMode]); // Re-initialize when dark mode changes

  // Update material color when dark mode changes
  useEffect(() => {
    if (eyeRef.current) {
      eyeRef.current.traverse((child) => {
        if (child.isMesh) {
          child.material.color.set(darkMode ? 0xDD5555 : 0xA00000);
        }
      });
    }
  }, [darkMode]);

  return (
    <div 
      ref={containerRef} 
      className="three-eye-container"
      style={{ 
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        border: '2px solid yellow' // Add temporary border for debug
      }}
    >
      {/* Debug element */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        background: 'rgba(0,0,0,0.5)',
        color: 'white',
        padding: '5px',
        fontSize: '10px'
      }}>
        Eye Container
      </div>
    </div>
  );
};

export default ThreeEye;