// Shaders des particules du Lab : pistes de circuit → rack 10" (vue éclatée, LED, écran).
// Bruit simplex 3D : Ashima Arts / Stefan Gustavson (licence MIT).

const noise = /* glsl */ `
vec4 permute(vec4 x){ return mod(((x * 34.0) + 1.0) * x, 289.0); }
vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v){
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
  i = mod(i, 289.0);
  vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 1.0 / 7.0;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
// Champ de déplacement bon marché : 3 échantillons de bruit décalés.
vec3 drift(vec3 p){
  return vec3(snoise(p), snoise(p + vec3(31.4, 7.1, 3.3)), snoise(p + vec3(5.2, 57.1, 11.7)));
}
`

export const particlesVertex = /* glsl */ `
uniform float uTime;
uniform float uProgress;
uniform float uExplode;
uniform float uFocus;
uniform float uVisible;
uniform float uGlitch;
uniform vec3 uPointer;
uniform float uPointerStrength;
uniform float uSize;
uniform float uPixelRatio;
uniform float uViewHeight;

// position = pistes du circuit (état de départ)
attribute vec3 aRack;
attribute vec4 aRand;
attribute vec4 aMeta;

varying vec3 vColor;
varying float vAlpha;
varying float vRound;

${noise}

const float SERVER_UNIT = 4.0;
const float EXPLODE_GAP = 0.22;
const float EXPLODE_Z = 0.55;
const float RACK_SCALE = 0.68;

vec3 rackPos() {
  vec3 p = aRack;
  if (aMeta.z >= 0.0) {
    p.y += (3.5 - aMeta.z) * EXPLODE_GAP * uExplode;
    p.z += EXPLODE_Z * uExplode;
  }
  return p * RACK_SCALE;
}

void main() {
  // Chaque particule part avec son propre délai : le rack se construit piste par piste.
  float delay = aRand.x * 0.4;
  float lt = smoothstep(delay, delay + 0.6, uProgress);
  vec3 pos = mix(position, rackPos(), lt);
  float mid = sin(lt * 3.14159265);
  if (mid > 0.01) pos += drift(pos * 0.35 + vec3(uTime * 0.05)) * mid * 0.6;

  // Le pointeur repousse doucement les particules.
  vec2 d = pos.xy - uPointer.xy;
  float push = uPointerStrength * (1.0 - smoothstep(0.0, 1.1, length(d)));
  pos.xy += normalize(d + 1e-4) * push * 0.35;
  pos.z += push * 0.25;

  // Konami : déchirures horizontales.
  if (uGlitch > 0.001) {
    float band = floor((pos.y + uTime * 3.0) * 6.0);
    float g = step(0.75, fract(sin(band * 12.9898 + floor(uTime * 20.0)) * 43758.5453));
    pos.x += (aRand.z - 0.5) * 1.6 * uGlitch * g;
  }

  float pulse = 0.0;
  if (aMeta.x >= 0.0) {
    float head = fract(uTime * 0.22 + aMeta.x);
    pulse = smoothstep(0.07, 0.0, abs(head - aMeta.y)) * (1.0 - lt);
  }
  float led = aMeta.w > 0.75 ? step(0.4, fract(uTime * (0.5 + aRand.z * 1.8) + aRand.z * 7.0)) * lt : 0.0;
  float screen = (aMeta.w > 0.25 && aMeta.w < 0.75) ? lt : 0.0;
  float focusDim = 1.0;
  if (aMeta.z >= 0.0) {
    bool server = abs(aMeta.z - SERVER_UNIT) < 0.5;
    focusDim = mix(1.0, server ? 1.6 : 0.3, uFocus * lt);
  }
  float bright = pulse * 1.6 + led * 1.8 + screen * 0.5;

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;

  float size = uSize * (0.4 + aRand.y * 0.9) * (1.0 + led * 1.6 + pulse * 0.8);
  gl_PointSize = size * uPixelRatio * (uViewHeight / 900.0) * (7.0 / -mv.z);

  vec3 base = mix(vec3(0.93, 0.93, 0.95), vec3(0.42, 0.89, 1.0), aRand.w * 0.55);
  vec3 col = mix(base, vec3(0.75, 0.97, 1.0), clamp(pulse, 0.0, 1.0));
  col = mix(col, vec3(0.42, 0.89, 1.0), screen * 0.7);
  col = mix(col, vec3(0.784, 1.0, 0.18), clamp(led, 0.0, 1.0));
  vColor = col;
  vAlpha = (0.34 + 0.66 * clamp(bright, 0.0, 1.0)) * focusDim * uVisible;
  vRound = clamp(led + pulse, 0.0, 1.0);
}
`

export const particlesFragment = /* glsl */ `
varying vec3 vColor;
varying float vAlpha;
varying float vRound;

void main() {
  // Des « pixels » de données carrés et nets ; les LED et impulsions restent des lueurs rondes.
  vec2 c = gl_PointCoord - 0.5;
  float glow = smoothstep(0.5, 0.0, length(c));
  glow *= glow;
  float square = 1.0 - smoothstep(0.3, 0.5, max(abs(c.x), abs(c.y)));
  float a = mix(square, glow, vRound);
  if (a < 0.01) discard;
  // Mélange additif (SRC_ALPHA, ONE) : la couleur n'est multipliée par l'alpha qu'une seule fois.
  gl_FragColor = vec4(vColor, a * vAlpha);
}
`
