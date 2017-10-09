/**
 * Created by tmy on 2017/10/8.
 */
'use strict';
$(function(){
    var productid = GetQueryString("productid");
    console.log(productid);
    getProduct(productid);

    function getProduct(productid) {
        $.ajax({
            url: "http://127.0.0.1:3000/api/getproduct",
            data: {
                "productid": productid
            },
            success: function(data) {
                console.log(data);
                var html = template("productInfoTmp", data);
                $('.product-info').html(html);
            }
        })
    }

    function GetQueryString(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        console.log(window.location.search);
        if(r!=null)return  unescape(r[2]);
        return null;
    }
});