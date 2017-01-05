(function(){

  var responses = [
    {
      placeholder: 'The name of my company is ...',
      input: 'text',
      messages: [
        'Hi! Like I was saying earlier, I\'m looking for opportunities in Web Development.',
        'For the sake of this exercise, can you tell me your company name again?'
      ]
    }, {
      placeholder: 'There are a total of ... employees in our team.',
      input: 'number',
      messages: [
        'How many employees are in your team so far?'
      ]
    }, {
      placeholder: 'Yes or No?',
      input: 'text',
      messages: [
        'Any vacancy for web developers in your company?'
      ]
    }, {
      placeholder: '',
      input: 'text',
      messages: [
        'Let me tell you a bit about myself. '
      ]
    }
  ];
  var feedback = [
    {
      placeholder: 'Yes or No?',
      input: 'text',
      messages: [
        'I think you\'re not following the question. Let me repeat again.<br><br>Are you still hiring web developers in your company?',
      ]
    }, {
      placeholder: '',
      input: 'text',
      messages: [
        'I believe there is always room for passionate and experienced developer.<br>Will you consider increasing your team to ... members?',
        'Either way, since you\'re here ..'
      ]
    }, {
      placeholder: '',
      input: 'text',
      messages: [
        'Perfect! I knew there\'s a place for passionate developers!'
      ]
    }
  ]
  var recordedInfo = [];
  console.log(responses);

  // Variables
  var cpw = 7;
  var wpm = 1000; // 200
  var responseCounter = 0;

  // Elements
  var messageContainer = document.querySelector('.c-msg-container__cell');
  var messageTemplate = _.template(document.querySelector('.o-msg__template').innerHTML);
  var textInputEl = document.querySelector('.c-reply__input');
  var submitBtnEl = document.querySelector('.c-reply__btn');

  // Custom Events
  var prepareResponseEvent = document.createEvent('Event');
  prepareResponseEvent.initEvent('PrepareResponse', true, true);

  // Event Listeners
  document.addEventListener('DOMContentLoaded', function () {
    document.dispatchEvent(prepareResponseEvent);
  });

  document.addEventListener('PrepareResponse', function () {
    if (responses[responseCounter] !== undefined) {
      prepareResponse(responses[responseCounter]);
    }
    responseCounter += 1;
  });

  submitBtnEl.addEventListener('click', btnSubmitHandler.bind(textInputEl));

  textInputEl.addEventListener('keyup', inputKeyupHandler);

  // Helper Functions
  function prepareResponse(responses, callback) {
    console.log('played');
    var date = Date.now();
    var timer = 0;

    startTyping(true);
    disableInputs(true);

    textInputEl.placeholder = responses.placeholder;
    responses.messages.forEach(function (response, i) {
      timer = timer + (response.length / cpw / wpm * 60 * 1000);
      var tmplClass = '';
      var tmplName = 'James (Peixi) Wee';
      var tmplMessage = response;
      var calcDate = date + timer;

      tmplTimestamp = new Date(calcDate).toLocaleTimeString([], {
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      });

      var tmplCompiled = messageTemplate({
        className: tmplClass,
        name: tmplName,
        message: tmplMessage,
        timestamp: tmplTimestamp
      });

      setTimeout(function() {
        messageContainer.insertAdjacentHTML('beforeend', tmplCompiled);
        document.querySelector('.c-msg-container').scrollTop = messageContainer.scrollHeight;
        if (i === responses.messages.length - 1) {
          startTyping(false);
          disableInputs(false);
          if (typeof callback === 'function') {
            callback();
          }
        }
      }, timer);
    });


  }

  function prepareReply(reply, triggerFlag) {
    var tmplClass = 'o-msg__content--right';
    var tmplName = '';
    var tmplMessage = reply;
    var tmplTimestamp = new Date().toLocaleTimeString([], {
      hour12: true,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });
    disableInputs(true);
    var tmplCompiled = messageTemplate({
      className: tmplClass,
      name: tmplName,
      message: tmplMessage,
      timestamp: tmplTimestamp
    });
    messageContainer.insertAdjacentHTML('beforeend', tmplCompiled);
    document.querySelector('.c-msg-container').scrollTop = messageContainer.scrollHeight;
    if (triggerFlag != false) {
      document.dispatchEvent(prepareResponseEvent);
    }
  }

  function btnSubmitHandler() { // Bind to textInputEl
    var value = this.value;
    var placeholder = this.placeholder;
    var reply = '';

    if (placeholder.indexOf('...') > 0) {
      reply = this.placeholder.replace('...', value);
    } else {
      reply = value;
    }
    this.value = ''; // Reset input

    if (responseCounter === 3) {
      if (value.toLowerCase().indexOf('yes') < 0 && value.toLowerCase().indexOf('no')) {
        prepareReply(reply, false);
        setTimeout(function() {
            prepareResponse(feedback[0])
        }, 500);
      } else if (value.toLowerCase().indexOf('yes') > -1) {
        recordedInfo.push(value);
        prepareReply(reply, false);
        prepareResponse(feedback[2], function() {
          document.dispatchEvent(prepareResponseEvent);
        })
      } else if (value.toLowerCase().indexOf('no') > -1) {
        recordedInfo.push(value);
        prepareReply(reply, false);
        feedback[1].messages[0] = feedback[1].messages[0].replace('...', parseInt(recordedInfo[1]) + 1);
        prepareResponse(feedback[1], function() {
          document.dispatchEvent(prepareResponseEvent);
        })
      }
    } else {
      recordedInfo.push(value);
      prepareReply(reply);
    }
    console.log(recordedInfo);
  }

  function disableInputs(flag) {
    if (flag === true) {
      textInputEl.disabled = true;
      submitBtnEl.disabled = true;
    } else {
      textInputEl.disabled = false;
    }
  }

  function inputKeyupHandler() {
    if (textInputEl.value.length > 0) {
      submitBtnEl.disabled = false;
    } else {
      submitBtnEl.disabled = true;
    }
  }

  function startTyping(flag) {
    setTimeout(function() {
      var typingEl = document.querySelector('.c-header__typing');
      if (flag === true) {
        typingEl.classList.add('active');
      } else {
        typingEl.classList.remove('active');
      }
    }, 500)
  }

})()
