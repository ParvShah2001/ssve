import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, RotateCw, Box, Maximize2, ShieldAlert } from 'lucide-react';

export default function STLViewer({ meshData, color = '#f97316', className = '' }) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const meshRef = useRef(null);
  const animFrameIdRef = useRef(null);

  const [wireframe, setWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Map color names to hex codes if needed
  const getHexColor = (col) => {
    if (!col) return '#f97316';
    const map = {
      'White': '#ffffff',
      'Black': '#222222',
      'Grey': '#888888',
      'Royal Blue': '#1e40af',
      'Navy Blue': '#0f2b5c',
      'Saffron Orange': '#f97316',
      'Signal Orange': '#ea580c',
      'Orange': '#ea580c',
      'Red': '#dc2626',
      'Vibrant Red': '#ef4444',
      'Yellow': '#eab308',
      'Natural White': '#f8fafc',
    };
    return map[col] || col;
  };

  useEffect(() => {
    if (!containerRef.current || !meshData || !meshData.positions) return;

    try {
      const container = containerRef.current;
      const width = container.clientWidth || 400;
      const height = container.clientHeight || 340;

      // Scene
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x120a06);
      sceneRef.current = scene;

      // Camera
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2000);
      cameraRef.current = camera;

      // Renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'default' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      container.innerHTML = '';
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.0);
    dirLight1.position.set(100, 150, 100);
    dirLight1.castShadow = true;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xf97316, 0.6);
    dirLight2.position.set(-100, -50, -100);
    scene.add(dirLight2);

    // Build plate Grid
    const grid = new THREE.GridHelper(150, 30, 0xea580c, 0x2e180d);
    grid.position.y = 0;
    scene.add(grid);

    // Build Geometry from STL parsed positions
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(meshData.positions, 3));

    if (meshData.normals && meshData.normals.length > 0) {
      geometry.setAttribute('normal', new THREE.BufferAttribute(meshData.normals, 3));
    } else {
      geometry.computeVertexNormals();
    }

    // Center geometry
    geometry.computeBoundingBox();
    const center = new THREE.Vector3();
    geometry.boundingBox.getCenter(center);
    geometry.center();

    // Place bottom at y = 0
    const size = new THREE.Vector3();
    geometry.boundingBox.getSize(size);
    geometry.translate(0, size.y / 2, 0);

    // Material
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(getHexColor(color)),
      roughness: 0.35,
      metalness: 0.15,
      wireframe: wireframe,
      flatShading: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
    meshRef.current = mesh;

    // Position Camera based on model size
    const maxDim = Math.max(size.x, size.y, size.z, 20);
    const cameraDistance = maxDim * 2.2;
    camera.position.set(cameraDistance * 0.9, cameraDistance * 0.8, cameraDistance);
    camera.lookAt(0, size.y / 2, 0);

    // Simple mouse Orbit Controls implementation
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const handleMouseDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handleMouseMove = (e) => {
      if (!isDragging || !meshRef.current) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;

      meshRef.current.rotation.y += deltaX * 0.01;
      meshRef.current.rotation.x += deltaY * 0.01;

      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleWheel = (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY * 0.001;
      camera.position.x *= 1 + zoomFactor;
      camera.position.y *= 1 + zoomFactor;
      camera.position.z *= 1 + zoomFactor;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    dom.addEventListener('wheel', handleWheel, { passive: false });

    // Touch events for mobile
    let touchStartX = 0, touchStartY = 0;
    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };
    const handleTouchMove = (e) => {
      if (e.touches.length === 1 && meshRef.current) {
        const deltaX = e.touches[0].clientX - touchStartX;
        const deltaY = e.touches[0].clientY - touchStartY;
        meshRef.current.rotation.y += deltaX * 0.012;
        meshRef.current.rotation.x += deltaY * 0.012;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };
    dom.addEventListener('touchstart', handleTouchStart);
    dom.addEventListener('touchmove', handleTouchMove);

    // Animation Loop
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      if (autoRotate && meshRef.current && !isDragging) {
        meshRef.current.rotation.y += 0.006;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameIdRef.current);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      dom.removeEventListener('wheel', handleWheel);
      dom.removeEventListener('touchstart', handleTouchStart);
      dom.removeEventListener('touchmove', handleTouchMove);
      if (container) container.innerHTML = '';
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
    } catch (err) {
      console.warn('WebGL init error:', err);
      setHasError(true);
    }
  }, [meshData]);

  // Update material color and wireframe dynamically without recreating scene
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.material.color.set(getHexColor(color));
      meshRef.current.material.wireframe = wireframe;
      meshRef.current.material.needsUpdate = true;
    }
  }, [color, wireframe]);

  const resetOrientation = () => {
    if (meshRef.current) {
      meshRef.current.rotation.set(0, 0, 0);
    }
  };

  if (hasError) {
    return (
      <div className={`rounded-2xl p-6 bg-[#180f0a] border border-orange-900/60 text-center space-y-3 ${className}`}>
        <div className="w-12 h-12 rounded-xl bg-orange-950/80 border border-orange-500/40 text-orange-400 flex items-center justify-center mx-auto">
          <Box className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-bold text-white text-sm">3D STL Model Computed</h4>
          <p className="text-xs text-slate-400 mt-0.5">Geometry successfully verified and volume calculated.</p>
        </div>
        {meshData?.dimensions && (
          <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-lg bg-black/60 border border-orange-500/30 text-xs font-mono text-orange-200">
            <span>{meshData.dimensions.x} × {meshData.dimensions.y} × {meshData.dimensions.z} mm</span>
            <span className="text-slate-600">|</span>
            <span>~{meshData.volumeCm3} cm³</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`relative rounded-2xl overflow-hidden border border-orange-900/80 bg-[#120a06] shadow-inner group ${className}`}>
      {/* 3D Canvas Mount */}
      <div ref={containerRef} className="w-full h-80 md:h-96 cursor-grab active:cursor-grabbing" />

      {/* Floating Toolbar Controls */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-xl border border-orange-500/30 shadow-md z-10">
        <button
          type="button"
          onClick={() => setAutoRotate(!autoRotate)}
          title={autoRotate ? "Pause Auto-Rotation" : "Start Auto-Rotation"}
          className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition ${
            autoRotate ? 'bg-orange-600 text-white' : 'text-slate-300 hover:bg-white/10'
          }`}
        >
          <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }} />
          <span className="hidden sm:inline">Spin</span>
        </button>

        <button
          type="button"
          onClick={() => setWireframe(!wireframe)}
          title="Toggle Wireframe Mesh"
          className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition ${
            wireframe ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-white/10'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Wireframe</span>
        </button>

        <button
          type="button"
          onClick={resetOrientation}
          title="Reset Model Orientation"
          className="p-1.5 rounded-lg text-xs font-medium text-slate-300 hover:bg-white/10 transition"
        >
          <Box className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Dimensions Badge Overlay */}
      {meshData?.dimensions && (
        <div className="absolute bottom-3 left-3 bg-slate-900/85 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg shadow flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-orange-400 font-semibold">X:</span> {meshData.dimensions.x} mm
          </div>
          <span className="text-slate-500">|</span>
          <div className="flex items-center gap-1.5">
            <span className="text-orange-400 font-semibold">Y:</span> {meshData.dimensions.y} mm
          </div>
          <span className="text-slate-500">|</span>
          <div className="flex items-center gap-1.5">
            <span className="text-orange-400 font-semibold">Z:</span> {meshData.dimensions.z} mm
          </div>
        </div>
      )}

      {/* Interactive Helper Hint */}
      <div className="absolute bottom-3 right-3 text-[11px] text-slate-400 pointer-events-none hidden sm:block bg-white/70 px-2 py-0.5 rounded backdrop-blur-xs">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
}
