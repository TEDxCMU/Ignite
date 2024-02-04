// fragment shader
#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTexCoord;
uniform sampler2D textureID;
uniform float time;
uniform vec2 resolution;

float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

void main() {
  vec2 uv = (gl_FragCoord.xy / resolution.xy) - vec2(0.5);
  vec4 texColor = texture2D(textureID, vTexCoord);
  vec3 color = texColor.rgb;

  // Constants for particle properties
  float speed = 0.1;
  float density = 0.001;
  float shape = 0.03;

  for (int i = 0; i < 20; i++) {
    // Particle position
    float pX = map(sin(float(i) * 526.5 + time * speed) * 0.5 + 0.5, 0.0, 1.0, -0.5, 1.5);
    float pY = map(cos(float(i) * 238.3 + time * speed) * 0.5 + 0.5, 0.0, 1.0, -0.5, 1.5);

    // Distance from pixel to particle
    float dist = distance(uv, vec2(pX, pY));

    // Particle glow effect
    float glow = density / dist - shape;
    if (glow > 0.0) {
      color += glow * vec3(1.0, 1.0, 1.0);
    }
  }

  // Clamp and output the final color
  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
