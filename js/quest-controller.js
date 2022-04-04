'use strict'

// NOTE: This is a global used only in the controller
var gLastRes = null;
var gModalTimer

$(document).ready(init);
$('.btn-start').click(onStartGuessing);
$('.btn-yes').click({ ans: 'yes' }, onUserResponse);
$('.btn-no').click({ ans: 'no' }, onUserResponse);
$('.btn-add-guess').click(onAddGuess);

function init() {
  console.log('Started...');
  createQuestsTree();
}

function onStartGuessing() {
  // TODO: hide the game-start section
  console.log("guess started")
  $('header img').attr('src','img/layout/ninja-guessing.png')
  $('.game-start').hide('fast')
  renderQuest()


  renderQuest();
  // TODO: show the quest section

}

function renderQuest() {
  // TODO: select the <h2> inside quest and update
  // its text by the currQuest text
  $('.quest h2').text(`Is your character ${getCurrQuest().txt}`)
  $('.quest').show('slow')
}

function onUserResponse(ev, ans) {
  console.log('ev', ev);
  var res = ev.data.ans;
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      displayMsg('Yes, I knew it!');
      $('header img').attr('src','img/layout/ninja-guessed.png')
      onRestartGame()
      // TODO: improve UX

    } else {
      displayMsg('I dont know...teach me!');
      $('header img').attr('src','img/layout/wrong-guess.png')
      // TODO: hide and show new-quest section
      $('.quest').hide('fast')
      onRestartGame()
      $('.new-quest').fadeIn('slow')
      
    }
  } else {
    // TODO: update the lastRes global var
    gLastRes = res
    moveToNextQuest(res);
    renderQuest();
  }
}

function onAddGuess(ev) {
  ev.preventDefault();
  var newGuess = $('#newGuess').val();
  var newQuest = $('#newQuest').val();
  if (!newGuess.length || !newQuest.length) {
    alert("Please Enter Valid Guess")
    return
  }
  addGuess(newQuest, newGuess, gLastRes)

  
  // TODO: Get the inputs' values
  // TODO: Call the service addGuess

  onRestartGame();
}

function onRestartGame() {
  $('.new-quest').hide();
  $('.quest').hide();
  $('.game-start').show();
  $('#newGuess').val('')
  $('#newQuest').val('')
  gLastRes = null;
  // RestartGame()
}

function displayMsg(txt) {
  $('.modal').text(txt)
  $('.modal').show('fast')
  clearTimeout(gModalTimer)
  gModalTimer = setTimeout(() => { $('.modal').hide('fast') }, 3000)
}
