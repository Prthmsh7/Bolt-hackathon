import * as THREE from 'three';
import Gl from './index';

// THREE BMFONT TEXT
import loadFont from 'load-bmfont';
import createGeometry from 'three-bmfont-text';
import MSDFShader from 'three-bmfont-text/shaders/msdf';

interface TypeOptions {
  word: string;
  color: string;
  fill: string;
  position: {
    texture: number[];
    mesh: number[];
  };
  scale: number[];
  rotation?: number[];
  geometry: THREE.BufferGeometry;
  shaders: {
    vertex: string;
    fragment: string;
  };
  font: {
    file: string;
    atlas: string;
  };
}

export default class Type extends THREE.Object3D {
  opts: TypeOptions | null = null;
  fontGeometry: any;
  fontMaterial: THREE.RawShaderMaterial | null = null;
  loader: THREE.TextureLoader | null = null;
  rt: THREE.WebGLRenderTarget | null = null;
  rtCamera: THREE.PerspectiveCamera | null = null;
  rtScene: THREE.Scene | null = null;
  text: THREE.Mesh | null = null;
  geometry: THREE.BufferGeometry | null = null;
  material: THREE.ShaderMaterial | null = null;
  mesh: THREE.Mesh | null = null;

  init(options: TypeOptions) {
    this.opts = options;

    // Create geometry of packed glyphs
    loadFont(this.opts.font.file, (err: any, font: any) => {
      if (err) {
        console.error('Error loading font:', err);
        return;
      }
      
      this.fontGeometry = createGeometry({
        font,
        text: this.opts.word,
      }, THREE);

      // Load texture containing font glyphs
      this.loader = new THREE.TextureLoader();
      this.loader.load(this.opts.font.atlas, (texture) => {
        this.fontMaterial = new THREE.RawShaderMaterial(
          MSDFShader({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true,
            negate: false,
            color: this.opts.color
          }, THREE)
        );

        this.createRenderTarget();
        this.createMesh();
      });
    });
  }

  createRenderTarget() {
    // Render Target setup
    this.rt = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
    this.rtCamera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    this.rtCamera.position.z = 2.4;

    this.rtScene = new THREE.Scene();
    this.rtScene.background = new THREE.Color(this.opts!.fill);

    this.text = new THREE.Mesh(this.fontGeometry, this.fontMaterial);
    this.text.position.set(...this.opts!.position.texture);
    this.text.rotation.set(Math.PI, 0, 0);
    this.text.scale.set(...this.opts!.scale);
    this.rtScene.add(this.text);
  }

  createMesh() {
    this.geometry = this.opts!.geometry;

    this.material = new THREE.ShaderMaterial({
      vertexShader: this.opts!.shaders.vertex,
      fragmentShader: this.opts!.shaders.fragment,
      uniforms: {
        uTime: { value: 0 },
        uTexture: { value: this.rt!.texture },
      },
      defines: {
        PI: Math.PI
      },
      side: THREE.DoubleSide
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(...this.opts!.position.mesh);
    
    if (this.opts!.rotation) {
      this.mesh.rotation.set(...this.opts!.rotation);
    }
    
    this.mesh.lookAt(new THREE.Vector3());

    this.mesh.onBeforeRender = (renderer) => {
      renderer.setRenderTarget(this.rt!);
      renderer.render(this.rtScene!, this.rtCamera!);
      renderer.setRenderTarget(null);
    };

    this.add(this.mesh);

    Gl.scene.add(this);
  }

  updateTime(time: number) {
    if (this.material) {
      this.material.uniforms.uTime.value = time;
    }
  }
}