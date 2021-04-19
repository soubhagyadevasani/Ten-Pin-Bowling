const uri = 'api/ScoreBoards';
let scores = [];


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



function updatePlayerdetails(playerturn) {
    const itemId = document.getElementById('td-PlayerName-Player' + playerturn).getAttribute('data-id');
    const item = {
        "playerId": parseInt(itemId, 10),
        "playername": "Player1",
        "FramesData": '{ "frames": [{ "Roll_1": "3", "Roll_2": "4" }, { "Roll_1": "3", "Roll_2": "4" }, { "Roll_1": "7", "Roll_2": "0" }] }',
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

        //let playerid = document.createElement('div');
        //playername.innerHTML = item.playerid;

        //let playername = document.createElement('div');
        //playername.innerHTML = item.playerName;
        //playername.setAttribute("Id", "edit-player" + item.playerId);
        //playername.setAttribute("data-id", item.playerId);

        let frames = JSON.parse(item.framesData).frames;
        if (frames.length > 0) {
            frames.forEach(function (frameitem, i) {
                document.getElementById('frame-' + (i + 1) + '-Player' + item.playerId).innerHTML = frameitem.Roll_1 + " " + frameitem.Roll_2;
            });
        }
       
        document.getElementById('td-PlayerName-Player' + + item.playerId).innerHTML = item.playerName;
        document.getElementById('td-PlayerName-Player' + item.playerId).setAttribute("data-id", item.playerId);
        document.getElementById('td-TotalScore-Player' + item.playerId).innerHTML = item.totalScore;
        //let totalscore = document.createElement('div');
        //totalscore.innerHTML = item.totalScore;

        //let tr = tBody.insertRow();

        //let td1 = tr.insertCell(0);
       
        //let td2 = tr.insertCell(0);
       

        ////let td3 = tr.insertCell(0);
      

        ////let td4 = tr.insertCell(0);
     
        //td2.appendChild(playername);
        //td1.appendChild(frame1);
        //td3.appendChild(frame1);
        //td4.appendChild(playername);

       
    });

    scores = data;
}

