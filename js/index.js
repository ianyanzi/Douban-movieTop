var top250 = {
  init: function(){
    this.$element = $('#top');
    this.isLoading = false;
    this.index = 0;
    this.isFinish = false;
    
    this.bind();
    this.start();
  },
  bind: function(){
    var _this = this;
    this.$element.scroll(function(){
        _this.start();
    })
  },
  start: function(){
    var _this = this;
    this.getData(function(data){
      _this.render(data);
    });
  },
  getData: function(callback){
    var _this = this;
    if(_this.isLoading) return;
    _this.isLoading = true;
    _this.$element.find('.loading').show();
    $.ajax({
      url:'http://api.douban.com/v2/movie/top250',
      data:{
        start:_this.index||0
      },
      dataType:'jsonp'
    }).done(function(ret){
      console.log(ret);
      _this.index += 15;
      if(_this.index >= ret.total){
        _this.isFinish = true;
      }
      callback&&callback(ret);
    }).fail(function(){
      console.log('获取数据失败');
    }).always(function(){
      _this.isLoading = false;
      _this.$element.find('.loading').hide();
    });
  },
  render: function(data){
    var _this = this;
    data.subjects.forEach(function(movie){
    var tpl = `<div class="item">
        <a href="">
          <div class="cover">
            <img src="http://img7.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt="">
          </div>
          <div class="details">
            <h2>肖申克的救赎</h2>
            <div class="extra"><span class="year">1994</span> / <span class="type">犯罪、 剧情</span></div>
            <div class="extra">导演：<span class="director">弗兰克·德拉邦特</span></div>
            <div class="extra">主演：<span class="actors">蒂姆·罗宾斯、 摩根·佛里曼、 鲍勃·刚顺</span></div>
          </div>
        </a>
      </div>`
    var $node = $(tpl)
    $node.find('.cover img').attr('src', movie.images.medium)
    $node.find('.details h2').text(movie.title)
    $node.find('.details > .extra .year').text(movie.year)
    $node.find('.details > .extra .type').text(movie.genres.join('/'))
    $node.find('.director').text(function(){
      var DirectorArr = []
      movie.directors.forEach(function(elem){
        DirectorArr.push(elem.name)
      })
      return DirectorArr.join('、')
    })
    $node.find('.actors').text(function(){
      var CastsArr = []
      movie.casts.forEach(function(elem){
        CastsArr.push(elem.name)
      })
      return CastsArr.join('、')
    })
    _this.$element.find('.container').append($node)
  })
  },
//   isToBottom: function(){
//     return this.$element.find('.container') <= this.$element.height() + this.$element.scrollTop() + 10
//   }
}



var usBox = {
  init: function(){
    this.$element = $('#usTop');
    
    this.start()
  },
  start: function(){
    var _this = this;
    this.getData(function(data){
      _this.render(data);
    });
  },
  getData: function(callback){
    var _this = this;
    _this.$element.find('.loading').show();
    $.ajax({
      url:'http://api.douban.com/v2/movie/us_box',
      dataType:'jsonp'
    }).done(function(ret){
      callback&&callback(ret);
    }).fail(function(){
      console.log('获取数据失败');
    }).always(function(){
      _this.$element.find('.loading').hide();
    });
  },
  render: function(data){
    var _this = this;
    data.subjects.forEach(function(movie){
      movie = movie.subject;
    var tpl = `<div class="item">
        <a href="">
          <div class="cover">
            <img src="http://img7.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt="">
          </div>
          <div class="details">
            <h2>肖申克的救赎</h2>
            <div class="extra"><span class="year">1994</span> / <span class="type">犯罪、 剧情</span></div>
            <div class="extra">导演：<span class="director">弗兰克·德拉邦特</span></div>
            <div class="extra">主演：<span class="actors">蒂姆·罗宾斯、 摩根·佛里曼、 鲍勃·刚顺</span></div>
          </div>
        </a>
      </div>`
    var $node = $(tpl)
    $node.find('.cover img').attr('src', movie.images.medium)
    $node.find('.details h2').text(movie.title)
    $node.find('.details > .extra .year').text(movie.year)
    $node.find('.details > .extra .type').text(movie.genres.join('/'))
    $node.find('.director').text(function(){
      var DirectorArr = []
      movie.directors.forEach(function(elem){
        DirectorArr.push(elem.name)
      })
      return DirectorArr.join('、')
    })
    $node.find('.actors').text(function(){
      var CastsArr = []
      movie.casts.forEach(function(elem){
        CastsArr.push(elem.name)
      })
      return CastsArr.join('、')
    })
    _this.$element.find('.container').append($node)
    })
  }
}



var search = {
  init: function(){
    this.$element = $('#search');
    this.keyword = '';
    
    this.bind()
    this.start()
  },
  start:function(){
    var _this = this;
    this.getData(function(data){
      _this.render(data);
    });
  },
  bind: function(){
    var _this = this;
    this.$element.find('.button').click(function(){
      _this.keyword = _this.$element.find('input').val()
      _this.start()
    })
  },
    getData: function(callback){
    var _this = this;
    _this.$element.find('.loading').show();
    $.ajax({
      url:'http://api.douban.com/v2/movie/search',
      data:{
        q:_this.keyword
      },
      dataType:'jsonp'
    }).done(function(ret){
      callback&&callback(ret);
    }).fail(function(){
      console.log('获取数据失败');
    }).always(function(){
      _this.$element.find('.loading').hide();
    });
  },
  render: function(data){
    var _this = this;
    data.subjects.forEach(function(movie){
    var tpl = `<div class="item">
        <a href="">
          <div class="cover">
            <img src="http://img7.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt="">
          </div>
          <div class="details">
            <h2>肖申克的救赎</h2>
            <div class="extra"><span class="year">1994</span> / <span class="type">犯罪、 剧情</span></div>
            <div class="extra">导演：<span class="director">弗兰克·德拉邦特</span></div>
            <div class="extra">主演：<span class="actors">蒂姆·罗宾斯、 摩根·佛里曼、 鲍勃·刚顺</span></div>
          </div>
        </a>
      </div>`
    var $node = $(tpl)
    $node.find('.cover img').attr('src', movie.images.medium)
    $node.find('.details h2').text(movie.title)
    $node.find('.details > .extra .year').text(movie.year)
    $node.find('.details > .extra .type').text(movie.genres.join('/'))
    $node.find('.director').text(function(){
      var DirectorArr = []
      movie.directors.forEach(function(elem){
        DirectorArr.push(elem.name)
      })
      return DirectorArr.join('、')
    })
    $node.find('.actors').text(function(){
      var CastsArr = []
      movie.casts.forEach(function(elem){
        CastsArr.push(elem.name)
      })
      return CastsArr.join('、')
    })
    _this.$element.find('.container').append($node)
    })
  }
}


var app = {
  init: function(){
    this.$tabs = $('footer>div')
    this.$panels = $('section')
    this.bind()
    
    top250.init()
    usBox.init()
    search.init()
  },
  bind: function(){
    var _this = this
    this.$tabs.on('click',function(){
      $(this).addClass('active').siblings().removeClass('active')
      _this.$panels.eq($(this).index()).fadeIn().siblings().hide()
    })
  }
}

app.init()