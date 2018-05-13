const axios = require('axios');
const util = require('util');

function createCard(event_date, type_of_event) {
    const queryPromise = axios({
        url: `https://api.trello.com/1/cards?name=${event_date}%20${type_of_event}&pos=top&idList=5af723b55104462a1ed5b2fb&keepFromSource=all&key=8edf1192fc9d194c2e6521ca4fb779da&token=$0de2e58543dbc092ef17d9746b935f6fde740ce8c964b26f0104cb4a6ffbde43`,
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    return queryPromise;
}

function createList(id) {
    const queryPromise = axios({
        url: `https://api.trello.com/1/checklists?idCard=${id}&name=Details&pos=top&key=8edf1192fc9d194c2e6521ca4fb779da&token=$0de2e58543dbc092ef17d9746b935f6fde740ce8c964b26f0104cb4a6ffbde43`,
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    return queryPromise;
}

function createListItem(id,text,type) {
    const queryPromise = axios({
        url: `https://api.trello.com/1/checklists/${id}/checkItems?name=${text}%20${type}&pos=bottom&key=8edf1192fc9d194c2e6521ca4fb779da&token=$0de2e58543dbc092ef17d9746b935f6fde740ce8c964b26f0104cb4a6ffbde43`,
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    return queryPromise;
}


module.exports = { createCard, createList, createListItem };