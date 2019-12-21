

$(function(){
  console.debug("document ready");
  $('#showPicker').on('click', function () {
    console.debug("showPicker clicked");
    weui.picker([{
        label: '个人报修',
        value: 0
    }, {
        label: '企业办公电脑',
        value: 1
    }, {
        label: '企业网络故障',
        value: 2
    },{
        label: '企业服务器、存储',
        value: 3
    }, {
        label: '其他',
        value: 4
    }], {
        onChange: function (result) {
            console.log(result);
        },
        onConfirm: function (result) {
          $("#message_title").val( result[0].label)
          console.log(result);
        },
        defaultValue: [0],
        title: '服务类型选择'
    });
  })

  $('#submitBtn').on('click', function(){
    weui.form.validate('#new_message_form', function (error) {
        if (!error) {
            var loading = weui.loading('提交中...');
            var jsonArray = $("#new_message_form").serializeArray();
            var jsonData = {}
            jsonArray.forEach(function(kv){
              jsonData[kv.name] = kv.value
            })
            console.debug("jsonData",jsonArray, jsonData);
            $.ajax({
              type: 'POST',
              url: XiaoBang.routes.createMssageUrl,
              contentType: "application/json", //必须这样写
              dataType:"json",
              data:JSON.stringify(jsonData),//schoolList是你要提交是json字符串
              success:function (data) {
                loading.hide();
                weui.toast('提交成功', 3000);
                document.getElementById("new_message_form").reset();
              },
              error: function(error){
                loading.hide();
                weui.toast('服务器繁忙，提交失败！', 3000);
              }
            })
        }
        // return true; // 当return true时，不会显示错误
    }, {

    });
  })

  $('#new_message_form textarea[name=desc]').on('change', function(){
    $('#new_message_form span[name=length]').html( $('#new_message_form textarea[name=desc]').val().length)
  })
})
