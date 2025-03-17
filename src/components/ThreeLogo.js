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
      // Create scene, camera, and renderer
      sceneRef.current = new THREE.Scene();
      // Don't set background color, use transparent renderer instead
      
      cameraRef.current = new THREE.PerspectiveCamera(
        75,
        containerRef.current.clientWidth / containerRef.current.clientHeight,
        0.1,
        1000
      );
      cameraRef.current.position.z = 2;
      
      rendererRef.current = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true // Enable transparency
      });
      rendererRef.current.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
      rendererRef.current.setClearColor(0x000000, 0); // Transparent background
      containerRef.current.appendChild(rendererRef.current.domElement);
      
      // Add lights to the scene
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      sceneRef.current.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(0, 1, 1);
      sceneRef.current.add(directionalLight);
      
      // Load the FBX model
      const loader = new FBXLoader();
      loader.load(
        '/assets/models/logo.fbx', // Path to your FBX file
        (fbx) => {
          // Resize and position the model
          fbx.scale.set(0.01, 0.01, 0.01); // Adjust scale as needed
          
          // Apply material based on dark mode with Dante-inspired theme
          const material = new THREE.MeshPhongMaterial({
            color: darkMode ? 0xFF2222 : 0xD40000, // Crimson Red colors
            shininess: 100,
            specular: 0xB4B8B1, // Silver/Steel Gray for specular highlights
          });
          
          fbx.traverse((child) => {
            if (child.isMesh) {
              child.material = material;
            }
          });
          
          modelRef.current = fbx;
          sceneRef.current.add(fbx);
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
        modelRef.current.rotation.y += 0.01; // Rotate the logo
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
      
      // Dispose of resources
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
          child.material.color.set(darkMode ? 0xFF2222 : 0xD40000); // Crimson Red colors
        }
      });
    }
  }, [darkMode]);

  return (
    <div 
      ref={containerRef} 
      className="three-logo-container"
      style={{ 
        width: '50px', 
        height: '50px',
        display: 'inline-block'
      }}
    />
  );
};

export default ThreeLogo;