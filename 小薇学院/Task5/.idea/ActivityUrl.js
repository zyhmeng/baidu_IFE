/**
 * Created by zyh on 2018/2/8.
 */


<%@ LANGUAGE=JavaScript %>
    <%
    Response.Write(function () {
        var result={
            "success":false,
            "info":"",
            "message":"",
            aaData:{"userInfo":[]},
            data:[],
            Accessories:[],
            AccessoriesBy:[]
        };

        var CreateID=Request.Querystring("CreateID");
        //CreateID = "t36906550";
        var LoginID=Request.Querystring("LoginID");
        //LoginID = "s86310779";

        var order=Request.QueryString("OrderId");

        var parts=TSS.JSON.decode(System.RDC.ExcuteSQL(CreateID,false,"select * from T_SERVICE where OrderId='"+order+"' and OrderStatus=4 and (FanCang is null and Addition is null)"));
        var partsBy=TSS.JSON.decode(System.RDC.ExcuteSQL(CreateID,false,"select * from T_SERVICE where OrderId='"+order+"' and OrderStatus=0"));
        var addParts=TSS.JSON.decode(System.RDC.ExcuteSQL(CreateID,false,"select * from T_SERVICE where OrderId='"+order+"' and OrderStatus=41"));
        var sParts=TSS.JSON.decode(System.RDC.ExcuteSQL(CreateID,false,"select * from T_SERVICE where OrderId='"+order+"' and OrderStatus=42"));
        //return TSS.JSON.encode(partsBy)
        var x="";
        var y="";
        var xNameList=[];
        var xNumList=[];
        var yNameList=[];
        var yNumList=[];
        //???????
        for(var i=0;i<addParts[0].Record.length;i++){
            x+=addParts[0].Record[i].Accessories+",";
        }

        var Acc=x.substring(0,x.length-1);
        //?????????????????
        var AccList=Acc.split(",");

        for(var i=0;i<AccList.length/5;i++){
            xNameList.push(AccList[i*5]+AccList[i*5+1]);
            xNumList.push(AccList[i*5+2]);
        }

        //????????
        for(var i=0;i<sParts[0].Record.length;i++){
            y+=sParts[0].Record[i].Accessories+",";
        }
        var Bcc=y.substring(0,y.length-1);
        //??????????????????
        var BccList=Bcc.split(",");

        for(var i=0;i<BccList.length/5;i++){
            yNameList.push(BccList[i*5]+BccList[i*5+1]);
            yNumList.push(BccList[i*5+2]);
        }



        var row={
            "Accessories":parts[0].Record[0].Accessories,

        }
        result.data.push(row);
        //??ordertatus?4?????????????
        if(result.data[0].Accessories==""){
            var acc=[];
        }else{
            var acc=result.data[0].Accessories.split(",");
        }




        //?????????????
        for (var i=0;i<acc.length/5;i++ ){
            for(var j=0;j<xNameList.length;j++){
                if((acc[i*5]+acc[i*5+1])==xNameList[j]){
                    acc[i*5+2]=acc[i*5+2]*1+xNumList[j]*1+"";
                }

            }

        }

        //?????????????
        for (var i=0;i<acc.length/5;i++ ){
            for(var j=0;j<yNameList.length;j++){
                if((acc[i*5]+acc[i*5+1])==yNameList[j]){
                    acc[i*5+2]=acc[i*5+2]*1-yNumList[j]*1+"";
                }
            }
        }

        for(var i=0,len=acc.length;i<len;i+=5){

            result.Accessories.push(acc.slice(i,i+5));

        }
        if(partsBy[0].Record[0].Accessories==""){
            var accBy=[];
        }else{
            var accBy=partsBy[0].Record[0].Accessories.split(",")
        }

        for(var i=0;i<accBy.length;i+=5){
            result.AccessoriesBy.push(accBy.slice(i,i+5));
        }
//				var ac=result.data[0].ss.split(",")
//				for(var i=0,len=ac.length;i<len;i+=5){
//					result.Accessories.push(ac.slice(i,i+5));
//				}
        //	}
        result.success=true;
        return TSS.JSON.encode(result);


    }());
Response.ContentType = "application/json";
%>