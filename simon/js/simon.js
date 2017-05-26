var strict = false;

$(document).ready(function() {
    $('#start').click(Sequence.start);
    $('#strict-check').click(function(){
        strict = strict ? false : true;
    })
})

var UI = (function(){
    var greenAudio = document.getElementById('green-audio'),
        redAudio = document.getElementById('red-audio'),
        yellowAudio = document.getElementById('yellow-audio'),
        blueAudio = document.getElementById('blue-audio');

    var stopAudio = function(audio){
        audio.pause();
        audio.currentTime = 0;
    }

    var greenBlink = function(done){
        stopAudio(greenAudio); // stop audio in case it is still playing to allow replay
        greenAudio.play();
        $('.pad-green').toggleClass('green-blink');
        setTimeout(function(){
            $('.pad-green').toggleClass('green-blink');
            setTimeout(function(){
                if (typeof done === "function") {
                    done(); // call next blink function
                }
            }, 100);
        }, 500);
    }
    var redBlink = function(done){
        stopAudio(redAudio);
        redAudio.play();
        $('.pad-red').toggleClass('red-blink');
        setTimeout(function(){
            $('.pad-red').toggleClass('red-blink');
            setTimeout(function(){
                if (typeof done === "function") {
                    done(); // call next blink function
                }
            }, 100);
        }, 500);
    }
    var blueBlink = function(done){
        stopAudio(blueAudio);
        blueAudio.play();
        $('.pad-blue').toggleClass('blue-blink');
        setTimeout(function(){
            $('.pad-blue').toggleClass('blue-blink');
            setTimeout(function(){
                if (typeof done === "function") {
                    done(); // call next blink function
                }
            }, 100);
        }, 500);
    }
    var yellowBlink = function(done){
        stopAudio(yellowAudio);
        yellowAudio.play();
        $('.pad-yellow').toggleClass('yellow-blink');
        setTimeout(function(){
            $('.pad-yellow').toggleClass('yellow-blink');
            setTimeout(function(){
                if (typeof done === "function") {
                    done(); // call next blink function
                }
            }, 100);
        }, 500);
    }
    var discBlink = function(done){
        $('.disc').toggleClass('disc-blink');
        setTimeout(function(){
            $('.disc').toggleClass('disc-blink');
            if (typeof done === "function") { // callback on completion
                done();
            }
        }, 500)
    }
    var winDisplay = function(){
        $('.pad-green').toggleClass('green-blink');
        $('.pad-red').toggleClass('red-blink');
        $('.pad-yellow').toggleClass('yellow-blink');
        $('.pad-blue').toggleClass('blue-blink');
        var count = 0;
        var winInterval = setInterval(function(){
            $('.pad-green').toggleClass('green-blink');
            $('.pad-red').toggleClass('red-blink');
            $('.pad-yellow').toggleClass('yellow-blink');
            $('.pad-blue').toggleClass('blue-blink');
            count++;
            if (count === 9) {
                clearInterval(winInterval);
            }
        }, 500);
    }
    var updateSteps = function(stepCount){
        $('.status-steps').html(stepCount);
    }
    var enablePadClick = function(){
        $('.pad-green').mouseup(function(){
            $(this).toggleClass('green-blink');
            Sequence.checkInput(0);
        }).mousedown(function(){
            stopAudio(greenAudio); // in case it is still playing on next click
            greenAudio.play();
            $(this).toggleClass('green-blink');
        });
        $('.pad-red').mouseup(function(){
            $(this).toggleClass('red-blink');
            Sequence.checkInput(1);
        }).mousedown(function(){
            stopAudio(redAudio);
            redAudio.play();
            $(this).toggleClass('red-blink');
        });
        $('.pad-blue').mouseup(function(){
            $(this).toggleClass('blue-blink');
            Sequence.checkInput(2);
        }).mousedown(function(){
            stopAudio(blueAudio);
            blueAudio.play();
            $(this).toggleClass('blue-blink');
        });
        $('.pad-yellow').mouseup(function(){
            $(this).toggleClass('yellow-blink');
            Sequence.checkInput(3);
        }).mousedown(function(){
            stopAudio(yellowAudio);
            yellowAudio.play();
            $(this).toggleClass('yellow-blink');
        });
    }
    var disablePadClick = function(){
        $('.pad-green').off('mouseup').off('mousedown');
        $('.pad-red').off('mouseup').off('mousedown');
        $('.pad-blue').off('mouseup').off('mousedown');
        $('.pad-yellow').off('mouseup').off('mousedown');
    }
    var queue = {
        q: [],
        add: function(func){
            this.q.push(func);
        },
        run: function(){
            if (this.q.length) { // if q has any functions left
                var that = this; // keep this context for the next
                this.q.shift()(function(){ // call first function in the array with this run function as a callback
                    that.run();
                })
            } else {
                enablePadClick(); // reenable, disable before calling run...
            }
        }
    }
    return {
        greenBlink: greenBlink,
        redBlink: redBlink,
        blueBlink: blueBlink,
        yellowBlink: yellowBlink,
        discBlink: discBlink,
        winDisplay: winDisplay,
        updateSteps: updateSteps,
        enablePadClick: enablePadClick,
        disablePadClick: disablePadClick,
        queue: queue
    }
})();
var Sequence = (function(){
    var steps = 0,
        seq = [],
        inputStep = 0;

    var addStep = function(){
        seq.push(Math.floor(Math.random() * 4));
        steps++;
        UI.updateSteps(steps);
        // console.log(steps + ' ' + seq);
    }
    var reset = function(){
        steps = 0;
        seq = [];
        inputStep = 0;
    }
    var start = function() {
        reset();
        addStep();
        displaySeq();
    }
    var displaySeq = function(){
        seq.forEach(function(el){
            switch (el) {
                case 0:
                UI.queue.add(UI.greenBlink);
                break;
                case 1:
                UI.queue.add(UI.redBlink);
                break;
                case 2:
                UI.queue.add(UI.blueBlink);
                break;
                case 3:
                UI.queue.add(UI.yellowBlink);
                break;
                default:
            }
        })
        UI.queue.run();
    }
    var checkInput = function(input){
        if(input === seq[inputStep]) { // if user input matches the current place in sequence
            inputStep++; // increment to check next input
            if (inputStep === seq.length) { // if that was last in sequence
                if (inputStep === 20) {
                    UI.updateSteps('WIN');
                    UI.winDisplay();
                } else {
                    UI.disablePadClick();
                    inputStep = 0;
                    addStep();
                    setTimeout(function(){
                        displaySeq();
                    }, 1000)
                }
            }
        } else {
            UI.disablePadClick();
            // if strict mode, game over
            if (strict){
                UI.discBlink();
                setTimeout(function(){
                    start();
                }, 1000);
            } else {
                inputStep = 0;
                setTimeout(function(){
                    UI.discBlink(displaySeq);
                },1000);
            }
        }
    }
    return {
        addStep: addStep,
        reset: reset,
        start: start,
        displaySeq: displaySeq,
        checkInput: checkInput
    }
})()
