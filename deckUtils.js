let deck = {
    deck_id: "8g7e7aylch15",
    kings: 0,
    priorityIndex: 2,
};

let rules = {
    "A": "Waterfall",
    "2": "Two is choose",
    "3": "Three is me",
    "4": "Four is ladies",
    "5": "THUMBS ON THE TABLE!",
    "6": "Six is dicks",
    "7": "Seven is heaven",
    "8": "Eight is mate",
    "9": "Nine is rhyme",
    "0": "Ten is category",
    "J": "New rule!",
    "Q": "Questions!",
    "K": "Pour some in the cup. Last king drinks!", 
}
const ruleInfo = document.getElementsByClassName('info')[0];

const thecontainer = document.getElementsByClassName('cardcontainer')[0];
let thecard = document.getElementsByClassName('thecard')[0];
let theback = document.getElementsByClassName('theback')[0];

// Initializing should be useless as long as only one deck is needed
// In case multiple sessions are needed that might not be the case but
// it's not important at the moment
const initDeck = () => {
    fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
}

const resuffleDeck = () => {
    fetch(`https://www.deckofcardsapi.com/api/deck/${deck.deck_id}/shuffle/`)
}

const drawCard = () => {
    fetch(`https://www.deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`)
        .then(response => {
            thecard.style.zIndex = deck.priorityIndex++;
            return response.json();
        })
        .then(data => {
            if (data.remaining !== 0) {
                const cardTemplate = thecard.cloneNode(true);
                thecontainer.appendChild(cardTemplate);

                thecard.classList.toggle('flipped-and-slided');

                theback.style.backgroundImage = `url('${data.cards[0].image}')`;


                let cards = document.querySelectorAll('.thecard');
                thecard = cards[cards.length - 1];
                thecard.style.zIndex = 1;

                let backs = document.querySelectorAll('.theback');
                theback = backs[backs.length - 1];

                
                let cardValue = data.cards[0].code[0];
                ruleInfo.textContent = rules[cardValue];
            } else {
                let fronts = document.querySelectorAll('.thefront');
                thefront = fronts[fronts.length - 1];
                thefront.textContent = 'Empty';
            }
        })
}

// Initialize the deck when page is opened or refreshed
resuffleDeck();