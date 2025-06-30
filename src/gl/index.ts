import * as THREE from 'three';

// Make THREE available globally for three-bmfont-text - must be done immediately
(window as any).THREE = THREE;

export default new class {
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  clock: THREE.Clock;

  constructor() {
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000, 0);

    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );

    this.camera.position.z = 1;

    this.scene = new THREE.Scene();

    this.clock = new THREE.Clock();

    this.init();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    for (let i = 0; i < this.scene.children.length; i++) {
      const obj = this.scene.children[i];
      if (obj.updateTime) {
        obj.updateTime(this.clock.getElapsedTime());
      }
    }    

    this.render();
  }

  addEvents() {
    window.addEventListener('resize', this.resize.bind(this));
  }

  init() {
    this.addToDom();
    this.animate();
    this.addEvents();
  }

  addToDom() {
    const canvas = this.renderer.domElement;
    const container = document.querySelector('#webgl');
    if (container) {
      container.appendChild(canvas);
    }
  }

  resize() {
    let width = window.innerWidth;
    let height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
}