import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import Gl from '../gl/index';
import Type from '../gl/Type';
import shaders from '../gl/shaders';
import fontFileUrl from '../assets/fonts/Orbitron-Black.fnt?url';
import fontAtlasUrl from '../assets/fonts/Orbitron-Black.png?url';

interface EndlessEffectProps {
  word?: string;
  color?: string;
  backgroundColor?: string;
}

const EndlessEffect: React.FC<EndlessEffectProps> = ({ 
  word = 'SEEDORA', 
  color = '#ffffff',
  backgroundColor = '#000000'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create the kinetic type
    const options = {
      word: word,
      color: color,
      fill: backgroundColor,
      geometry: new THREE.TorusKnotGeometry(9, 3, 768, 3, 4, 3),
      position: {
        texture: [-0.965, -0.4, 0],
        mesh: [0, 0, 0]
      },
      scale: [0.008, 0.04, 1],
      shaders: {
        vertex: shaders.vertex,
        fragment: shaders.fragment
      },
      font: {
        file: fontFileUrl,
        atlas: fontAtlasUrl
      }
    };

    const type = new Type();
    type.init(options);
    sceneRef.current = type;

    // Cleanup
    return () => {
      if (sceneRef.current && Gl.scene) {
        Gl.scene.remove(sceneRef.current);
      }
    };
  }, [word, color, backgroundColor]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0">
      <div id="webgl" className="w-full h-full"></div>
    </div>
  );
};

export default EndlessEffect;