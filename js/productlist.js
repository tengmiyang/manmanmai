/**
 * Created by tmy on 2017/10/8.
 */
'use strict';
$(function(){
    console.log(GetQueryString("categoryid"));
    console.log(window.location.search);
    //window.location.search是获取url参数
    console.log(window.location.href);
    //window.location.href获取的是整个url
    //打印url的参数
    var categoryId=GetQueryString("categoryid");
    var pageid=GetQueryString("pageid");
    getcategory(categoryId);
    getProdcutList(categoryId,pageid);
    function getcategory(categoryId){
        $.ajax({
            url:'http://127.0.0.1:3000/api/getcategorybyid?categoryid='+categoryId,
            success:function(data){
                console.log(data);
                //只有少量的地方需要更改信息可以直接通过html方法来改变。不用使用模板引擎
                //$('#productList > .category-title > ol > li:last-child').html(data.result[0].category);
                var html = template("productlist", data);
                $(".breadcrumb").html(html);
            }
        })

    }
    function getProdcutList(categoryId,pageid){
            $.ajax({
                url:'http://127.0.0.1:3000/api/getproductlist',
                data:{
                    "categoryid": categoryId,
                    "pageid": pageid || 1
                },
                success:function(data){
                    console.log(data);
                    var page=data.totalCount/data.pagesize;
                    console.log(page);
                    var pageli='';
                    for(var i=1;i<=page;i++){
                        var url="productlist.html?categoryid="+categoryId+"&pageid="+i;
                        pageli += "<li><a href=" + url + ">第" + i  + "/" + (page) + "页</a></li>";
                    }
                    if(pageid==null){
                        $('#dLabel').html("第" + 1 + "页" + '<span class="caret"></span>');
                    }
                    else{
                        $('#dLabel').html("第" + pageid + "页" + '<span class="caret"></span>');
                    }

                    //限制首页和尾页
                    if (pageid <= 1) {
                        pageid = 2;
                    } else if (pageid >= page) {
                        pageid = page;
                    }
                    //给上一页和下一页添加a标签的href属性来实现页面的跳转
                    var prevUrl = "productlist.html?categoryid=" + categoryId + "&pageid=" + (pageid-1);
                    var nextUrl = "productlist.html?categoryid=" + categoryId + "&pageid=" + (parseInt(pageid) + 1);
                    //注意pageid要转换成数字格式。+号是字符串拼接，-号时隐士转换成数字
                    $('.pull-left').attr("href", prevUrl);
                    $('.pull-right').attr("href", nextUrl);


                    $(".dropdown-menu").html(pageli);
                    console.log(pageli);
                    var html =template("productlisttmp",data);
                    $(".product-list").html(html);
                }
        })
    }

    //获取url的参数的方法。直接网上找
    function GetQueryString(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        console.log(window.location.search);
        if(r!=null)return  unescape(r[2]);
        return null;
    }
})
