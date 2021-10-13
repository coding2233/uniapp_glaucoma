<template>
	<view class="content">
		<uni-forms>
			<qiun-title-bar title="药物依从性量表" />
			<uni-group>
				<view v-for="(item,index) in questionList" :index="index" :key="index">
					<view style="margin-left: 20upx;" class="text">{{questionList[index]}}</view>
					<uni-data-checkbox v-if="index!=7" style="margin-left: 20upx;" mode="button"
						v-model="formData.value[index]" :localdata="options1"></uni-data-checkbox>
					<uni-data-checkbox v-if="index==7" style="margin-left: 20upx;" mode="button"
						v-model="formData.value[index]" :localdata="options2"></uni-data-checkbox>
				</view>
				<button class="btn-logout" @click="submit()">提交</button>
			</uni-group>

		</uni-forms>
	</view>
</template>

<script>
	import wenjuan from '@/components/gwh-wenjuan/gwh-wenjuan.vue'
	export default {
		components: {
			wenjuan
		},
		data() {
			return {
				total:0,
				questionList: [
					'1.您有时会忘记使用抗青光眼病药物吗?',
					'2.在过去两周里,是否有一天或几天您忘记使用抗青光眼药物?',
					'3.治疗期间,当您觉得服用药物而感觉更不好时,您是否未告知医生而自行减少药量或停止使用药物?',
					'4.当您外出旅行或长时离家时,您是否有时忘记随身携带药物?',
					'5.昨天您使用抗青光眼药物了吗?',
					'6.当您觉得自己的病情得到控制时,您是否有时会停止使用抗青光眼药物?',
					'7.每天使用抗青光眼药物对于一些人来说是很不方便的,您是否觉得要坚持治疗计划有困难?',
					'8.您会觉得要记住按时按量使用所有抗青光眼药物很难吗?'
				],
				formData: {
					value: []
				},
				options1: [{
					text: '是',
					value: 0
				}, {
					text: '否',
					value: 1
				}],
				options2: [{
						text: '从不',
						value: 1
					}, {
						text: '偶尔',
						value: 0.75
					}, {
						text: '有时',
						value: 0.5
					},
					{
						text: '经常',
						value: 0.25
					},
					{
						text: '总是',
						value: 0
					}
				]

			}
		},
		methods: {
			submit() {
				for(let i=0;i<8;i++){
					if(this.formData.value[i]==undefined){
						this.$queue.showToast('请回答所有问题之后提交!')
						this.total = 0;
						return
					}else{
						 this.total += this.formData.value[i];
					}
				}
				var that = this
				this.$queue.showLoading("正在修改...")
				let userInfo = {
					userId:this.$queue.getData('UserInfo').userId,
					compliance:this.total
				}
				console.log(userInfo)
				this.$Request.put("/system/info",
					userInfo
				).then(res => {
					console.log(res)
					uni.hideLoading()
					if (res.code == 200) {
						// let info = this.$Request.getData('UserInfo')
						// console.log(info)
						// info.compliance = this.compliance
						// this.$Request.setData('UserInfo',info)
						uni.navigateBack({
							
						})
					} else {
						this.$queue.showToast(res.msg)
				
					}
				})
			}
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

	.example {
		padding: 10px;
		background-color: #fff;
	}

	.text {
		font-size: 18px;
		color: #333;
		margin-bottom: 10px;
	}

	.btn-logout {
		margin-top: 50upx;
		margin-bottom: 50upx;
		width: 80%;
		border-radius: 50upx;
		font-size: 16px;
		color: #fff;
		background: linear-gradient(to right, #365fff, #36bbff);
	}

	.btn-logout-hover {
		background: linear-gradient(to right, #365fdd, #36bbfa);
	}
</style>
