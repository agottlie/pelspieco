const axios = require('axios');
const util = require('util');

function createCard(event_date, type_of_event) {
    const queryPromise = axios({
        url: `https://api.trello.com/1/cards?name=${event_date}%20${type_of_event}&pos=top&idList=5af723b55104462a1ed5b2fb&keepFromSource=all&key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_TOKEN}`,
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
        url: `https://api.trello.com/1/checklists?idCard=${id}&name=Details&pos=top&key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_TOKEN}`,
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
        url: `https://api.trello.com/1/checklists/${id}/checkItems?name=${text}%20${type}&pos=bottom&key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_TOKEN}`,
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    return queryPromise;
}


module.exports = { createCard, createList, createListItem };