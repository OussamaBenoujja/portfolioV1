import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

const ThreeLogo = ({ darkMode }) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const modelRef = useRef(null);

  useEffect(() => {
    // Initialize the scene
    const initScene = () => {
      // Create scene
      sceneRef.current = new THREE.Scene();
      
      // Camera setup - moved closer to see the model better
      cameraRef.current = new THREE.PerspectiveCamera(
        75,
        containerRef.current.clientWidth / containerRef.current.clientHeight,
        0.1,
        1000
      );
      cameraRef.current.position.z = 2.5; // Positioned closer
      
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
      
      // Add strong lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
      sceneRef.current.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
      directionalLight.position.set(1, 1, 1);
      sceneRef.current.add(directionalLight);
      
      // Load the FBX model with much larger scale
      const loader = new FBXLoader();
      loader.load(
        '/assets/models/logo.fbx',
        (fbx) => {
          // Get bounding box to center model
          const bbox = new THREE.Box3().setFromObject(fbx);
          const center = bbox.getCenter(new THREE.Vector3());
          
          // Center the model
          fbx.position.sub(center);
          
          // Apply a MUCH larger scale - try 1.0 instead of 0.1
          fbx.scale.set(1.0, 1.0, 1.0); // 100x larger than original
          
          // Apply bright material with strong highlighting
          const material = new THREE.MeshPhongMaterial({
            color: darkMode ? 0xFF2222 : 0xD40000,
            shininess: 100,
            specular: 0xFFFFFF,
            emissive: darkMode ? 0x330000 : 0x220000,
            side: THREE.DoubleSide
          });
          
          // Apply material to all meshes
          fbx.traverse((child) => {
            if (child.isMesh) {
              child.material = material;
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
          
          modelRef.current = fbx;
          sceneRef.current.add(fbx);
          
          // Log the final size for debugging
          const newBbox = new THREE.Box3().setFromObject(fbx);
          const size = newBbox.getSize(new THREE.Vector3());
          console.log("Final model size after scaling:", size);
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
      
      if (modelRef.current) {
        // Slower rotation for better visibility
        modelRef.current.rotation.y += 0.005;
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
  }, [darkMode]);

  useEffect(() => {
    // Update material color when dark mode changes
    if (modelRef.current) {
      modelRef.current.traverse((child) => {
        if (child.isMesh) {
          child.material.color.set(darkMode ? 0xFF2222 : 0xD40000);
          child.material.emissive.set(darkMode ? 0x330000 : 0x220000);
        }
      });
    }
  }, [darkMode]);

  return (
    <div 
      ref={containerRef} 
      className="three-logo-container"
      style={{ 
        width: '300px', 
        height: '50px',
        display: 'inline-block'
      }}
    />
  );
};

export default ThreeLogo;