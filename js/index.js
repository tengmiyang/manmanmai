/**
 * Created by ëøÃÔÑï on 2017/9/17.
 */
$(function(){

    getTemplate();
    function getTemplate(){
        $.ajax({
        url:"http://127.0.0.1:3000/api/getindexmenu",
        success:function(data){
            console.log(data);
            var htm=template("menuTmp",data);
            $("#menu").html(htm);
            $('#menu >.row > div:nth-child(8)').on('click', function() {
                $('#menu >.row > div:nth-last-child(-n+4)').toggle(200);
            })
        }
     })
    }
    getRecommenTem();
    function getRecommenTem(){
        $.ajax({
            url:"http://127.0.0.1:3000/api/getmoneyctrl",
            success:function(data){
                var html=template("recommenTem",data);
                $(".recommen-list").html(html);
            }
        })
    }
});