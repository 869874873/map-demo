//index.js
//获取应用实例
let app = getApp();
let wechat = require("../../utils/wechat");
let amap = require("../../utils/amap");
let util = require("../../utils/util");
let markersData = [];
let { mar } = "";
Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    textData: {},
    city: '',
    markerId: 0,
    controls: [
      {
        id: 0,
        position: {
          left: 10,
          top: 450,
          width: 40,
          height: 40
        },
        iconPath: "/images/circle1.png",
        clickable: true
      }
    ]
  },
  onLoad(e) {
    if (JSON.stringify(e) == '{}'){
      amap.getRegeo()
        .then(d => {
          mar = d;
         
          let { name, desc, latitude, longitude } = d[0];
          if (d[0].regeocodeData.addressComponent.city.length == 0) {
            d[0].regeocodeData.addressComponent.city = d[0].regeocodeData.addressComponent.province;
          }
          let { city } = d[0].regeocodeData.addressComponent;
          this.setData({
            city,
            latitude,
            longitude,
            textData: { name, desc }
          })

        })
        .catch(e => {
          console.log(e);
        })
    }else{
      // console.log(e)
      let markers = JSON.parse(e.markers);
      // console.log(markers)
      markers.forEach(item => {
        item.iconPath = "/images/marker.png";
      })
      this.setData({ markers });
      // this.showMarkerInfo(markers[0]);
      // this.changeMarkerColor(0);
      let { name, latitude, longitude } = markers[0];
      let desc = markers[0].address
          // if (d[0].regeocodeData.addressComponent.city.length == 0) {
          //   d[0].regeocodeData.addressComponent.city = d[0].regeocodeData.addressComponent.province;
          // }
          // let { city } = d[0].regeocodeData.addressComponent;
          this.setData({
            // city,
            latitude,
            longitude,
            textData: { name, desc }
          })
    }
    
  },
  bindInput() {

    let { latitude, longitude, city } = this.data;
   
    let url = `/pages/inputtip/inputtip?city=${city}&lonlat=${longitude},${latitude}`;

    wx.navigateTo({ url });
  },
  makertap(e) {
    // console.log(e);
    let { markerId } = e;
    let { markers } = this.data;
    let marker = markers[markerId];
    // console.log(marker);
    this.showMarkerInfo(marker);
    this.changeMarkerColor(markerId);
  },
  showMarkerInfo(data) {
    let { name, address: desc } = data;
    this.setData({
      textData: { name, desc }
    })
  },
  changeMarkerColor(markerId) {
    let { markers } = this.data;
    markers.forEach((item, index) => {
      item.iconPath = "/images/marker.png";
      if (index == markerId) item.iconPath = "/images/marker_checked.png";
    })
    this.setData({ markers, markerId });
  },
  getRoute() {
    // 起点
    let { latitude, longitude, markers, id,  name, desc } = mar[0];
    let { city } = mar[0].regeocodeData.addressComponent;
    if (this.data.markers.length == 0) return;
    // 终点
    let { latitude: latitude2, longitude: longitude2 } = this.data.markers[this.data.markerId];
    let url = `/pages/routes/routes?longitude=${longitude}&latitude=${latitude}&longitude2=${longitude2}&latitude2=${latitude2}&city=${city}&name=${name}&desc=${desc}`;
    wx.navigateTo({ url });
  },
  clickcontrol(e) {
    let { controlId } = e;
    let mpCtx = wx.createMapContext("map");
    mpCtx.moveToLocation();
  },
  mapchange() {
    // console.log("改变视野");
  }
})
