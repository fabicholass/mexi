   function handleInput() {
        const inputBox = document.getElementById('inputBox');
        if (inputBox.value === 'SERIATUM') {
            revealText('3GtCUfI');
        } else if (inputBox.value === 'aYiz4') {
            revealText('WELL DONE.');
        } else if (inputBox.value === 'aYiz4Lojy3JuWSJ') {
            fadeToBlackAndRedirect();
        }
    }

    function fadeToBlackAndRedirect() {
        const fadeDuration = 3000; // 3 seconds
        const startTime = performance.now();

        function fade() {
            const currentTime = performance.now();
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / fadeDuration, 1);
            
            uniforms.Brightness.value = 0.2 - 0.2 * progress; // Reduces brightness to 0
            uniforms.Contrast.value = 5 - 5 * progress;       // Reduces contrast to 0

            if (progress < 1) {
                requestAnimationFrame(fade);
            } else {
                window.location.href = 'https://mexipiso.com/aYiz4Lojy3JuWSJ';
            }
        }

        fade();
    }

    document.getElementById('inputBox').addEventListener('input', handleInput);