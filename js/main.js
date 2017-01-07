(function(){

  var responses = [
    {
      placeholder: 'My name is ...',
      type: 'text',
      messages: [
        'Hi! I\'m James! (well technically I am James\' not-very-clever chatbot) Nice to be able to chat with you. May I know who I am speaking to?',
      ]
    }, {
      placeholder: 'The name of my company is ...',
      type: 'text',
      messages: [
        'Hi ${name}, nice to meet you. If you have read my cover letter, you will know that I\'m looking for opportunities in Web Development.',
        'May I know which company you\'re from?'
      ]
    }, {
      placeholder: 'There are a total of ... employees in our team.',
      type: 'number',
      messages: [
        'How many team members are in your team?'
      ]
    }, {
      placeholder: 'Yes or No?',
      type: 'text',
      messages: [
        'Any vacancy for web developers in ${company}?'
      ]
    }, {
      placeholder: 'Enter your email.',
      type: 'email',
      messages: [
        'Let me share a bit about myself ...',
        '<strong>More than ten years informal ICT self-learning & three years as a professional programmer</strong><br/><br/>'+
          'My ICT knowledge extends from the most basic: <br>to technical support, <br>to networking, <br>to Photoshop designs, <br>to web development,<br>and to Google Analytics/SEO.<br>I\'m also very open to <a href="http://dariusforoux.com/education/" target="_blank">continuous learning</a> and knowledge sharing, this allows me to become the "techical consultant" in the team in my previous company.',
        '<strong>Entrepreneurship & Product Development Experience</strong><br/><br/>'+
          'Developing "Pixors" and marketing it via social media helped me learnt a whole lot about internet marketing and entrepreneurship. The crowdfunding campaign on Indiegogo.com <a href="https://vulcanpost.com/361001/pixors-pixel-art-indiegogo/"  target="_blank">made the news</a>.',
        '<strong>Learning and tinkering as long as I am alive</strong><br/><br/>'+
          'I am always learning about the new technologies and Web Development. Currently learning about topics on using AI, Facebook <a href="http://graphql.org/" target="_blank">GraphQL</a> and Progressive Web Apps. Sometimes I would pick up new skills such as mobile app development just to learn about the underlying technology.',
        '<strong>Solid leadership experience</strong><br/><br/>'+
          'Managed a team of 10 people and reduced maintenance requests to less than 3 a day. I would consistently be in touch with everyone in the team to understand their challenges and strengths. Best coding practices are always the topic of our conversation. Everyone\'s input is important for continuous improvement in the team.',
        'Wow, that\'s a mouthful! I hope I have sparked your interested. I have more to share. Can you please provide your email to continue?'
      ]
    }, {
      placeholder: 'Type yes to know more.',
      type: 'text',
      end: true,
      messages: [
        'Thank you for your email. I\'m glad to hear that you are interested! As I was saying, I strive to make an impact to the industry and ${company}.',
        '<strong>Long Term Employment</strong><br/><br/>Ideally, ${company} will be the place where I fully utilize my vast knowledge in ICT for many years to come. It will also be a platform for me to upgrade myself to a whole new level.',
        'I hope you can give me a shot! You can learn a lot about me via the resume attached in your email. You can also get all my contacts from the icons above.',
        'Type "yes" to learn more.'
      ]
    }, {
      placeholder: '',
      type: 'text',
      messages: [
        'OK, one last sharing! (I swear they will be the last) Here are some stuffs that are keeping me busy.',
        '<strong>Progressive Web Apps (PWA)</strong><br/><br/>'+
          'The web continues to catch up to mobile apps. PWA could be the tipping point for the web to replace native mobile apps <br/>- <a href="https://developers.google.com/web/progressive-web-apps/" target="_blank">Progressive Web Apps</a>',
        '<strong>Hadoop Starter Kit</strong><br/><br/>'+
          'Big Data is the next big thing. I am just starting to learn on this topic. Hopefully having this new skill will be beneficial to ${company}. <br/>- <a href="https://www.udemy.com/hadoopstarterkit/" target="_blank">Hadoop Starter Kit</a>',
        '<strong>360 Viewer For The Modern Web</strong><br/><br/>'+
          'This is the go-to library for 360 viewer for web and highly mobile responsive. Absolutely love this library. <br/>- <a href="http://www.marzipano.net/" target="_blank">Marzipano</a>',
        '<strong>The Artificial Intelligence Revolution</strong><br/><br/>'+
          'Bumped into this topic recently. Mixed feelings on this one, but highly insightful. <br/>- <a href="http://waitbutwhy.com/2015/01/artificial-intelligence-revolution-1.html" target="_blank">AI Revolution</a>',
        'That\'s it ${name}! I hope you enjoyed this conversation! Please get in touch with me using the contact links above.<br><br>(If you want to restart our conversation, just refresh the browser)',
      ]
    }
  ];
  var feedback = [
    {
      placeholder: 'Yes or No?',
      type: 'text',
      messages: [
        'I think you\'re not following the question. Let me repeat again.<br><br>Are you still hiring web developers in your company?',
      ]
    }, {
      placeholder: '',
      type: 'text',
      messages: [
        'Well, I believe there is always room for passionate and experienced developer.<br>You may want to increase your team to ${number} members',
        'Either way, since you\'re here ...'
      ]
    }, {
      placeholder: '',
      type: 'text',
      messages: [
        'Perfect! I knew there\'s always a place for passionate developers!'
      ]
    }
  ]
  var recordedInfo = [];

  // Variables
  // var cookieData = Cookies.get('cv-data');
  var requestJSON = {

  }
  // console.log(cookieData)
  var cpw = 7;
  var wpm = 2000; // 200
  var responseCounter = 0;

  // Elements
  var scrollContainer = document.querySelector('.c-msg-container__scroll');
  var messageContainer = document.querySelector('.c-msg-container__cell');
  var messageTemplate = _.template(document.querySelector('.o-msg__template').innerHTML);
  var textInputEl = document.querySelector('.c-reply__input');
  var submitBtnEl = document.querySelector('.c-reply__btn');
  var form = document.querySelector('#c-form');

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

  // document.addEventListener('scroll', function() {
  //   console.log(messageContainer.scrollHeight);
  // })

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    btnSubmitHandler(textInputEl);
  });

  textInputEl.addEventListener('keyup', inputKeyupHandler);

  document.addEventListener('touchmove', touchmoveHandler, false);

  // Helper Functions

  function touchmoveHandler(e) {
    if (window.pageYOffset == 0) {
      e.preventDefault();
    }
  }
  function prepareResponse(responses, callback) {
    var date = Date.now();
    var timer = 0;

    startTyping(true);
    disableInputs(true);

    if (responses.placeholder) { textInputEl.setAttribute('placeholder', responses.placeholder) };
    if (responses.type) { textInputEl.setAttribute('type', responses.type) };

    responses.messages.forEach(function (response, i) {
      timer = timer + (response.length / cpw / wpm * 60 * 1000);
      var tmplClass = '';
      var tmplName = 'James (Peixi) Wee';
      var tmplMessage = templateHandler(response);
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
        document.querySelector('.c-msg-container__scroll').scrollTop = messageContainer.scrollHeight;

        if (i === responses.messages.length - 1) {
          startTyping(false);
          disableInputs(false);
          console.log(window.matchMedia('(min-width: 768px)').matches);
          if (window.matchMedia('(min-width: 768px)').matches) { textInputEl.focus(); }

          if (typeof callback === 'function') {
            callback();
          }
        }
      }, timer);
    });

    if (responses.end) {
      if (recordedInfo.length > 3) {
        handleXHR(recordedInfo);
      }
    }
  }

  function prepareReply(reply, triggerFlag) {
    var tmplClass = 'o-msg__content--right';
    var tmplName = '';
    var tmplMessage = templateHandler(reply);
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
    document.querySelector('.c-msg-container__scroll').scrollTop = messageContainer.scrollHeight;
    if (triggerFlag != false) {
      document.dispatchEvent(prepareResponseEvent);
    }
  }

  function btnSubmitHandler(inputEl) { // Bind to textInputEl
    var value = inputEl.value;
    var placeholder = inputEl.placeholder;
    var reply = '';

    if (placeholder.indexOf('...') > 0) {
      reply = inputEl.placeholder.replace('...', value);
    } else {
      reply = value;
    }
    inputEl.value = ''; // Reset input

    if (responseCounter === 4) {
      if (value.toLowerCase().indexOf('yes') < 0 && value.toLowerCase().indexOf('no')) {
        prepareReply(reply, false);
        setTimeout(function() {
            prepareResponse(feedback[0])
        }, 250);
      } else if (value.toLowerCase().indexOf('yes') > -1) {
        recordedInfo.push(value);
        prepareReply(reply, false);
        prepareResponse(feedback[2], function() {
          document.dispatchEvent(prepareResponseEvent);
        })
      } else if (value.toLowerCase().indexOf('no') > -1) {
        recordedInfo.push(value);
        prepareReply(reply, false);
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

  function handleXHR(recordedArray) {
    var data = JSON.stringify({
      "cv_name": recordedArray[0],
      "cv_company": recordedArray[1],
      "cv_employees": recordedArray[2],
      "cv_vacancy": recordedArray[3],
      "cv_email": recordedArray[4],
    });
    console.log(data);

    var xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });

    xhr.open("POST", "https://api.backendless.com/v1/data/info");
    xhr.setRequestHeader("application-id", "D1C97B21-A8C9-8C71-FFB4-F84115BA6800");
    xhr.setRequestHeader("secret-key", "5E77DD15-63EF-E97A-FF47-06DB0F75AD00");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("application-type", "REST");
    xhr.send(data);
  }

  function templateHandler(text) {
    if (text.indexOf('$') > 0) {
      var compiled = _.template(text);
      if (recordedInfo.length > 0) {
        text = compiled({
          name: (recordedInfo[0]) ? recordedInfo[0] : '',
          company: (recordedInfo[1]) ? recordedInfo[1] : '',
          number: (recordedInfo[2]) ? parseInt(recordedInfo[2]) + 1 : ''
        });
      }
    }
    return text;
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
