$(function(){
    function getCate(){
        $.ajax({
            url:"http://127.0.0.1:3000/api/getcategorytitle",
            success:function(data){
                var html=template("categoryTem",data);
                $("#category > .panel-group").html(html);
                var categoryTitle = $("#category > .panel-group > .panel-default > .panel-heading > h4 > a");
                categoryTitle.on("click",function(e){
                    var titleId = $(this).data("titleid");
                    $.ajax({
                        url:"http://127.0.0.1:3000/api/getcategory?titleid=" + titleId,
                        success: function(data) {
                            var html = template("categoryList", data);
                            var panelBody = $(e.target).parent().parent().parent().find(".panel-collapse").find('.panel-body');
                            panelBody.html(html);
                            var tmy = panelBody.find('.row > div');
                            var count = tmy.length % 3 || 3;
                            panelBody.find(".row > div:nth-last-child(-n+" + count + ")").css("border-bottom", "0");
                        }
                    })
                })
            }
        })
    }
    getCate();
})/**
 * Created by tmy on 2017/9/29.
 */
