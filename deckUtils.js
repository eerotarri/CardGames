let deck = {
    deck_id: "8g7e7aylch15",
    kings: 0,
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
    "K": "Pour some on the cup.\n Last one drinks!", 
}

const drawn = document.getElementById('drawn-deck');
const ruleInfo = document.getElementById('info');

// Initializing should be useless as long as only one deck is needed
// In case multiple sessions are needed that might not be the case but
// it's not important at the moment
const initDeck = () => {
    console.log("Initialized");

    fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            deck = data;
        })
}

const resuffleDeck = () => {
    console.log("Deck suffled");

    fetch(`https://www.deckofcardsapi.com/api/deck/${deck.deck_id}/shuffle/`)
        .then(response => response.json())
        .then(data => console.log(data))
    
}

const drawCard = () => {
    console.log("Draw a card");

    fetch(`https://www.deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`)
        .then(response => response.json())
        .then(data => {
            if (data.remaining !== 0) {
                drawn.style.backgroundImage = `url('${data.cards[0].image}')`;
                let cardValue = data.cards[0].code[0];
                console.log(cardValue);
                console.log(rules[cardValue]);

                ruleInfo.textContent = rules[cardValue];
                deck.kings += 1;
                console.log(deck.kings);
            }
        })
}

// Initialize the deck when page is opened or refreshed

resuffleDeck();