
  import animate from "animate.css";

  export default {
    name: 'index',
    data() {
      return {
        // video
        // 赞和评论气泡框
        popupshow: false,
        refreshing: false,
        headerClass: false,
        message: '',
        username: '摆渡人',
        list: [
          {
            "name": "1号选手",
            "userpic": "https://pic3.zhimg.com/v2-d1928d1a4e0d849f7c6c49428d2e0411_r.jpg?source=1940ef5c",
            "content": "今天周四啦",
            "picUrl": ["https://img.zcool.cn/community/017445590a8752a80121455021e118.jpg@1280w_1l_2o_100sh.jpg"],
            "videoUrl": "",
            "time": "1小时前",
            "showComt": '',
            'likes': ['摆渡人'],
            "isLike": true,
            'showPopover': false,
            "punkt": [{
              'pname': "1号选手",
              "conment": "又是一个周四！"
            }],
          },
          {
            "name": "2号选手",
            "userpic": "https://pic3.zhimg.com/v2-d1928d1a4e0d849f7c6c49428d2e0411_r.jpg?source=1940ef5c",
            "content": "每天早上一杯怀姜杏仁臻白饮，开脾健胃，润而不燥，还能提升身体的基础代谢～",
            "picUrl": ["https://img.zcool.cn/community/0195cf55792ace00000059ff8e3f7b.jpg@2o.jpg",
              "https://img.zcool.cn/community/017445590a8752a80121455021e118.jpg@1280w_1l_2o_100sh.jpg"
            ],
            "videoUrl": "",
            "time": "13分钟前",
            "showComt": '',
            'likes': ['2.1选手,', '2.2选手'],
            "isLike": false,
            "punkt": [{
              'pname': "2.3选手",
              "conment": "天空真好看",
            }],
            'showPopover': false
          },
          
          {
            "name": "3号选手",
            "userpic": "https://pic3.zhimg.com/v2-d1928d1a4e0d849f7c6c49428d2e0411_r.jpg?source=1940ef5c",
            "content": "天空很好看呀！",
            "picUrl": ["https://img.zcool.cn/community/0195cf55792ace00000059ff8e3f7b.jpg@2o.jpg",
              "https://img.zcool.cn/community/017445590a8752a80121455021e118.jpg@1280w_1l_2o_100sh.jpg",
              "https://img.zcool.cn/community/01a06a5796ccd20000012e7e50f0db.jpg@1280w_1l_2o_100sh.jpg",
            ],
            "videoUrl": "https://www.sicau.edu.cn/__local/A/1E/52/E8093449CF93AF4E8960C131C04_09BD5DD1_1F12F030.mp4?e=.mp4",
            "time": "1小时前",
            'likes': ['3.1选手,', '3.2选手,', '3.3选手,', '3.4选手,', '摆渡人'],
            "isLike": true,
            'showPopover': false,
            "punkt": [{
                'pname': "11111",
                "conment": "下次不要这样了"
              },
              {
                'pname': "22222",
                "conment": "下次不要这样了"
              },
              {
                'pname': "33333",
                "conment": "谢谢你们"
              }
            ],
            "videoUrl": "https://www.sicau.edu.cn/__local/A/1E/52/E8093449CF93AF4E8960C131C04_09BD5DD1_1F12F030.mp4?e=.mp4"
          }
        ],
        loading: false, //是否处于加载状态
        finished: false, //是否加载完成
        newsList: [],
        total: 0,
        pages: 0,
        pageNum: 1,
        pageSize: 15,
        allname: ['花舞飞飞', '瓶瓶', '发型定制阿丁', '爪哇老师', 'tears', '月是人间客', '清野', '从前有个羊羊羊', '小柠檬'],
        alluserpic: ['https://pic.qqtn.com/up/2018-7/15312903318836927.jpg',
          "https://p.qqan.com/up/2020-9/16000633123836637.jpg",
          "https://pic.qqtn.com/up/2018-4/15239319654651823.jpg",
          "https://p.qqan.com/up/2019-9/15674712456869139.jpg",
          "https://tupian.qqw21.com/article/UploadPic/2020-4/202041422405279300.jpg"
        ],
        allcontent: ['走神回到放风那天', '不抱希望地问一句，朋友圈有抢票高手吗', '八月的风', "𝑵𝑬𝑾  ｜ 早秋新款已全面上新🍂,🛒：“和夏天告别 与秋日相拥", ''],
        allpicurl: ["https://tupian.qqw21.com/article/UploadPic/2020-6/20206102242145383.jpg",
          "https://p.qqan.com/up/2020-12/16068065762056714.jpg",
          "https://pic.qqtn.com/up/2017-11/15115072217014845.jpg",
          "https://pic.qqtn.com/up/2018-5/15263513171586087.jpg",
          "https://tse3-mm.cn.bing.net/th/id/OIP-C.iC51xBokp5uExMcBPWfxwwAAAA?pid=ImgDet&rs=1",
          "https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF",
          "https://t7.baidu.com/it/u=4198287529,2774471735&fm=193&f=GIF",
          "https://t7.baidu.com/it/u=1956604245,3662848045&fm=193&f=GIF",
          "https://t7.baidu.com/it/u=2529476510,3041785782&fm=193&f=GIF"
        ], //picurl合集
        allvideourl: ['', ''], //video合集
        allconment: ['怎么了', "多发点，俺爱看", "高质量朋友圈", '已读不赞', '一个月又过去了', "月末提醒", '加油加油', '太可爱了吧！', "真的好浪漫"],
        alltime: ['1小时前', '23分钟前', '45分钟前', "2023年2月3日"]

      }
    },


    methods: {

      // 随机选取列表中元素
      rand_itemone(item, type) {
        if (type == 1) {
          return item[Math.floor(Math.random() * item.length)]
        } else { //切取超过1的列表
          let n, m, index;
          let itemcooy = JSON.parse(JSON.stringify(item))
          index = new Array(item.length).fill(1).map((v, i) => ++i)
          index.sort(function() {
            return (0.5 - Math.random());
          }); //打乱列表索引
          [n, m] = index.splice(2, 3)
          return itemcooy.splice(n, m)
        }
      },

      //获取加载数据
      getinfo() {
        for (let i = 0; i < this.allname.length; i++) {
          // 随机添加姓allname、alluserpic、allcontent、allpicurl、allvideourl、time(获取当前数据)、allconment
          let userinfo = {};
          userinfo.name = this.rand_itemone(this.allname, 1) //用户名
          userinfo.time = this.rand_itemone(this.alltime, 1) //时间
          userinfo.isLike = false
          userinfo.showPopover = false,
            userinfo.userpic = this.rand_itemone(this.alluserpic, 1) //用户照片
          if (i == 0) {
            userinfo.picUrl = this.allpicurl
          } else {
            userinfo.picUrl = this.rand_itemone(this.allpicurl, 'pic') //单张或多张照片
          }
          //发布内容
          if (i == 4) {
            userinfo.content = ''
          } else {
            userinfo.content = this.rand_itemone(this.allcontent, 1)
          }
          //赞
          userinfo.likes = this.rand_itemone(this.allname, 'likes')
          for (let k = 0; k < userinfo.likes.length - 1; k++) {
            userinfo.likes[k] += ','
          } //处理赞
          userinfo.punkt = []
          //单个或多个评论
          for (let j = 0; j < 3; j++) {
            let punkt_i = {};
            punkt_i.pname = this.rand_itemone(this.allname, 1)
            punkt_i.conment = this.rand_itemone(this.allconment, 1)
            userinfo.punkt.push(punkt_i)
          }
          //视频
          if (userinfo.picUrl > 0) {
            userinfo.videoUrl = ''
          } else {
            userinfo.videoUrl = this.rand_itemone(this.allvideourl, 1)
          }
          // 如果视频照片评论都没有，抽取九张照片和文字
          if (userinfo.content.length == 0 & userinfo.picUrl.length == 0 & userinfo.videoUrl == '') {
            userinfo.content = this.allcontent[2]
            userinfo.picUrl = this.allpicurl.splice(0, 9)
          }
          this.list.push(userinfo);

        }
        console.log('userinfo', this.list)
      },
      // 下拉加载
      onRefresh() {
        this.refreshing = true;
        this.getinfo()
        // 加载状态结束
        this.$toast('刷新成功')
        if (this.list.length >= 10) {
          this.refreshing = false;
        }
      },
      //上拉加载
      onLoad() {
        setTimeout(() => {
          this.getinfo()
          // 加载状态结束
          this.loading = false;
          this.$toast('加载成功')
          // 数据全部加载完成
          if (this.list.length >= 10) {
            this.finished = true;
          }

        }, 500);
      },
      // 弹出气泡框
      showPanel(e) {
        this.list[e.target.id].showPopover = !this.list[e.target.id].showPopover
        console.log('pan', e.target.id)
      },
      //获取父级元素
      getParentName(obj) {
        let node = obj;
        let ofDiv = true;
        while (ofDiv) {
          if (node.parentNode.className.includes("like-box")) { // 条件示例
            node = node.parentNode;
            ofDiv = false;
          } else if (node.className.includes("like-text")) {
            node = null;
            ofDiv = false;
          } else {
            node = node.parentNode;
          }
        }
        return node
      },
      // 点赞的操作
      operaLike(e) {
        let index = parseInt(this.getParentName(e.target).id)
        console.log('inx',index)
        let update_arr = this.list[index]
        if (update_arr.isLike) {
          // 取消点赞
          let userindex = update_arr.likes.indexOf(this.username)
          if(userindex==update_arr.likes.length-1){
            update_arr.likes.splice(userindex,1)
            if(update_arr.likes.length!=0){
              update_arr.likes[update_arr.likes.length-1]=update_arr.likes[update_arr.likes.length-1].split(',')[0]
            }
          }
          else{
             update_arr.likes.splice(userindex,1)
          }
        } else {
          // 点赞
          if (update_arr.likes.length != 0) {
            update_arr.likes.push("," + this.username)
          } else {
            update_arr.likes.push(this.username)
          }
        }
        update_arr.isLike = !update_arr.isLike
        update_arr.showPopover = !update_arr.showPopover
      },
      // 评论 的操作
      operacom(e) {
        // 出现弹窗
        this.popupshow =! this.popupshow
        // 存储id
         let index = parseInt(this.getParentName(e.target).id)

         localStorage.setItem('com',index)
      },
      //弹窗的确认或取消
      chargeBtn(action, done) { //确认or取消
        if (action === 'cancel') { //取消按钮
          done()
        } else if (action === 'confirm') { //确定按钮
          //向后端传值并关闭dialog弹出框
          let index=localStorage.getItem('com')
          let update_arr = this.list[index]
          update_arr.showPopover = !update_arr.showPopover
          this.list[index].punkt.push({
                'pname': this.username,
                "conment": this.message
              })
        };
        this.popupshow=false
        done()
      },

    }

  }

