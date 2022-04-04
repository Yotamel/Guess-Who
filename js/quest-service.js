'use strict'
var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;

const STORAGE_KEY = 'questsDB'

function createQuestsTree() {
  var quests = loadFromStorage(STORAGE_KEY)
  if(!quests){
    gQuestsTree = createQuest('Male?');
    gQuestsTree.yes = createQuest('Gandhi');
    gQuestsTree.no = createQuest('Rita');

  } else{gQuestsTree = quests}
  gCurrQuest = gQuestsTree;
  gPrevQuest = null;
}

function createQuest(txt) {
  return {
    txt: txt,
    yes: null,
    no: null,
  };
}

function isChildless(node) {
  return node.yes === null && node.no === null;
}

function moveToNextQuest(res) {
  // TODO: update the gPrevQuest, gCurrQuest global vars
  gPrevQuest = gCurrQuest
  console.log(res)
  // gCurrQuest = res === 'yes' ? gCurrQuest.yes : gCurrQuest.no
  //improved way
  gCurrQuest = gCurrQuest[res]
  console.log(gCurrQuest)
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
  // TODO: Create and Connect the 2 Quests to the quetsions tree
  // wrongGuess = gCurrQuest.txt //rita? no wrong rita 'beyonce'
  // var newGuess = lastRes === 'yes'? gPrevQuest.yes = createQuest(newQuestTxt) : gPrevQuest.no = createQuest(newQuestTxt)
  // newGuess.yes = createQuest(newGuessTxt)
  // newGuess.no = createQuest(wrongGuess)
  // console.log(newGuess)
  var newQuest = createQuest(newQuestTxt)
  newQuest.yes = createQuest(newGuessTxt)
  newQuest.no = gCurrQuest
  gPrevQuest[lastRes] = newQuest
  gCurrQuest = gQuestsTree
  _saveQuestsToStorage()
}

function getCurrQuest() {
  return gCurrQuest;
}

// function RestartGame() {
//   gPrevQuest = null
// }

function _saveQuestsToStorage() {
  saveToStorage(STORAGE_KEY, gQuestsTree)
}