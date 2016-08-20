const MessageStore = require('./message_store.js');

let renderFunction = function() {
  let inboxList = document.createElement('ul');
  inboxList.setAttribute('class', 'messages');
  let inbox = this;

  MessageStore.getInboxMessages().forEach(message => {
    let currentMessage = inbox.rmessage(message);
    inboxList.appendChild(currentMessage);
  });

  return inboxList;
};

let renderMessage = function(message) {
  let newLI = document.createElement('li');
  newLI.setAttribute('class', 'message');
  newLI.innerHTML = `<span class="from">${message.from} </span>
                      <span class="subject">${message.subject} </span>
                      <span class="body">${message.body} </span>`
  return newLI;
};

const Inbox = {
  render: renderFunction,
  rmessage: renderMessage
};




module.exports = Inbox;
