/**
 * Fibres et poussières du ruban (Three.js, GLSL 3).
 * Le chemin est lu dans une texture (3 lignes : position + écartement, normale + surbrillance,
 * tangente). Chaque fibre est une bande de triangles extrudée à l'écran ; les couleurs sortent
 * en HDR (> 1) pour que le bloom attrape le cœur des fibres.
 */

const spine = /* glsl */ `
uniform sampler2D uSpine;
uniform float uSamples;
uniform float uLength;
uniform float uTime;
uniform float uTwist;
uniform vec2 uRes;

vec4 spineRow(int row, float t) {
  float x = clamp(t, 0.0, 1.0) * (uSamples - 1.0);
  int i = int(floor(x));
  int j = min(i + 1, int(uSamples) - 1);
  return mix(texelFetch(uSpine, ivec2(i, row), 0), texelFetch(uSpine, ivec2(j, row), 0), fract(x));
}

// Position d'une fibre (traverse w, profondeur d) au point t du chemin.
vec3 fiber(float t, float w, float d, float phase, out float spread, out float glow, out float light) {
  vec4 c = spineRow(0, t);
  vec4 nn = spineRow(1, t);
  vec4 tt = spineRow(2, t);
  vec3 tangent = normalize(tt.xyz);
  light = tt.w;
  vec3 n = normalize(nn.xyz);
  vec3 b = normalize(cross(tangent, n));
  spread = c.w;
  glow = nn.w;
  float s = t * uLength;
  // Le faisceau tourne lentement sur lui-même : c'est la torsion qui donne l'effet de soie.
  float a = s * uTwist + uTime * 0.04;
  vec3 across = n * cos(a) + b * sin(a);
  vec3 depth = -n * sin(a) + b * cos(a);
  float ph = phase * 6.2832;
  // Chaque fibre dérive dans le faisceau : elles se croisent, se regroupent, s'écartent.
  float wander = sin(s * 0.33 + ph * 3.0) * 0.22 + sin(s * 0.9 + ph * 5.0 + uTime * 0.22) * 0.07;
  float ww = w + wander * (1.0 - abs(w) * 0.5);
  vec3 p = c.xyz + (across * ww + depth * (d * 0.55 + sin(s * 0.5 + ph) * 0.18)) * spread;
  // Ondulation lente de tout le ruban.
  p += n * sin(s * 0.12 + uTime * 0.35) * 0.05 + b * sin(s * 0.21 + uTime * 0.27 + 1.3) * 0.08;
  return p;
}

vec2 toScreen(vec4 clip) {
  return clip.xy / clip.w * 0.5 * uRes;
}
`

export const fiberVertex = /* glsl */ `
in vec4 aStrand; // x : position en travers, y : profondeur, z : phase, w : caractère

${spine}

uniform float uT0;
uniform float uT1;
uniform float uDpr;
uniform float uIntro;
uniform float uVertexT;
uniform float uGlitch;

out float vAcross;
out float vHalf;
out float vCore;
out float vS;
out float vPhase;
out float vPulse;
out vec3 vColor;
out float vAlpha;

float hash(float n) {
  return fract(sin(n) * 43758.5453123);
}

void main() {
  float t = mix(uT0, uT1, position.x);
  float side = position.y;
  float spread;
  float glow;
  float light;
  float spread2;
  float glow2;
  float light2;
  vec3 p = fiber(t, aStrand.x, aStrand.y, aStrand.z, spread, glow, light);
  // Un pas de 0,25 unité le long du chemin donne la direction de la fibre à l'écran.
  vec3 q = fiber(t + 0.25 / uLength, aStrand.x, aStrand.y, aStrand.z, spread2, glow2, light2);

  vec4 c0 = projectionMatrix * viewMatrix * vec4(p, 1.0);
  vec4 c1 = projectionMatrix * viewMatrix * vec4(q, 1.0);
  vec2 s0 = toScreen(c0);
  vec2 s1 = toScreen(c1);
  vec2 dir = normalize(s1 - s0 + vec2(1e-5));
  vec2 nrm = vec2(-dir.y, dir.x);

  float kind = aStrand.w;
  // Les fibres proches de la caméra sont un peu plus épaisses.
  float persp = clamp(17.0 / c0.w, 0.7, 1.8);
  float core = mix(0.42, 1.0, kind * kind) * uDpr * persp * (1.0 + glow * 0.5);
  float halfWidth = core * 3.4;

  if (uGlitch > 0.0) {
    float band = floor(s0.y / (18.0 * uDpr));
    s0.x += (hash(band + floor(uTime * 24.0)) - 0.5) * 80.0 * uDpr * uGlitch;
  }

  vec2 sp = s0 + nrm * side * halfWidth;
  gl_Position = vec4(sp / (0.5 * uRes) * c0.w, c0.z, c0.w);

  float pick = fract(aStrand.z * 7.31);
  vec3 lime = vec3(0.72, 1.0, 0.16);
  vec3 pale = vec3(0.92, 1.0, 0.55);
  vec3 deep = vec3(0.32, 0.68, 0.1);
  vec3 cyan = vec3(0.22, 0.62, 1.0);
  vec3 color = pick < 0.2 ? cyan : pick < 0.48 ? deep : pick < 0.82 ? lime : pale;
  color = mix(color, vec3(1.0, 1.0, 0.92), glow * 0.85);
  color = mix(color, cyan, uGlitch * step(0.5, pick));

  // Apparition : les fibres s'allument depuis le sommet du héros.
  float dist = abs(t - uVertexT) * uLength;
  // Une fois l'intro finie, plus aucune limite : tout le chemin est allumé.
  float reach = uIntro >= 0.999 ? 1e6 : uIntro * 60.0;
  float reveal = 1.0 - smoothstep(reach - 6.0, reach, dist);
  float front = exp(-pow((dist - reach + 3.0) / 3.0, 2.0)) * (1.0 - uIntro);

  float brightness = 0.13 + 0.62 * pow(kind, 2.2);
  vAcross = side;
  vHalf = halfWidth;
  vCore = core;
  vS = t * uLength;
  vPhase = aStrand.z;
  vPulse = step(0.5, kind);
  vColor = color;
  // Au pincement, des centaines de fibres se superposent : chacune y brille moins, l'ensemble reste chaud.
  vAlpha = brightness * reveal * light * (1.0 + front * 3.0) * (1.0 + glow * 3.2) / (1.0 + glow * 1.2);
}
`

export const fiberFragment = /* glsl */ `
uniform float uTime;
uniform float uFlow;

in float vAcross;
in float vHalf;
in float vCore;
in float vS;
in float vPhase;
in float vPulse;
in vec3 vColor;
in float vAlpha;

void main() {
  float x = abs(vAcross) * vHalf;
  float core = exp(-0.5 * x * x / (vCore * vCore));
  float sigma = vHalf * 0.45;
  float halo = exp(-0.5 * x * x / (sigma * sigma));
  float a = core + 0.06 * halo;

  // Impulsions de lumière qui filent le long des fibres.
  float p = fract(vS / 9.0 - uTime * (0.06 + 0.08 * vPhase) + vPhase * 3.0 + uFlow);
  float streak = smoothstep(0.0, 0.01, p) * (1.0 - smoothstep(0.01, 0.07, p));
  vec3 color = vColor * (1.0 + streak * vPulse * 2.5);

  a *= vAlpha;
  gl_FragColor = vec4(color * a, a);
}
`

export const dustVertex = /* glsl */ `
in vec4 aDust; // x : position en travers, y : profondeur, z : graine, w : taille

${spine}

uniform float uDpr;
uniform float uIntro;
uniform float uVertexT;

out float vAlpha;
out float vBokeh;

void main() {
  float seed = aDust.z;
  // Les poussières glissent lentement le long du chemin.
  float t = fract(position.x + uTime * (0.25 + seed * 0.5) / uLength);
  float spread;
  float glow;
  float light;
  vec3 p = fiber(t, aDust.x * 1.6, aDust.y * 1.6, seed, spread, glow, light);
  p += vec3(sin(uTime * 0.2 + seed * 40.0), cos(uTime * 0.17 + seed * 23.0), sin(uTime * 0.13 + seed * 9.0)) * 0.06;

  vec4 mv = viewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;

  float bokeh = step(0.9, aDust.w);
  float size = mix(1.4 + 2.8 * aDust.w, 9.0 + 26.0 * fract(seed * 13.7), bokeh);
  gl_PointSize = size * uDpr * clamp(17.0 / -mv.z, 0.6, 2.2);

  float dist = abs(t - uVertexT) * uLength;
  float reach = uIntro >= 0.999 ? 1e6 : uIntro * 60.0;
  float reveal = 1.0 - smoothstep(reach - 6.0, reach, dist);
  float twinkle = 0.55 + 0.45 * sin(uTime * (0.8 + seed * 1.7) + seed * 50.0);
  vAlpha = twinkle * reveal * light * mix(0.9, 0.1, bokeh);
  vBokeh = bokeh;
}
`

export const dustFragment = /* glsl */ `
in float vAlpha;
in float vBokeh;

void main() {
  float d = length(gl_PointCoord * 2.0 - 1.0);
  if (d > 1.0) discard;
  float spark = pow(1.0 - d, 2.4);
  float disc = smoothstep(1.0, 0.8, d) * (0.4 + 0.6 * smoothstep(0.3, 0.95, d));
  float a = mix(spark, disc, vBokeh) * vAlpha;
  vec3 color = mix(vec3(0.85, 1.0, 0.5), vec3(0.7, 0.95, 0.55), vBokeh);
  gl_FragColor = vec4(color * a, a);
}
`
