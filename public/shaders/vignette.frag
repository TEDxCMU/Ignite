// fragment shader
#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTexCoord;
uniform vec2 resolution;
uniform sampler2D textureID;
uniform float vignetteAmount; // control the intensity of the vignette

void main() {
  vec2 uv = (gl_FragCoord.xy / resolution.xy) - vec2(0.5);

  vec4 texColor = texture2D(textureID, vTexCoord);
  
  // vignette
  vec2 position = uv - vec2(0.5);
  float len = length(position);
  float vignette = smoothstep(0.8 + vignetteAmount, 0.8, len);
  texColor.rgb *= vignette;

  gl_FragColor = texColor;
  
}
