<template>
	<view class="warp">
		<view class="example-body">
			<uni-grid :column="3" :show-border="false" :square="false" @change="change">
				<uni-grid-item v-if="index < 6" v-for="(item,index) in list" :index="index" :key="index">
					<view v-if="index==1" class="grid-item-box">
						<image class="image" :src="item.url" mode="aspectFill" />
						<text class="text">{{item.text}}</text>
						<view v-if="item.badge" class="grid-dot">
							<uni-badge :text="item.badge" :type="item.type" />
						</view>
						
						<text v-if="currentPressureType<=1" class="pressureText"> {{ currentPressure }} </text>
						<text v-else class="pressureOverflowText">{{ currentPressure }}</text>
						
					</view>
					<view v-if="index!=1" class="grid-item-box">
						<image class="image" :src="item.url" mode="aspectFill" />
						<text class="text">{{item.text}}</text>
						<view v-if="item.badge" class="grid-dot">
							<uni-badge :text="item.badge" :type="item.type" />
						</view>
					</view>
				</uni-grid-item>
			</uni-grid>
		</view>
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in listData" :key="key"
				@click="goDetail(value)">
				<view class="uni-media-list" v-if="key<4&&value.title">
					<!-- <image class="uni-media-list-logo" :src="value.cover"></image> -->
					<u-parse class="uni-media-list-logo" :content="value.cover" />
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{value.title}}</view>
						<view class="uni-media-list-text-bottom">
							<text>{{value.author_name}}</text>
							<text>{{value.published_at}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'
	import neilModal from '@/components/neil-modal/neil-modal.vue';
	import LbPicker from '@/components/lb-picker';
	import cmdNavBar from "@/components/cmd-nav-bar/cmd-nav-bar.vue"
	import cmdPageBody from "@/components/cmd-page-body/cmd-page-body.vue"
	import cmdTransition from "@/components/cmd-transition/cmd-transition.vue"
	import cmdCelItem from "@/components/cmd-cell-item/cmd-cell-item.vue"
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniGrid from '@/components/uni-grid/uni-grid.vue'
	import uniGridItem from '@/components/uni-grid-item/uni-grid-item.vue'
	import uniBadge from '@/components/uni-badge/uni-badge.vue'
	import wInput from '../../components/watch-login/watch-input.vue' //input
	var dateUtils = require('../../common/util.js').dateUtils;
	export default {
		components: {
			uniSection,
			uniGrid,
			uniGridItem,
			uniBadge,
			cmdNavBar,
			cmdPageBody,
			cmdTransition,
			cmdCelItem,
			neilModal,
			LbPicker,
			uParse
		},
		data() {
			return {
				showModal1: false,
				userInfo: {},
				list: [{
						url: '/static/img/home/date.png',
						text: '眼压数据'
					},
					{
						url: '/static/img/home/pen.png',
						text: '记录眼压'
					},
					{
						url: '/static/img/home/eye.png',
						text: '就诊提醒'
					},
					{
						url: '/static/img/home/1.png',
						text: '药物依从性量表'
					},
					{
						url: '/static/img/home/2.png',
						text: '感知压力量表'
					},
					{
						url: '/static/img/home/clock.png',
						text: '用药提醒'
					}
				],
				banner: {},
				listData: [{
						cover: '',
						title: '',
						author_name: '',
						published_at: ''
					},
					{
						cover: '',
						title: '',
						author_name: '',
						published_at: ''
					},
					{
						cover: '',
						title: '',
						author_name: '',
						published_at: ''
					},
					{
						cover: '',
						title: '',
						author_name: '',
						published_at: ''
					}
				],
				last_id: "",
				reload: false,
				currentPressureType: 0,
				currentPressure:"",
			}
		},
		onLoad() {
			// this.getBanner();
			// this.getList();
			this.loadData();
		},
		onShow() {
			this.getUserInfo()
		},
		onPullDownRefresh() {
			this.reload = true;
			this.last_id = "";
			this.getBanner();
			this.getList();
		},
		onReachBottom() {
			this.getList();
		},
		methods: {
			loadData() {
				this.userInfo = this.$queue.getData('UserInfo')
				this.currentPressure=this.getCurrentPressure()
				this.$Request.get('/system/notice/list').then(
					res => {
						if (res.code == 200) {
							console.log(res)
							for (let i = 0; i < res.total; i++) {
								if (i >= 4) {
									return
								}
								if (res.total < 4) {
									this.listData[i].cover = res.rows[i].picture
									this.listData[i].title = res.rows[i].noticeTitle
									this.listData[i].author_name = res.rows[i].auther
									this.listData[i].published_at = res.rows[i].releasetime
									this.listData[i].content = res.rows[i].noticeContent
									console.log(this.listData[i].content)
								} else {
									this.listData[i].cover = res.rows[res.total - 4 + i].picture
									this.listData[i].title = res.rows[res.total - 4 + i].noticeTitle
									this.listData[i].author_name = res.rows[res.total - 4 + i].auther
									this.listData[i].published_at = res.rows[res.total - 4 + i].releasetime
									this.listData[i].content = res.rows[res.total - 4 + i].noticeContent
								}

							}
							
							
						}

					})
			},
			change(e) {
				let {
					index
				} = e.detail
				this.list[index].badge && this.list[index].badge++
				if (index == 0) {
					uni.navigateTo({
						url: '../Intraocular-pressure/Intraocular-pressure'
					})
				} else if (index == 1) {
					uni.reLaunch({
						url: '../record/record'
					})
				} else if (index == 2) {
					uni.navigateTo({
						url: '../visit-reminder/visit-reminder'
					})
				} else if (index == 3) {
					uni.navigateTo({
						url: '../questionnaire1/questionnaire1'
					})
				} else if (index == 4) {
					uni.navigateTo({
						url: '../questionnaire2/questionnaire2'
					})
				} else if (index == 5) {
					uni.navigateTo({
						url: '../medication-reminder/medication-reminder'
					})
				}
				uni.showToast({
					title: `点击第${index+1}个宫格`,
					icon: 'none'
				})
			},
			add() {
				if (this.dynamicList.length < 9) {
					this.dynamicList.push({
						url: `/static/c${this.dynamicList.length+1}.png`,
						text: `Grid ${this.dynamicList.length+1}`,
						color: this.dynamicList.length % 2 === 0 ? '#f5f5f5' : "#fff"
					})
				} else {
					uni.showToast({
						title: '最多添加9个',
						icon: 'none'
					});
				}
			},
			del() {
				this.dynamicList.splice(this.dynamicList.length - 1, 1)
			},
			getBanner() {
				let data = {
					column: "id,post_id,title,author_name,cover,published_at" //需要的字段名
				};
				uni.request({
					url: 'https://unidemo.dcloud.net.cn/api/banner/36kr',
					data: data,
					success: (data) => {
						uni.stopPullDownRefresh();
						if (data.statusCode == 200) {
							this.banner = data.data;
						}
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
					}
				})
			},
			getList() {
				var data = {
					column: "id,post_id,title,author_name,cover,published_at" //需要的字段名
				};
				if (this.last_id) { //说明已有数据，目前处于上拉加载
					data.minId = this.last_id;
					data.time = new Date().getTime() + "";
					data.pageSize = 10;
				}
				uni.request({
					url: 'https://unidemo.dcloud.net.cn/api/news',
					data: data,
					success: (data) => {
						if (data.statusCode == 200) {
							let list = this.setTime(data.data);
							this.listData = this.reload ? list : this.listData.concat(list);
							this.last_id = list[list.length - 1].id;
							this.reload = false;
						}
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
					}
				})
			},
			goDetail: function(e) {
				// 				if (!/前|刚刚/.test(e.published_at)) {
				// 					e.published_at = dateUtils.format(e.published_at);
				// 				}
				let detail = {
					author_name: e.author_name,
					cover: e.cover,
					id: e.id,
					post_id: e.post_id,
					published_at: e.published_at,
					title: e.title,
					content: e.content
				}
				uni.navigateTo({
					url: "../list2detail-detail/list2detail-detail?detailDate=" + encodeURIComponent(JSON
						.stringify(
							detail))
				})
			},
			setTime: function(items) {
				var newItems = [];
				items.forEach((e) => {
					newItems.push({
						author_name: e.author_name,
						cover: e.cover,
						id: e.id,
						post_id: e.post_id,
						published_at: dateUtils.format(e.published_at),
						title: e.title
					});
				});
				return newItems;
			},
			changeEye(e) {
				this[e] = true
			},
			closeModal() {
				this.showModal1 = false
				this.showModal2 = false
			},
			cancelModal(e) {
				if (e == 'showModal1') {
					this.visionLeft = ''
					this.visionRight = ''
				} else if (e == 'showModal2') {
					this.pressureLeft = ''
					this.pressureRight = ''
				}
			},
			confirmModal(e) {

			},

			handleTap(name) {
				this.$refs[name].show()
			},
			handleChange(e) {
				console.log('change::', e)
			},
			handleConfirm(e) {
				console.log('confirm::', e)

			},
			handleCancel(e) {
				console.log('cancel::', e)
			},
			getUserInfo() {
				this.$Request.get('/getInfo').then(f => {
					if (f.code == 200) {
						console.log(f)
						let userInfo = {}
						userInfo.userId = f.user.userId
						userInfo.userName = f.user.userName
						this.$Request.get("/system/record/getInfoById/" + userInfo.userId).then(res => {
							if (res.code == 200) {
								if (res.data.length!=0) {
									console.log(res)
									userInfo.pressureLeft = res.data[res.data.length - 1].pressureLeft
									userInfo.pressureRight = res.data[res.data.length - 1].pressureRight
								}else{
									userInfo.pressureLeft = ''
									userInfo.pressureRight = ''
								}
								this.$queue.setData("UserInfo", userInfo)
								this.loadData()
								
							}
			
						})
					}
				})
			},
			getCurrentPressure()
			{
				var pressureText=""
				this.currentPressureType=0
				if (this.userInfo)
				{
					if(this.userInfo.pressureLeft)
					{
						if (this.userInfo.pressureLeft<10||this.userInfo.pressureRight<10)
						{
							this.currentPressureType=2
						}
						else if(this.userInfo.pressureLeft>21||this.userInfo.pressureRight>21)
						{
							this.currentPressureType=3
						}
						else
						{
							this.currentPressureType=1
						}
					}
				}
				
				if(this.currentPressureType==0)
				{
					pressureText="正常眼压值：10~21mmHg"
				}
				else if(this.currentPressureType==2)
				{
					pressureText='左眼:'+ this.userInfo.pressureLeft+'右眼'+this.userInfo.pressureRight+'\n低眼压'
				}
				else if(this.currentPressureType==3)
				{
					pressureText='左眼:'+this.userInfo.pressureLeft+'右眼'+this.userInfo.pressureRight+'\n高眼压'
				}
				else
				{
					pressureText='左眼:'+ this.userInfo.pressureLeft+'右眼'+this.userInfo.pressureRight+'\n正常眼压'
				}
				
				return pressureText
			},
		}
	}
</script>

<style>
	/* 头条小程序组件内不能引入字体 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		font-weight: normal;
		font-style: normal;
		src: url('~@/static/uni.ttf') format('truetype');
	}

	/* #endif */

	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}

	view {
		font-size: 14px;
		line-height: inherit;
	}

	.example {
		padding: 0 15px 15px;
	}

	.example-info {
		padding: 15px;
		color: #3b4144;
		background: #ffffff;
	}

	.example-body {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
	}

	/* #endif */
	.example {
		padding: 0 15px;
	}

	.example-info {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 15px;
		color: #3b4144;
		background-color: #ffffff;
		font-size: 14px;
		line-height: 20px;
	}

	.example-info-text {
		font-size: 14px;
		line-height: 20px;
		color: #3b4144;
	}


	.example-body {
		flex-direction: column;
		padding: 15px;
		background-color: #ffffff;
	}

	.word-btn-white {
		font-size: 18px;
		color: #FFFFFF;
	}

	.word-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		height: 48px;
		margin: 15px;
		background-color: #007AFF;
	}

	.word-btn--hover {
		background-color: #4ca2ff;
	}


	.image {
		width: 80rpx;
		height: 80rpx;
	}
	
	.text {
		font-size: 30rpx;
		margin-top: 10rpx;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
	}

	.grid-dynamic-box {
		margin-bottom: 15px;
	}

	.grid-item-box {
		flex: 1;
		/* position: relative;
 */
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 10px 0;
	}

	.grid-dot {
		position: absolute;
		top: 5px;
		right: 15px;
	}

	.swiper {
		height: 420px;
	}

	.banner {
		height: 360upx;
		overflow: hidden;
		position: relative;
		background-color: #ccc;
	}

	.banner-img {
		width: 100%;
	}

	.banner-title {
		max-height: 84upx;
		overflow: hidden;
		position: absolute;
		left: 30upx;
		bottom: 30upx;
		width: 90%;
		font-size: 32upx;
		font-weight: 400;
		line-height: 42upx;
		color: white;
		z-index: 11;
	}

	.uni-list {
		background-color: #FFFFFF;
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.uni-list:after {
		position: absolute;
		z-index: 10;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.uni-list::before {
		position: absolute;
		z-index: 10;
		right: 0;
		top: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.uni-list-cell {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.uni-list-cell-hover {
		background-color: #eee;
	}

	.uni-list-cell::after {
		position: absolute;
		z-index: 3;
		right: 0;
		bottom: 0;
		left: 30upx;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.uni-list .uni-list-cell:last-child::after {
		height: 0upx;
	}

	/* 图文列表 */
	.uni-media-list {
		padding: 30upx 30upx;
		box-sizing: border-box;
		display: flex;
		width: 100%;
		flex-direction: row;
	}

	.uni-navigate-right.uni-media-list {
		padding-right: 74upx;
	}

	.uni-pull-right {
		flex-direction: row-reverse;
	}

	.uni-pull-right>.uni-media-list-logo {
		margin-right: 0upx;
		margin-left: 20upx;
	}

	.uni-media-list-logo image {
		height: 100%;
		width: 100%;
	}


	.uni-media-list-text-bottom {
		width: 100%;
		line-height: 30upx;
		font-size: 26upx;
		color: #8f8f94;
	}

	.uni-media-list-logo {
		width: 180upx;
		height: 140upx;
		margin-right: 20upx;
	}

	.uni-media-list-body {
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
		overflow: hidden;
		height: auto;
	}

	.uni-media-list-text-top {
		width: 100%;
		line-height: 36upx;
		font-size: 30upx;
		height: 74upx;
		font-size: 28upx;
		overflow: hidden;
	}

	.uni-media-list-text-bottom {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.input-name,
	.input-password {
		height: 80upx;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		position: relative;
		padding-left: 30upx;
		box-sizing: border-box;
	}

	.input-name::after {
		content: " ";
		position: absolute;
		left: 30upx;
		bottom: 0;
		right: 0;
		height: 1px;
		border-top: 1px solid #e5e5e5;
		transform-origin: 0 0;
		transform: scaleY(.5);
	}

	.input-name view,
	.input-password view {
		width: 140upx;
		height: 50upx;
		line-height: 50upx;
		font-size: 28upx;
		color: #333333;
	}

	.input-name input,
	.input-password input {
		flex: 1;
		height: 50upx;
		line-height: 50upx;
	}
	
	.pressureText
	{
		width: 260rpx; 
		font-size: 12px; 
		margin: auto; 
		text-align: center;
	}
	
	.pressureOverflowText
	{
		color: #FF0000;
		width: 260rpx;
		font-size: 12px; 
		margin: auto; 
		text-align: center;
	}
	
	.pressureHighlightText
	{
		color: #00BFFF;
	}
	
</style>
