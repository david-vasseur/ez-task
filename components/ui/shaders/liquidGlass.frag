uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uMouse;

varying vec2 vUv;

void main() {

  vec2 uv = vUv;

  // wave distortion
  uv.x += sin(uv.y * 10.0 + uTime) * 0.02;
  uv.y += cos(uv.x * 10.0 + uTime) * 0.02;

  // pointer distortion
  float dist = distance(vUv, uMouse);
  uv += (vUv - uMouse) * 0.1 * smoothstep(0.4, 0.0, dist);

  // chromatic aberration
  float aberration = 0.003;

  float r = texture2D(uTexture, uv + aberration).r;
  float g = texture2D(uTexture, uv).g;
  float b = texture2D(uTexture, uv - aberration).b;

  vec3 color = vec3(r, g, b);

  gl_FragColor = vec4(color, 0.9);
}