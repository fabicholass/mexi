        let scene, camera, renderer, uniforms;

        function init() {
            scene = new THREE.Scene();
            camera = new THREE.Camera();
            camera.position.z = 1;

            let geometry = new THREE.PlaneBufferGeometry(2, 2);

            uniforms = {
                iGlobalTime: { value: 0.0 },
                iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
                ITERATIONS: { value: 80.0 },
                TIMEOFFSET: { value: 0.0 },
                SPIRAL: { value: 0.87 },
                STRUCTURE: { value: 0.65 },
                ZOOM: { value: 0.1 },
                TINT: { value: 1.0 },
                COLOUR: { value: 1.0 },
                ShiftX: { value: 0.5 },
                ShiftY: { value: 0.5 },
                DustDensity: { value: 0.02 },
                CentralCore: { value: 0.9 },
                CoreHaze: { value: 0.066 },
                CoreIntensity: { value: 0.9 },
                StarsGreen: { value: 0.56 },
                StarsBlue: { value: 0.51 },
                Brightness: { value: 0.2 },
                Contrast: { value: 5 }
            };

            let material = new THREE.ShaderMaterial({
                uniforms: uniforms,
                fragmentShader: document.getElementById('fragmentShader').textContent
            });

            let mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);

            renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.getElementById('shaderCanvas').appendChild(renderer.domElement);
        }

        function animate() {
            requestAnimationFrame(animate);
            uniforms.iGlobalTime.value += 0.05;
            renderer.render(scene, camera);
        }

        function redirectToRandomPage() {
            const urls = [
                "https://mexipiso.com/verbatim/S",
                "https://mexipiso.com/verbatim/E",
                "https://mexipiso.com/verbatim/R",
                "https://mexipiso.com/verbatim/I",
                "https://mexipiso.com/verbatim/A",
                "https://mexipiso.com/verbatim/T",
                "https://mexipiso.com/verbatim/U",
                "https://mexipiso.com/verbatim/M"
            ];
            const randomUrl = urls[Math.floor(Math.random() * urls.length)];
            window.location.href = randomUrl;
        }

        function handleInput() {
            const inputBox = document.getElementById('inputBox');
            const text = document.getElementById('text');
            if (inputBox.value === 'SERIATUM') {
                revealText('3GtCUfI');
            } else if (inputBox.value === 'aYiz4') {
                revealText('WELL DONE.');
            }
        }

        function revealText(newText) {
            const textElement = document.getElementById('text');
            const textSound = document.getElementById('textSound');
            let i = 0;
            textElement.textContent = '';
            function showNextLetter() {
                if (i < newText.length) {
                    if (newText[i] !== ' ') {
                        textSound.currentTime = 0;
                        textSound.play();
                    }
                    textElement.textContent += newText[i];
                    i++;
                    setTimeout(showNextLetter, 300);
                }
            }
            showNextLetter();
        }

        init();
        animate();

        window.addEventListener('resize', () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            uniforms.iResolution.value.set(window.innerWidth, window.innerHeight);
        });

        document.getElementById('inputBox').addEventListener('input', handleInput);
        document.getElementById('text').addEventListener('click', redirectToRandomPage);