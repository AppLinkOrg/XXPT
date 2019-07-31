 // pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { OrderApi } from "../../apis/order.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  //界面标题
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '分类',

    });
  }

  onLoad(options) {
   
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
  }
  //收藏从高到低
  favcount() {
    var that = this;
    var api = new OrderApi();
    api.list({ cat_id: that.Base.options.id, orderby: "favcount desc" }, (list) => {
      this.Base.setMyData({ list, orderby: "favcount", price: "s", favcount: "Y", viewcount: "N" });
    });

  }
  //收藏从低到高
  // favcountdesc() {
  //   var that = this;
  //   var api = new OrderApi();
  //   api.list({ cat_id: that.Base.options.id,  orderby: "favcount " }, (list) => {
  //     this.Base.setMyData({ list, orderby: "favcount desc", favcount: "N", price: "N", viewcount: "N" });
  //   });

  // }


  //价格从高到低
  mobile() {
    var that = this;
    var api = new OrderApi();
    api.list({ cat_id: that.Base.options.id, orderby: "mobile" }, (list) => {
      this.Base.setMyData({ list, orderby: "mobile", mobile: "Y", viewcount: "N", favcount: "N"});
    });

  }
  //价格从低到高
  pricedesc() {
    var that = this;
    var api = new OrderApi();
    api.list({ cat_id: that.Base.options.id,  orderby: "price desc" }, (list) => {
      this.Base.setMyData({ list, orderby: "price desc", price: "N", viewcount: "N", favcount: "N"});
    });

  }
  //浏览从高到低
  viewcount() {
    var that = this;
    var api = new OrderApi();
    api.list({ cat_id: that.Base.options.id,  orderby: "viewcount desc" }, (list) => {
      this.Base.setMyData({ list, orderby: "viewcount desc", viewcount: "Y", price: "s", favcount: "N"});
    });

  }
  //浏览从低到高
  viewcountdesc() {
    var that = this;
    var api = new OrderApi();
    api.list({ cat_id: that.Base.options.id,  orderby: "viewcount " }, (list) => {
      this.Base.setMyData({ list, orderby: "viewcount", viewcount: "N", price: "s", favcount: "N" });
    });

  }
  //默认浏览
  list() {
    var that = this;
    var api = new OrderApi();
    api.list({ cat_id: that.Base.options.id,  }, (list) => {
      this.Base.setMyData({ list, viewcount: "N", mobile: "s", favcount: "N"});
    });

  }

  onMyShow() {
    var that = this;
    var api = new OrderApi();
    api.list({ cat_id: that.Base.options.id,  }, (list) => {
      this.Base.setMyData({ list, orderby: "" });
    });
    
  }
  //收藏功能
  fav(e) {
    var that = this;
    var api = new OrderApi();
    var faved = [];
    api.memberfav({ product_id: e.currentTarget.id,  }, (ret) => {
      if (ret.return == "") {
        this.Base.toast("取消收藏成功");


      } else {

        this.Base.toast("收藏成功");

      }
      //查询热门推荐
      if (this.Base.getMyData().orderby=="")
      {
        api.list({ cat_id: that.Base.options.id, }, (list) => {
          this.Base.setMyData({ list, orderby: "" });
        });
      }
      else{
      api.list({ cat_id: that.Base.options.id,  orderby: this.Base.getMyData().orderby}, (list) => {
        this.Base.setMyData({ list });
      });}

    });


  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.changetab = content.changetab;
body.fav = content.fav;
body.mobile = content.mobile;
body.pricedesc = content.pricedesc;
body.favcount = content.favcount;
body.favcountdesc = content.favcountdesc;
body.viewcount = content.viewcount;
body.viewcountdesc = content.viewcountdesc;
body.list=content.list;
Page(body)