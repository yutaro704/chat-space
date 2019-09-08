$(function(){

function appendUser(user){
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="test">追加</a>
              </div>`
  $(".user-search-result").append(html);
}

function appendNoUser(){
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">一致するユーザーが見つかりません</p>
              </div>`
  $(".user-search-result").append(html);
}

  $("#group_member").on("keyup", function(){
    var input = $("#group_member").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data:  { keyword: input },
      dataType: 'json'
    })
    .done(function(users){
      $(".user-search-result").empty();
      if (users.length !== 0){
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else{
        appendNoUser();
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました')
    })
  });
});