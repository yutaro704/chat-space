$(function(){
    function buildHTML(message){
      var gif = message.image == null? "" : `<img class="lower-message__image" src="${message.image}" alt="Img"></img>`
      
      var html = `<div class="chat-main__messages__group">
                    <div class="chat-main__messages__group__upper">
                      <div class="chat-main__messages__group__upper__name">
                        ${message.name}
                      </div>
                      <div class="chat-main__messages__group__upper__date">
                        ${message.date}
                      </div>
                    </div>
                    <div class="chat-main__messages__group__lower">
                      <div class="chat-main__messages__group__lower__text">
                        ${message.content}
                      </div>
                      ${gif}
                    </div>
                  </div>`
    return html

  }
  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.chat-main__messages').append(html);
      $('.chat-main__messages')
      $('.chat-main__messages').animate({scrollTop: $('.chat-main__messages')[0].scrollHeight}, 'fast');
      $('#new_message')[0].reset();
    })
    .fail(function(){
      alert('error');
    })
    .always(function(){
    $(".chat-main__form__new-message__send-btn").removeAttr("disabled");
    });
  });

funciton buildMessageHTML(message){


} 






// 自動更新
  var reloadMessages = function() {
    if(window.location.href.match(/\/groups\/\d+\/\messages/)){
    var last_message_id = $('.chat-main__messages').data("message_id")
      $.ajax({
        url: 'api/messages',
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        message.forEach(message){
          insertHTML = buildMessageHTML(message)
          $('.chat-main__messages').append(insertHTML)
          // スクロールの設定
        }
      })
      .fail(function() {
        alert('自動更新に失敗しました')
      });
    }
  };
});

