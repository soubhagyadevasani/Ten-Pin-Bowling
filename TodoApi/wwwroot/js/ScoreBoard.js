const uri = 'api/ScoreBoards';
let scores = [];
let frames_player1 = [];
let frames_player2 = [];


function getPlayerScore() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

function addPlayerDetails() {
    const addNameTextbox = document.getElementById('add-name');

    const item = {
        "playername": addNameTextbox.value.trim(),
        "FramesData": '{ "frames": [] }',
        "totalscore": 0

    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getPlayerScore();
            addNameTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}



function updatePlayer1details(playerturn) {
    //var obj = {};
    //obj["Roll_1"] = document.getElementById('add-roll-one-player' + playerturn).value;
    //obj["Roll_2"] = document.getElementById('add-roll-two-player' + playerturn).value;
    //frames_player1.push(obj);
    //'{ "frames": [{ "Roll_1": "3", "Roll_2": "4" }, { "Roll_1": "3", "Roll_2": "4" }, { "Roll_1": "7", "Roll_2": "0" }] }'

    const itemId = document.getElementById('td-PlayerName-Player' + playerturn).getAttribute('data-id');
    const playername = document.getElementById('td-PlayerName-Player' + playerturn).innerHTML;
    const item = {
        "playerId": parseInt(itemId, 10),
        "playername": playername,
        "FramesData": '{ "frames": [{ "Roll_1": "10", "Roll_2": "0" }, { "Roll_1": "3", "Roll_2": "4" }, { "Roll_1": "7", "Roll_2": "0" }, { "Roll_1": "1", "Roll_2": "4" }, { "Roll_1": "2", "Roll_2": "2" },{ "Roll_1": "10", "Roll_2": "0" }, { "Roll_1": "3", "Roll_2": "4" }, { "Roll_1": "7", "Roll_2": "0" }, { "Roll_1": "1", "Roll_2": "4" }, { "Roll_1": "2", "Roll_2": "2" }] }',
        "totalscore": 0

    };
    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));

  //  closeInput();

    return false;
}

function updatePlayer2details(playerturn) {
    const itemId = document.getElementById('td-PlayerName-Player' + playerturn).getAttribute('data-id');
    const playername = document.getElementById('td-PlayerName-Player' + playerturn).innerHTML;
    const item = {
        "playerId": parseInt(itemId, 10),
        "playername": playername,
        "FramesData": '{ "frames": [{ "Roll_1": "3", "Roll_2": "7" }, { "Roll_1": "2", "Roll_2": "1" }, { "Roll_1": "5", "Roll_2": "1" }, { "Roll_1": "3", "Roll_2": "4" }, { "Roll_1": "6", "Roll_2": "1" }, { "Roll_1": "10", "Roll_2": "0" }, { "Roll_1": "4", "Roll_2": "2" }, { "Roll_1": "3", "Roll_2": "1" }, { "Roll_1": "6", "Roll_2": "1" }, { "Roll_1": "5", "Roll_2": "1" }] }',
        "totalscore": 0

    };
    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));

    //  closeInput();

    return false;
}

function _displayItems(data) {
    if (data.length == 2) {
        document.getElementById('form-add-player').setAttribute("style", "display:none");
        document.getElementById('form-player1').setAttribute("style", "display:block");
        document.getElementById('form-player2').setAttribute("style", "display:block");
        document.getElementById('tbl-scoreboard').setAttribute("style", "display:block");
      
    }
    const tBody = document.getElementById('players');
    tBody.innerHTML = '';

    const button = document.createElement('button');

    data.forEach(item => {
        let frames = JSON.parse(item.framesData).frames;
        if (frames.length > 0) {
            frames.forEach(function (frameitem, i) {
                document.getElementById('frame-' + (i + 1) + '-Player' + item.playerId).innerHTML = frameitem.Roll_1 + " " + frameitem.Roll_2;
            });
        }
       
        document.getElementById('td-PlayerName-Player' + + item.playerId).innerHTML = item.playerName;
        document.getElementById('td-PlayerName-Player' + item.playerId).setAttribute("data-id", item.playerId);
        document.getElementById('td-TotalScore-Player' + item.playerId).innerHTML = item.totalScore;
    });
   
    const player1count = document.getElementById('td-TotalScore-Player1').innerHTML;
    const player2count = document.getElementById('td-TotalScore-Player2').innerHTML;
    if (player1count > player2count) {
        document.getElementById('dv-declare-winner').innerHTML = "Player1 Won the Game!!";
    }
    else {
        document.getElementById('dv-declare-winner').innerHTML = "Player1 Won the Game!!";
    }
    scores = data;
}

