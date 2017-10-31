
// Project: Feedr
// By: Trung Lac
'use strict';

$(function() {

  // GLOBAL VARIABLES
  // let $main = $('#main');
  let $article = $('.article');
  // let $articleBtn = $('#main div .clearfix');
  let $popUp = $('#popUp');
  let $srcList = $('.container ul li ul li');
  let $searchBtn = $('#search a');
  let $searchInput = $('#search input');
  let proxyServer = 'https://accesscontrolalloworiginall.herokuapp.com/';

  let sources = [
    {
      srcName: 'The Daily WTF',
      apikey: '',
      baseUrl: 'http://thedailywtf.com/api/',
      query: 'articles/recent'
    },
    {
      srcName: 'News API - ESPN',
      apikey: // REMOVED API KEY
      baseUrl: 'https://newsapi.org/v1/articles',
      query: '?source=espn&sortBy=top&apiKey='
    },
    {
      srcName: 'Hacker News',
      apikey: '',
      baseUrl: 'https://hacker-news.firebaseio.com/v0/',
      query: 'topstories.json'
    }
    // {
    //   srcName: 'Event Registery',
    //   apikey: '',
    //   baseUrl: 'https://eventregistry.org/json/',
    //   query: 'minuteStreamArticlescallback=JSON_CALLBACK&callback=JSON_CALLBACK'
    // }
  ];

  ///////////////
  // LOAD APIs //
  ///////////////

  // 0. Load APIs
  function getSrc1Api() {
    // console.log('getSrc1Api()');
    let url = proxyServer + sources[0].baseUrl + sources[0].query;

    fetch(url).then(function(response) {
      if (response.ok) { //if response.ok is truthy
        return response.json();
      } else {
        var myStatusText = response.statusText;
        console.log(myStatusText);
      }
    }).then(function(data) {
      handleResp(data);
    });

    // 1. POPULATE DOM with articles from API source
    function handleResp(articles) {
      $article.each(function(index) {
        var title = articles[index].Title;
        var author = articles[index].Author.Name;
        var description = articles[index].Author.ShortDescription;
        var url = articles[index].Url;
        var imgUrl = articles[index].Author.ImageUrl;
        var impressions = articles[index].CachedCommentCount;

        $(this).find('.articleContent h3').html(title);
        $(this).find('.articleContent h6').html(author);
        $(this).find('.featuredImage img ').attr('src', imgUrl);
        $(this).find('.impressions').html(impressions);

        $(this).on('click', function(evt) {
          evt.preventDefault();
          // console.log('article clicked');
          showPopUp(title, description, url);
        });
      });
    };
  };

  function getSrc2Api() {
    // console.log('getSrc2Api()');
    var url = proxyServer + sources[1].baseUrl + sources[1].query + sources[1].apikey;

    fetch(url).then(function(response) {
      if (response.ok) { //if response.ok is truthy
        return response.json();
      } else {
        var myStatusText = response.statusText;
        console.log(myStatusText);
      }
    }).then(function(data) {
      handleResp(data);
    });

    // 1. POPULATE DOM with articles from API source
    function handleResp(news) {
      console.log(news);
      $article.each(function(index) {
        var title = news.articles[index].title;
        var author = news.articles[index].name;
        var description = news.articles[index].description;
        var url = news.articles[index].url;
        var imgUrl = news.articles[index].urlToImage;
        var impressions = 0;
        // var impressions = articles[index].CachedCommentCount;

        $(this).find('.articleContent h3').html(title);
        $(this).find('.articleContent h6').html(author);
        $(this).find('.featuredImage img ').attr('src', imgUrl);
        $(this).find('.impressions').html(impressions);

        $(this).on('click', function(evt) {
          evt.preventDefault();
          // console.log('article clicked');
          showPopUp(title, description, url);
        });
      });
    }
  }

  function getSrc3Api() {
    // console.log('getSrc3Api()');
    var url = proxyServer + sources[2].baseUrl + sources[2].query;
    fetch(url).then(function(response) {
      if (response.ok) { //if response.ok is truthy
        return response.json();
      } else {
        var myStatusText = response.statusText;
        console.log(myStatusText);
      }
    }).then(function(data) {
      handleResp(data);
    });

    function handleResp(news) {
      let articleArray = [];
      // articleArray.length = 4;


      function getStory(i) {
        // let articleArray = [];

          let url = proxyServer + sources[2].baseUrl + 'item/' + news[i] + '.json';
          return $.getJSON(url, function(data) {
            // console.log(i);
            // console.log(data);
            articleArray.push(data);
          });

      }

      for(let i = 0; i < 4; i++) {
        getStory(i).done(function() {
          // finalArray = articleArray;
          // console.log(finalArray);
        // console.log(articleArray);
        });
      }

      /*
      for(let i = 0; i < 4; i++) {
        // var title, author, description, url, impressions;
        var apiUrl = proxyServer + sources[2].baseUrl + 'item/' + news[i] + '.json';
        fetch(apiUrl).then(function(response) {
          if (response.ok) {
            return response.json();
          } else {
            var myStatusText = response.statusText;
            console.log(myStatusText);
          }
        }).then(function(data) {
          articleArray.push(data);
        });
      }


      function makeStoryObj(story) {
        // console.log(story);
        obj.addElem(story);
        articleArray.push(story);
        // array.push({e:5});
        // articleArray.pop()

        // articleArray.push([story.title, story.by,'Sorry, there is no summary for this article', story.url, story.score]);

        // console.log(articleArray.length);

      }
      */

      // array.push({d:4});
      // console.log(articleArray);
      // console.log(obj.length);
      // console.log(array);
      // console.log(array.length);
      // console.log(articleArray.length);
      // console.log(articleArray[1][3]);
      /*
      $article.each(function(index) {
        // console.log('global: ' + count);
        // console.log(title);
        $(this).find('.articleContent h3').html(articleArray[index].title);
        $(this).find('.articleContent h6').html(articleArray[index].author);
        // $(this).find('.featuredImage img ').attr('src', imgUrl);
        $(this).find('.impressions').html(articleArray[index].impressions);

        $(this).on('click', function(evt) {
          evt.preventDefault();
          // console.log('article clicked');
          showPopUp(articleArray[index].title, articleArray[index].description, articleArray[index].url);
        });
      });
      */

    }
  }

  function loadNewSource(srcIndex) {
    switch(srcIndex) {
      case 0:
        getSrc1Api();
        // console.log(sources[srcIndex].srcName + ' selected');
        break;
      case 1:
        getSrc2Api();
        // console.log(sources[srcIndex].srcName + ' selected');
        break;
      case 2:
        getSrc3Api();
        // console.log(sources[srcIndex].srcName + ' selected');
        break;
      default:
        console.log('Nothing selected');
    }
  };

  // 2. Add new APIs to the News Source dropdown menu
  (function init(src) {
    // LOAD default API
    getSrc1Api();
    // LOAD the Dropdown Menu
    $srcList.each(function(index) {
      $(this).find('a').html(src[index].srcName);
      $(this).on('click', function(evt) {
        loadNewSource(index);
      });
      // $(this).find('a').attr('href', src[index].url);
    });
  })(sources);
  // 3. Load new articles when user selects new API news Source


  //////////////////////////////
  // ADDING DOM FUNCTIONALITY //
  //////////////////////////////

  // 1. DISPLAY popup window when user selects an article
  function showPopUp(title, description, url) {
    var $closePopUpBtn = $('.closePopUp');

    // UNHIDE popUp
    $popUp.removeClass('hidden');

    // ADD close button functionality
    $closePopUpBtn.on('click', function() {
      $popUp.addClass('hidden');
    });
    $popUp.removeClass('loader');

    // POPULATE popUp information
    $popUp.find('.container h1').html(title);
    $popUp.find('.container p').html(description);
    $popUp.find('.container a').attr('href', url);
    // RETRIVE article info here from API, if SUCCESSFUL load info
    // showArticleInfo();
  };

  // DISPLAY article info from API
  function showArticleInfo() {
    // var url = "http://google.com"

    // Hide loader class once info has been retrived
    $popUp.removeClass('loader');

    // ADD url to Read More button
    $popUp.find('.popUpAction').attr('href', url);

    // $popUp.find('h1').html('Test H1');
    // $popUp.find('p').html('Test P')
  }

  // 3. ADD Search functionality
  $searchBtn.on('click', function() {
    console.log('I clicked the Search button');
    $(this).parent().toggleClass('active').find('input').change(function(evt) {
      // evt.preventDefault();
      var searchValue = $(this).parent().find('input').val();
      console.log(searchValue);
      if (searchValue) {
        $article.find('h3:not(:contains(' + searchValue + '))').parentsUntil("#main").slideUp();
        $article.find('h3:contains(' + searchValue + ')').parentsUntil("#main").slideDown();
      }
      else {
        // SHOW everything is searchValue has no value
      }
    }).keyup(function() {
      // CALL the above change event after every letter typed
      // console.log('finish typing');
      $(this).parent().find('input').change();
    });
  });

});
