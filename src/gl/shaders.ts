const torusVertex = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vPosition;

  uniform float uTime;

  void main() {
    vUv = uv;
    vPosition = position;

    // Add some animation to the torus knot
    vec3 pos = position;
    float time = uTime * 0.5;
    
    // Subtle pulsing effect
    float pulse = sin(time) * 0.05 + 0.95;
    pos *= pulse;
    
    // Rotation animation
    float angleX = time * 0.2;
    float angleY = time * 0.3;
    
    // Rotate around X axis
    float cosX = cos(angleX);
    float sinX = sin(angleX);
    vec3 rotatedX = vec3(
      pos.x,
      pos.y * cosX - pos.z * sinX,
      pos.y * sinX + pos.z * cosX
    );
    
    // Rotate around Y axis
    float cosY = cos(angleY);
    float sinY = sin(angleY);
    vec3 rotated = vec3(
      rotatedX.x * cosY + rotatedX.z * sinY,
      rotatedX.y,
      -rotatedX.x * sinY + rotatedX.z * cosY
    );

    gl_Position = projectionMatrix * modelViewMatrix * vec4(rotated, 1.0);
  }
`;

const torusFragment = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vPosition;

  uniform float uTime;
  uniform sampler2D uTexture;

  void main() {
    float time = uTime * 0.4;

    // Create a flowing text effect
    vec2 repeat = -vec2(12.0, 3.0);
    vec2 uv = fract(vUv * repeat - vec2(time, 0.0));
    vec3 texture = texture2D(uTexture, uv).rgb;
    
    // Add some color variation based on position and time
    vec3 color1 = vec3(0.8, 0.2, 0.3); // Reddish
    vec3 color2 = vec3(0.2, 0.4, 0.8); // Blueish
    vec3 colorMix = mix(color1, color2, sin(vPosition.x + time) * 0.5 + 0.5);
    
    // Apply color to the text
    texture *= colorMix;

    // Add depth fog effect
    float fog = clamp(vPosition.z / 6.0, 0.0, 1.0);
    vec3 fragColor = mix(vec3(0.0), texture, fog);

    // Add subtle glow
    float glow = 0.05 * sin(time * 2.0) + 0.05;
    fragColor += glow * colorMix;

    gl_FragColor = vec4(fragColor, 1.0);
  }
`;

export default {
  vertex: torusVertex,
  fragment: torusFragment
};