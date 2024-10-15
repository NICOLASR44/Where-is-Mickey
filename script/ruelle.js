document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");

    const images = document.querySelectorAll(".image-container img");
    const carSound = document.getElementById("car-sound");
    const knifeSound = document.getElementById("knife-sound");
    const gunSound = document.getElementById("gun-sound");
    const bagSound = document.getElementById("bag-sound");
    const sandwichSound = document.getElementById("sandwich-sound");
    const launchSound = document.getElementById("missile-sound");
    const backgroundMusic = document.getElementById("background-music");
    const muteButton = document.getElementById("mute-button");
    const unmuteButton = document.getElementById("unmute-button");

    // Vérification de l'existence de l'élément et ajout d'un bouton de démarrage manuel si nécessaire
    if (backgroundMusic) {
        backgroundMusic.addEventListener('canplaythrough', () => {
            console.log("Background music is ready to play");
        });

        // Tenter de démarrer la musique de fond
        try {
            backgroundMusic.currentTime = 0;
            backgroundMusic.play().catch(error => {
                console.error("Error playing background music:", error);
                showPlayButton(); // Afficher un bouton pour permettre à l'utilisateur de démarrer la musique
            });
        } catch (error) {
            console.error("Error playing background music:", error);
            showPlayButton(); // Afficher un bouton pour permettre à l'utilisateur de démarrer la musique
        }
    }

    // Fonction pour afficher un bouton de lecture si la lecture automatique échoue
    function showPlayButton() {
        const playButton = document.createElement('button');
        playButton.id = 'play-button';
        playButton.src = './images/play.png'; // Chemin de votre image pour "Play Music"
        playButton.alt = 'Play Music';
        playButton.style.position = 'fixed';
        playButton.style.height = '40px';
        playButton.style.top = '40px';
        playButton.style.right = '200px';
        playButton.style.zIndex = 1001;
        document.body.appendChild(playButton);

        playButton.addEventListener('click', () => {
            backgroundMusic.play().then(() => {
                playButton.style.display = 'none';
            }).catch(error => {
                console.error("Error playing background music after user interaction:", error);
            });
        });
    }

    if (muteButton && unmuteButton) {
        muteButton.addEventListener('click', () => {
            if (backgroundMusic) {
                backgroundMusic.muted = true;
            }
            muteButton.style.display = 'none';
            unmuteButton.style.display = 'block';
        });

        unmuteButton.addEventListener('click', () => {
            if (backgroundMusic) {
                backgroundMusic.muted = false;
            }
            muteButton.style.display = 'block';
            unmuteButton.style.display = 'none';
        });
    }

    const sounds = {
        car: carSound,
        knife: knifeSound,
        gun: gunSound,
        bag: bagSound,
        sandwich: sandwichSound,
        launch: launchSound,
       
    };

    Object.keys(sounds).forEach(key => {
        if (sounds[key]) {
            sounds[key].addEventListener('canplaythrough', () => {
                console.log(`${key} audio is ready to play`);
            });

            sounds[key].addEventListener('error', (e) => {
                console.error(`Error loading ${key} audio`, e);
            });
        }
    });

    let userInteracted = false;

    function onUserInteraction() {
        userInteracted = true;
        document.removeEventListener('click', onUserInteraction);
        document.removeEventListener('keydown', onUserInteraction);
    }

    document.addEventListener('click', onUserInteraction);
    document.addEventListener('keydown', onUserInteraction);

    let effectsApplied = {
        car: sessionStorage.getItem('carEffectApplied') === 'true',
        knife: sessionStorage.getItem('knifeEffectApplied') === 'true',
        gun: sessionStorage.getItem('gunEffectApplied') === 'true',
        bag: sessionStorage.getItem('bagEffectApplied') === 'true',
        sandwich: sessionStorage.getItem('sandwichEffectApplied') === 'true',
        launch: sessionStorage.getItem('launchEffectApplied') === 'true',
        mickey: sessionStorage.getItem('mickeyEffectApplied') === 'true',
        penguin: sessionStorage.getItem('penguinEffectApplied') === 'true',
    };

    images.forEach(image => {
        image.addEventListener("mouseover", function () {
            console.log("Mouse over:", image.id);

            if (image.id === "mickey" || image.id === "penguin") {
                console.log(`${image.id} is hovered`);
            }

            image.style.transition = "transform 0.3s ease";

            if (["knife", "gun", "bag", "sandwich", "launch", "mickey", "penguin"].includes(image.id) && !effectsApplied[image.id]) {
                image.style.transform = "scale(2.5)";
                effectsApplied[image.id] = true;
                sessionStorage.setItem(`${image.id}EffectApplied`, 'true');

                if (userInteracted && sounds[image.id]) {
                    const sound = sounds[image.id];
                    sound.currentTime = 0;
                    sound.play().then(() => {
                        console.log(`Playing ${image.id} sound`);
                    }).catch(error => {
                        console.error(`Error playing ${image.id} sound`, error);
                    });
                } else if (!userInteracted) {
                    console.log("User has not interacted with the page yet");
                }
            } else if (image.id === "car" && !effectsApplied.car) {
                image.style.transform = "rotate(360deg)";
                effectsApplied.car = true;
                sessionStorage.setItem('carEffectApplied', 'true');

                if (userInteracted) {
                    carSound.currentTime = 0;
                    carSound.play().then(() => {
                        console.log("Playing car sound");
                    }).catch(error => {
                        console.error("Error playing car sound", error);
                    });
                } else {
                    console.log("User has not interacted with the page yet");
                }
            } else {
                image.style.transform = "scale(1.2)";
            }
        });

        image.addEventListener("mouseout", function () {
            console.log("Mouse out:", image.id);

            if (image.id === "mickey" || image.id === "penguin") {
                console.log(`${image.id} is no longer hovered`);
            }

            image.style.transition = "transform 0.3s ease";
            setTimeout(() => {
                image.style.transform = "scale(1)";
            }, 300);
        });
    });
});



document.addEventListener('DOMContentLoaded', () => {
    // Inspecteur Foireux
    const penguinImage = document.getElementById('penguin');
    const penguinPopup = document.getElementById('manchotMessage');
    const nextPenguinBtn = document.getElementById('nextPenguin');
    const penguinMessage2 = document.getElementById('manchotMessage2');
    const penguinMessage3 = document.getElementById('manchotmessage3');
    const penguinMessage4 = document.getElementById('manchotMessage4');
    const penguinMessage5 = document.getElementById('manchotMessage5');
    const closeBtnFoireuxL = document.getElementById('closeFoireuxL')

    //Voiture
    const carMessage = document.getElementById('carMessage');
    const closeBtnCar = document.getElementById('closeCar');
    const carImage = document.getElementById('car')

    //Garbage
    const garbageMessage = document.getElementById('garbageMessage');
    const garbageImage = document.getElementById('garbage');
    const closeBtnGarbage = document.getElementById('closeGarbage');
    const garbageMessage2 = document.getElementById('garbageMessage2');
    const nextButtonGarbage = document.getElementById('nextGarbage');

    //Sandwich
    const sandwichMessage = document.getElementById('sandwichMessage');
    const nextBtnSandwich = document.getElementById('nextSandwich');
    const sandwichMessage2 = document.getElementById('sandwichMessage2');
    const nextBtnSandwich2 = document.getElementById('nextSandwich2');

    //Revolver
    const revolverMessage = document.getElementById('revolverMessage');
    const nextBtnRevolver = document.getElementById('nextRevolver');
    const revolverMessage2 = document.getElementById('revolverMessage2');
    const closeBtnRevolver = document.getElementById('closeRevolver')

    //Arme alien
    const alienMessage = document.getElementById('alienMessage');
    const nextBtnAlien = document.getElementById('nextAlien');
    const alienMessage2 = document.getElementById('alienMessage2');
    const closeBtnAlien = document.getElementById('closeAlien');

    //Sac à main
    const sacMessage = document.getElementById('sacMessage');
    const nextSac = document.getElementById('nextSac');
    const sacMessage2 = document.getElementById('sacMessage2');


    // Mickey
    const mickeyImage = document.getElementById('mickey');
    const mickeyMessage = document.getElementById('mickeymessage');
    const lastTalkOfMickey = document.getElementById('mickeymessage2');

    //Franklin
    const franklinImage = document.getElementById('franklinsdf');
    const franklinMessage = document.getElementById('franklinMessage');
    const franklinNextBtn = document.getElementById('nextFranklin');
    const franklinMessage2 = document.getElementById('franklinMessage2');
    const franklinMessage3 = document.getElementById('franklinMessage3');
    const franklinMessage4 = document.getElementById('franklinMessage4');
    const closeLastBtnF = document.getElementById('closeBtnF');

    //Joueur
    const playerLeave = document.getElementById('partir');
    const playerAsk = document.getElementById('nextFranklin2')
    const playerMessage = document.getElementById('joueurMessage');
    const choice1 = document.getElementById('joueurChoice1');
    const choice2 = document.getElementById('joueurChoice2')
    // Buttons
    const nextMickeyBtn = document.getElementById('nextMickey');
    const nextMickeyToPenguin2Btn = document.getElementById('nextPenguin2');
    const closeBtnMickey = document.getElementById('closeBtn');
    const nextFranklinToPlayer = document.getElementById('nextFranklin3');
    const nextPenguinToFranklin = document.getElementById('nextFranklin4');
    const nextFranklinToPenguin = document.getElementById('nextFranklin5');
    const unlockGarbage = document.getElementById('nextFranklin6');


    //Close message Foireux :
    closeBtnFoireuxL.addEventListener('click', () => {
        penguinMessage5.style.display = "none";
    })

    //Message inspecteur Foireux :
    penguinImage.addEventListener('click', () => {
        penguinMessage5.style.display = 'block';
    })


    //Crime weapon discoverd :
    nextBtnSandwich2.addEventListener('click', () => {
        sandwichMessage2.style.display = 'none';
        penguinMessage4.style.display = 'block';


    })

    //Sandwich selection :
    nextBtnSandwich.addEventListener('click', () => {
        sandwichMessage2.style.display = "block";
        sacMessage.style.display = "none";
        alienMessage.style.display = 'none';
        revolverMessage.style.display = 'none';
        sandwichMessage.style.display = 'none';

    })

    //Sac selection :
    nextSac.addEventListener('click', () => {
        sacMessage2.style.display = 'block';
        sacMessage.style.display = "none";
        alienMessage.style.display = 'none';
        revolverMessage.style.display = 'none';
        sandwichMessage.style.display = 'none';

    })

    //Alien weapon close window :
    closeBtnAlien.addEventListener('click', () => {
        alienMessage2.style.display = 'none';
    })

    //Alien weapon selection :
    nextBtnAlien.addEventListener('click', () => {
        alienMessage2.style.display = 'block';
        sacMessage.style.display = "none";
        alienMessage.style.display = 'none';
        revolverMessage.style.display = 'none';
        sandwichMessage.style.display = 'none';

    })

    //Revolver close window:
    closeBtnRevolver.addEventListener('click', () => {
        revolverMessage2.style.display = 'none';
    })

    //Revolver selection :
    nextBtnRevolver.addEventListener('click', () => {
        revolverMessage2.style.display = 'block';
        sacMessage.style.display = "none";
        alienMessage.style.display = 'none';
        revolverMessage.style.display = 'none';
        sandwichMessage.style.display = 'none';

    })

    //Choice of player between 4 items :
    nextButtonGarbage.addEventListener('click', () => {
        sacMessage.style.display = "block";
        alienMessage.style.display = 'block';
        revolverMessage.style.display = 'block';
        sandwichMessage.style.display = 'block';
        garbageMessage2.style.display = 'none';
    })


    let franklinMessageDisplay = false

    //Unlocked garbage interaction :
    garbageImage.addEventListener('click', () => {
        if (franklinMessageDisplay) {
            garbageMessage2.style.display = "block";
        } else { garbageMessage.style.display = 'block'; }
    })

    // //Close garbage's message:
    closeBtnGarbage.addEventListener('click', () => {
        garbageMessage.style.display = 'none';
    })

    // //Garbage's Interaction :
    // garbageImage.addEventListener('click', () => {

    // })

    //Close car's message :
    closeBtnCar.addEventListener('click', () => {
        carMessage.style.display = 'none';
    })

    //Car's Interaction :
    carImage.addEventListener('click', () => {
        carMessage.style.display = 'block';
    })

    //Unlock garbage interaction and close big talk with Franklin and Foireux :
    unlockGarbage.addEventListener('click', () => {
        penguinMessage3.style.display = 'none';
        franklinMessageDisplay = true;
        franklinMessageDisplay2 = true;
    })

    //Franklin to Foireux :
    nextFranklinToPenguin.addEventListener('click', () => {
        franklinMessage3.style.display = 'none';
        penguinMessage3.style.display = 'block';
    })

    //Franklin 3rd message:
    nextPenguinToFranklin.addEventListener('click', () => {
        playerMessage.style.display = "none";
        franklinMessage3.style.display = "block";
    })

    //close last message of franklin
    closeLastBtnF.addEventListener('click', () => {
        franklinMessage4.style.display = "none";
    })

    let franklinMessageDisplay2 = false

    // Franklin 1st message:
    franklinImage.addEventListener('click', () => {
        if (franklinMessageDisplay2) {
            franklinMessage4.style.display = 'block';
        } else { franklinMessage.style.display = "block"; }

    });
    // Frankin 2nd message to player:
    nextFranklinToPlayer.addEventListener('click', () => {
        franklinMessage2.style.display = 'none';
        playerMessage.style.display = 'block';
    })

    //choice 2 of player
    playerAsk.addEventListener('click', () => {
        choice1.style.display = "none";
        choice2.style.display = "none";
        franklinMessage2.style.display = "block";

    })

    //Choice 1 of player
    playerLeave.addEventListener('click', () => {
        choice1.style.display = "none";
        choice2.style.display = "none";
    });


    //1st Transition Franklin to the player
    franklinNextBtn.addEventListener('click', () => {
        franklinMessage.style.display = 'none';
        choice1.style.display = 'block';
        choice2.style.display = 'block'

    });

    // Show the penguin message when the penguin image is clicked
    window.addEventListener('load', () => {
        penguinPopup.style.display = 'block';
    });

    // Hide the penguin message and show the mickey message when the next button is clicked
    nextPenguinBtn.addEventListener('click', () => {
        penguinPopup.style.display = 'none';
        mickeyMessage.style.display = 'block';
    });

    // Hide the mickey message and show the second penguin message when the next button is clicked
    nextMickeyBtn.addEventListener('click', () => {
        mickeyMessage.style.display = 'none';
        penguinMessage2.style.display = 'block';
    });

    // Show the last mickey message when the mickey image is clicked
    mickeyImage.addEventListener('click', () => {
        lastTalkOfMickey.style.display = 'block';
    });

    // Hide the last mickey message when the close button is clicked
    closeBtnMickey.addEventListener('click', () => {
        lastTalkOfMickey.style.display = 'none';
    });

    // Hide the last mickey message when the next button is clicked
    nextMickeyToPenguin2Btn.addEventListener('click', () => {
        penguinMessage2.style.display = 'none';
    });
    // Hide the last mickey message when the close button is clicked
    closeBtnMickey.addEventListener('click', () => {
        lastTalkOfMickey.style.display = 'none';
    });
    // Hide the last mickey message when the close button is clicked
    closeBtnMickey.addEventListener('click', () => {
        lastTalkOfMickey.style.display = 'none';
    });
});


document.addEventListener('DOMContentLoaded', () => {
    // Inspecteur Foireux
    const penguinImage = document.getElementById('penguin');
    const penguinPopup = document.getElementById('manchotMessage');
    const nextPenguinBtn = document.getElementById('nextPenguin');
    const penguinMessage2 = document.getElementById('manchotMessage2');
    const penguinMessage3 = document.getElementById('manchotmessage3');
    const penguinMessage4 = document.getElementById('manchotMessage4');
    const penguinMessage5 = document.getElementById('manchotMessage5');
    const closeBtnFoireuxL = document.getElementById('closeFoireuxL')

    //Voiture
    const carMessage = document.getElementById('carMessage');
    const closeBtnCar = document.getElementById('closeCar');
    const carImage = document.getElementById('car')

    //Garbage
    const garbageMessage = document.getElementById('garbageMessage');
    const garbageImage = document.getElementById('garbage');
    const closeBtnGarbage = document.getElementById('closeGarbage');
    const garbageMessage2 = document.getElementById('garbageMessage2');
    const nextButtonGarbage = document.getElementById('nextGarbage');

    //Sandwich
    const sandwichMessage = document.getElementById('sandwichMessage');
    const nextBtnSandwich = document.getElementById('nextSandwich');
    const sandwichMessage2 = document.getElementById('sandwichMessage2');
    const nextBtnSandwich2 = document.getElementById('nextSandwich2');

    //Revolver
    const revolverMessage = document.getElementById('revolverMessage');
    const nextBtnRevolver = document.getElementById('nextRevolver');
    const revolverMessage2 = document.getElementById('revolverMessage2');
    const closeBtnRevolver = document.getElementById('closeRevolver')

    //Arme alien
    const alienMessage = document.getElementById('alienMessage');
    const nextBtnAlien = document.getElementById('nextAlien');
    const alienMessage2 = document.getElementById('alienMessage2');
    const closeBtnAlien = document.getElementById('closeAlien');

    //Sac à main
    const sacMessage = document.getElementById('sacMessage');
    const nextSac = document.getElementById('nextSac');
    const sacMessage2 = document.getElementById('sacMessage2');


    // Mickey
    const mickeyImage = document.getElementById('mickey');
    const mickeyMessage = document.getElementById('mickeymessage');
    const lastTalkOfMickey = document.getElementById('mickeymessage2');

    //Franklin
    const franklinImage = document.getElementById('franklinsdf');
    const franklinMessage = document.getElementById('franklinMessage');
    const franklinNextBtn = document.getElementById('nextFranklin');
    const franklinMessage2 = document.getElementById('franklinMessage2');
    const franklinMessage3 = document.getElementById('franklinMessage3');

    //Joueur
    const playerLeave = document.getElementById('partir');
    const playerAsk = document.getElementById('nextFranklin2')
    const playerMessage = document.getElementById('joueurMessage');
    const choice1 = document.getElementById('joueurChoice1');
    const choice2 = document.getElementById('joueurChoice2')
    // Buttons
    const nextMickeyBtn = document.getElementById('nextMickey');
    const nextMickeyToPenguin2Btn = document.getElementById('nextPenguin2');
    const closeBtnMickey = document.getElementById('closeBtn');
    const nextFranklinToPlayer = document.getElementById('nextFranklin3');
    const nextPenguinToFranklin = document.getElementById('nextFranklin4');
    const nextFranklinToPenguin = document.getElementById('nextFranklin5');
    const unlockGarbage = document.getElementById('nextFranklin6');


    //Close message Foireux :
    closeBtnFoireuxL.addEventListener('click', () => {
        penguinMessage5.style.display = "none";
    })

    //Message inspecteur Foireux :
    penguinImage.addEventListener('click', () => {
        penguinMessage5.style.display = 'block';
    })


    //Crime weapon discoverd :
    nextBtnSandwich2.addEventListener('click', () => {
        sandwichMessage2.style.display = 'none';
        penguinMessage4.style.display = 'block';


    })

    //Sandwich selection :
    nextBtnSandwich.addEventListener('click', () => {
        sandwichMessage2.style.display = "block";
        sacMessage.style.display = "none";
        alienMessage.style.display = 'none';
        revolverMessage.style.display = 'none';
        sandwichMessage.style.display = 'none';

    })

    //Sac selection :
    nextSac.addEventListener('click', () => {
        sacMessage2.style.display = 'block';
        sacMessage.style.display = "none";
        alienMessage.style.display = 'none';
        revolverMessage.style.display = 'none';
        sandwichMessage.style.display = 'none';

    })

    //Alien weapon close window :
    closeBtnAlien.addEventListener('click', () => {
        alienMessage2.style.display = 'none';
    })

    //Alien weapon selection :
    nextBtnAlien.addEventListener('click', () => {
        alienMessage2.style.display = 'block';
        sacMessage.style.display = "none";
        alienMessage.style.display = 'none';
        revolverMessage.style.display = 'none';
        sandwichMessage.style.display = 'none';

    })

    //Revolver close window:
    closeBtnRevolver.addEventListener('click', () => {
        revolverMessage2.style.display = 'none';
    })

    //Revolver selection :
    nextBtnRevolver.addEventListener('click', () => {
        revolverMessage2.style.display = 'block';
        sacMessage.style.display = "none";
        alienMessage.style.display = 'none';
        revolverMessage.style.display = 'none';
        sandwichMessage.style.display = 'none';

    })

    //Choice of player between 4 items :
    nextButtonGarbage.addEventListener('click', () => {
        sacMessage.style.display = "block";
        alienMessage.style.display = 'block';
        revolverMessage.style.display = 'block';
        sandwichMessage.style.display = 'block';
        garbageMessage2.style.display = 'none';
    })

    //Unlocked garbage interaction :
    garbageImage.addEventListener('click', () => {
        garbageMessage2.style.display = "block";
    })

    // //Close garbage's message:
    // closeBtnGarbage.addEventListener('click', () => {
    //     garbageMessage.style.display = 'none';
    // })

    // //Garbage's Interaction :
    // garbageImage.addEventListener('click', () => {
    //     garbageMessage.style.display = 'block';
    // })

    //Close car's message :
    closeBtnCar.addEventListener('click', () => {
        carMessage.style.display = 'none';
    })

    //Car's Interaction :
    carImage.addEventListener('click', () => {
        carMessage.style.display = 'block';
    })

    //Unlock garbage interaction and close big talk with Franklin and Foireux :
    unlockGarbage.addEventListener('click', () => {
        penguinMessage3.style.display = 'none';
    })

    //Franklin to Foireux :
    nextFranklinToPenguin.addEventListener('click', () => {
        franklinMessage3.style.display = 'none';
        penguinMessage3.style.display = 'block';
    })

    //Franklin 3rd message:
    nextPenguinToFranklin.addEventListener('click', () => {
        playerMessage.style.display = "none";
        franklinMessage3.style.display = "block";
    })

    // Franklin 1st message:
    franklinImage.addEventListener('click', () => {
        franklinMessage.style.display = "block";
    });
    // Frankin 2nd message to player:
    nextFranklinToPlayer.addEventListener('click', () => {
        franklinMessage2.style.display = 'none';
        playerMessage.style.display = 'block';
    })

    //choice 2 of player
    playerAsk.addEventListener('click', () => {
        choice1.style.display = "none";
        choice2.style.display = "none";
        franklinMessage2.style.display = "block";

    })

    //Choice 1 of player
    playerLeave.addEventListener('click', () => {
        choice1.style.display = "none";
        choice2.style.display = "none";
    });


    //1st Transition Franklin to the player
    franklinNextBtn.addEventListener('click', () => {
        franklinMessage.style.display = 'none';
        choice1.style.display = 'block';
        choice2.style.display = 'block'

    });

    // Show the penguin message when the penguin image is clicked
    window.addEventListener('load', () => {
        penguinPopup.style.display = 'block';
    });

    // Hide the penguin message and show the mickey message when the next button is clicked
    nextPenguinBtn.addEventListener('click', () => {
        penguinPopup.style.display = 'none';
        mickeyMessage.style.display = 'block';
    });

    // Hide the mickey message and show the second penguin message when the next button is clicked
    nextMickeyBtn.addEventListener('click', () => {
        mickeyMessage.style.display = 'none';
        penguinMessage2.style.display = 'block';
    });

    // Show the last mickey message when the mickey image is clicked
    mickeyImage.addEventListener('click', () => {
        lastTalkOfMickey.style.display = 'block';
    });

    // Hide the last mickey message when the close button is clicked
    closeBtnMickey.addEventListener('click', () => {
        lastTalkOfMickey.style.display = 'none';
    });

    // Hide the last mickey message when the next button is clicked
    nextMickeyToPenguin2Btn.addEventListener('click', () => {
        penguinMessage2.style.display = 'none';
    });
    // Hide the last mickey message when the close button is clicked
    closeBtnMickey.addEventListener('click', () => {
        lastTalkOfMickey.style.display = 'none';
    });
    // Hide the last mickey message when the close button is clicked
    closeBtnMickey.addEventListener('click', () => {
        lastTalkOfMickey.style.display = 'none';
    });
});