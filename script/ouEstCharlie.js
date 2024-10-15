//1.attendre que la page soit chargée
document.addEventListener('DOMContentLoaded', function() {
    // 2.Créer mes variables sur les éléments dans le DOM (image à cliquer, boîte, flouté et son)
    const herculeButton = document.getElementById('herculeFoireux');
    const dialogBoxHercule = document.getElementById('dialogBoxHercule');
    const overlay = document.querySelector('.overlay');
    const charlieButton = document.getElementById('charlie');
    const dialogBoxCharlie = document.getElementById('dialogBoxCharlie');
    const zoomSound = document.getElementById('zoomSound')
    // événement bouton Hercule
    herculeButton.addEventListener('click', function() {
        dialogBoxHercule.classList.toggle('hidden');//enlever la classe 'hidden' de la boîte de dialogue pour qu'elle apparaisse
        overlay.classList.toggle('hidden');
        document.querySelector(".close").addEventListener('click',function(){
            dialogBoxHercule.classList.add('hidden');
            overlay.classList.toggle('hidden');
        });
    });
    // événement bouton Charlie
    charlieButton.addEventListener('click', function() {
        dialogBoxCharlie.classList.toggle('hidden');
        overlay.classList.toggle('hidden');
        zoomSound.currentTime = 0; //commencer à jouer depuis le début
        zoomSound.volume = 1;
        zoomSound.play();
        setTimeout(function() {
            fadeOutSound(zoomSound, 3000);// Lancer le fadeout sur 3 secondes
        }, 3000);
        // document.getElementById('dialogBoxCharlie').addEventListener('click', function() {
        //     window.location.href = 'win.html';
        // });
    });

    //fonction pour le fadeout
    function fadeOutSound(sound, duration) {
        const step = 0.1;// Le pas pour réduire le volume
        const interval = duration / (1 / step);// Durée entre chaque réduction de volume
        const fadeInterval = setInterval(function() {
            if (sound.volume > step) {
                sound.volume -= step;// Réduire le volume par le pas défini
            } else {
                sound.volume = 0;// Mettre le volume à zéro
                sound.pause();// Mettre le son en pause
                clearInterval(fadeInterval);// Arrêter l'intervalle
            }
        }, interval);
    }
    function buttonTransition(classButton, overlay) {
        const transitionLink = document.querySelector(`.${classButton}`);
        const overlayAnimation = document.querySelector(`.${overlay}`);

        if (transitionLink) {
            transitionLink.addEventListener('click', (e) => {
                e.preventDefault();
                const targetHref = transitionLink.getAttribute('href');

                overlayAnimation.classList.add('active');

                setTimeout(() => {
                    window.location.href = targetHref;
                }, 1000);
            });
        }
    }
    buttonTransition('close-charlie','overlayPageWin')
});



