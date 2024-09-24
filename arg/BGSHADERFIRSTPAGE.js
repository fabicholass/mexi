<script id="fragmentShader" type="x-shader/x-fragment">
#ifdef GL_ES
precision highp float;
#endif

uniform float iGlobalTime;
uniform vec2 iResolution;
uniform float ITERATIONS;
uniform float TIMEOFFSET;
uniform float SPIRAL;
uniform float STRUCTURE;
uniform float ZOOM;
uniform float TINT;
uniform float COLOUR;
uniform float ShiftX;
uniform float ShiftY;
uniform float DustDensity;
uniform float CentralCore;
uniform float CoreHaze;
uniform float CoreIntensity;
uniform float StarsGreen;
uniform float StarsBlue;
uniform float Brightness;
uniform float Contrast;

vec3 applyBrightnessContrast(vec3 color, float brightness, float contrast) {
    color = color * brightness;
    color = (color - 0.5) * contrast + 0.5;
    return clamp(color, 0.0, 1.0);
}

void main() {
    vec2 uv = (gl_FragCoord.xy / iResolution.xy);

    uv.x -= ShiftX;
    uv.y -= ShiftY / (iResolution.x / iResolution.y);

    float len = length(uv.xy) * (1.0 - ZOOM);

    float t = .1 * iGlobalTime + TIMEOFFSET;
    float time = t + (5.0 + sin(t)) * .11 / (len + 1.0 - SPIRAL);
    float si = sin(time), co = cos(time);
    uv *= mat2(co, si, -si, co);

    float c = 0.0, v1 = 0.0, v2 = 0.0, v3;
    vec3 p;

    for (int i = 0; i < 100; i++) {
        if (i > int(ITERATIONS)) { break; }
        p = .035 * float(i) * vec3(uv, 1.0);
        p += vec3(.622, .3, -1.5 - sin(t * 1.3) * .1);
        for (int j = 0; j < 10; j++) {
            p = abs(p) / dot(p, p) - STRUCTURE;
        }
        float p2 = dot(p, p) * .0015;
        v1 += p2 * (1.8 + sin(len * 13.0 + .5 - t * 2.0));
        v2 += p2 * (1.5 + sin(len * 13.5 + 2.2 - t * 3.0));
    }

    c = length(p.xy) * DustDensity;
    v1 *= smoothstep(StarsGreen * .7, .0, len);
    v2 *= smoothstep(StarsBlue * .7, .0, len);
    v3 = smoothstep(CoreHaze, .0, len / 2.0);

    float gray = c + (v2 + c) * .25 + v1;
    gray = gray + v3 * (.7 + CentralCore * .3) * CoreIntensity;
    gray = applyBrightnessContrast(vec3(gray), Brightness, Contrast).r;

    gl_FragColor = vec4(vec3(gray), 1.0);
}
</script>
