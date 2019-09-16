$(function(){

function appendUser(user){
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
              </div>`
  $(".user-search-result").append(html);
}

function appendNoUser(){
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">一致するユーザーが見つかりません</p>
              </div>`
  $(".user-search-result").append(html);
}

function addMemberList(name, id){
  var html = `<div class="chat-group-user clearfix js-chat-member" id="${id}">
                <input name="group[user_ids][]" type="hidden" value="${id}">
                  <p class="chat-group-user__name">
                    ${name}
                  </p>
                    <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">
                      削除
                    </a>
              </div>`
  $(".chat-group-users").append(html);
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
  $(document).on("click", '.user-search-add', function(){
    var name = $(this).attr("data-user-name");
    var id = $(this).attr("data-user-id");
    $(this).parent().remove();
    addMemberList(name, id);
  });
  $(document).on("click", ".user-search-remove", function(){
    $(this).parent().remove();
  });
});