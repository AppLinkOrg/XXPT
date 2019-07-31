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
  // setPageTitle() {
  //   wx.setNavigationBarTitle({
  //     title: '我的',

  //   });
  // }

  onLoad(options) {

    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
    wx.setNavigationBarTitle({
      title: "我的",
    })

    // var api = new OrderApi();
    // api.goods({ id: that.Base.options.id }, (list) => {
    //   this.Base.setMyData({ list });
    // });
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
Page(body)