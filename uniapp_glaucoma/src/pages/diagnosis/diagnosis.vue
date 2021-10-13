<template>
	<view style="height: 100%;width: 100%;">
		<view style="height: 40%;width: 100%;margin-bottom: 40px;">
			<button class="btn" type="primary" @click="toMedicalRecord()">就诊记录</button>
			<button class="btn" type="primary" @click="toMethod()">治疗方式</button>
		</view>
		<view style="height: 60%;">
			<uni-list>
				<uni-list-item>
					<view slot="body" class="slot-box">
						<image class="slot-image" src="/static/img/diagnosis/alarm.png" mode="widthFix"></image>
						<text class="slot-text">提醒通知</text>
						<uni-badge text="2" type="primary" />
					</view>
				</uni-list-item>
				<view v-for="(item,index) in remindList" :index="index">
					<uni-list-item v-if="remindList[index].remindType==0" :title="remindList[index].remind" :rightText="remindList[index].remindTime">
						<template slot="header">
							<image class="slot-image" src="/static/img/diagnosis/collection.png" mode="widthFix"></image>
						</template>
					</uni-list-item>
					<uni-list-item  v-if="remindList[index].remindType==1&&remindList[index].drugsEndTime>=today&&remindList[index].drugsStartTime<=today" title="用药" :note="remindList[index].drugs" :rightText="'每日'+remindList[index].drugsMode">
						<template slot="header">
							<image class="slot-image" src="/static/img/diagnosis/collection.png" mode="widthFix"></image>
						</template>
					</uni-list-item>
					<uni-list-item  v-if="remindList[index].remindType==1&&remindList[index].drugsStratTime>today" title="用药" :note="remindList[index].drugs" :rightText="remindList[index].drugsMode">
						<template slot="header">
							<image class="slot-image" src="/static/img/diagnosis/collection.png" mode="widthFix"></image>
						</template>
					</uni-list-item>
				</view>
			</uni-list>
		</view>

	</view>
</template>

<script>
	import neilModal from '@/components/neil-modal/neil-modal.vue';
	import LbPicker from '@/components/lb-picker';
	export default {
		components: {
			neilModal,
			LbPicker
		},
		data() {
			return {
				remindList: [],
				today:''
			};
		},
		onShow() {
			this.loadData()
		},
		methods: {
			loadData() {
				let userId = this.$queue.getData('UserInfo').userId
				this.$Request.get("/system/remind/getInfoByUserId/" + userId).then(res => {
					this.remindList = res.data
				})
				var myDate = new Date();
				this.today = this.formatDate(myDate.toLocaleDateString());
				console.log(this.today)
			},
			toMedicalRecord() {
				uni.navigateTo({
					url: '../medical-record/medical-record'
				})
			},
			formatDate(date) {
			// date = new Date();
			date = new Date(Date.parse(date.replace(/-/g, "/"))); //转换成Data();
			var y = date.getFullYear();
			var m = date.getMonth() + 1;
			m = m < 10 ? '0' + m : m;
			var d = date.getDate();
			d = d < 10 ? ('0' + d) : d;
			return y + '-' + m + '-' + d;
			},
			toMethod() {
				uni.navigateTo({
					url: '../treatment-method/treatment-method'
				})
			},
		}
	};
</script>

<style>
	/* 头条小程序组件内不能引入字体 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		font-weight: normal;
		font-style: normal;
		src: url("~@/static/uni.ttf") format("truetype");
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
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
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

	.slot-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
	}

	.slot-image {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		margin-right: 10px;
		width: 30px;
		height: 30px;
	}

	.slot-text {
		flex: 1;
		font-size: 18px;
		margin-right: 10px;
	}

	.btn {
		width: 80%;
		padding: 10px;
		margin-top: 20px;
		margin-bottom: 20px;
		box-shadow: 0rpx 0rpx 30rpx 0rpx #007AFF;
		background-image: linear-gradient(to right, #007AFF, #007ABB);
	}
</style>
