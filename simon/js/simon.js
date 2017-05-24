var strict = false;
$(document).ready(function() {
    $('#start').click(Sequence.start);
    $('#strict-check').click(function(){
        strict = strict ? false : true;
    })
    UI.enablePadClick();
})

var UI = (function(){
    var greenBlink = function(done){
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
    var blueBlink = function(done){
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
    var redBlink = function(done){
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
    var yellowBlink = function(done){
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
    var updateSteps = function(stepCount){
        $('.status-steps').html(stepCount);
    }
    var enablePadClick = function(){
        $('.pad-green').mouseup(function(){
            $(this).toggleClass('green-blink');
            Sequence.checkInput(0);
        }).mousedown(function(){
            $(this).toggleClass('green-blink');
        });
        $('.pad-red').mouseup(function(){
            $(this).toggleClass('red-blink');
            Sequence.checkInput(1);
        }).mousedown(function(){
            $(this).toggleClass('red-blink');
        });
        $('.pad-blue').mouseup(function(){
            $(this).toggleClass('blue-blink');
            Sequence.checkInput(2);
        }).mousedown(function(){
            $(this).toggleClass('blue-blink');
        });
        $('.pad-yellow').mouseup(function(){
            $(this).toggleClass('yellow-blink');
            Sequence.checkInput(3);
        }).mousedown(function(){
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
                UI.disablePadClick();
                inputStep = 0;
                addStep();
                setTimeout(function(){
                    displaySeq();
                },500)
            }
        } else {
            UI.disablePadClick();
            // if strict mode, game over
            if (strict){
                UI.discBlink(start);
            } else {
                inputStep = 0;
                setTimeout(function(){
                    UI.discBlink(displaySeq);
                },500)
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
