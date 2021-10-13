<template>
	<view class="content">
		<uni-forms>
			<qiun-title-bar title="感知压力量表" /><text class="example-info">这个量表中的问题询问的是你上个月的感受和想法。在每一种情况下，你都会被要求指出你对某一特定方式的感觉或想法的频率，你应该把每一个问题作为一个单独的问题来对待。最好的方法是相当快地回答每个问题。也就是说，不要试图计算出 你对某一特定方式的感受次数，而要指出似乎是合理估计的另一种方式。对于每个问题，请从以下选项中选择:</text>
				
			<uni-group>
				
				<view v-for="(item,index) in questionList" :index="index" :key="index">
					<view style="margin-left: 20upx;margin-right: 10upx;" class="text">{{questionList[index]}}</view>
					<uni-data-checkbox  style="margin-left: 15upx;" mode="button"
						v-model="formData.value[index]" :localdata="options"></uni-data-checkbox>
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
					'1.一些无法预期的事情发生而感到心烦意乱',
					'2.感觉无法控制自己生活中重要的事情?',
					'3.感到紧张不安和压力',
					'4.成功地处理恼人的生活麻烦',
					'5.感到自己有效地处理生活中所发生的重大事件',
					'6.对于处理自己的私人问题感到有信心',
					'7.感到事情顺心如意',
					'8.发现自己无法处理所有自己必须做的事情',
					'9.有办法控制生活中恼人的事情',
					'10.常觉得自己是驾驭事情的主人',
					'11.常生气，因为很多事情的发生是自己无法控制的',
					'12.经常想到很多事情是自己必须完成的',
					'13.常能掌握时间的安排方式',
					'14.常感到困难的事情堆积如山，而自己无法克服它们'
				],
				formData: {
					value: []
				},
				options: [{
						text: '从不',
						value: 0
					}, {
						text: '偶尔',
						value: 1
					}, {
						text: '有时',
						value: 2
					},
					{
						text: '经常',
						value: 3
					},
					{
						text: '总是',
						value: 4
					}
				]
			}
		},
		methods: {
			submit() {
				for(let i=0;i<14;i++){
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
					stress:this.total
				}
				console.log(userInfo)
				this.$Request.put("/system/info",
					userInfo
				).then(res => {
					console.log(res)
					uni.hideLoading()
					if (res.code == 200) {
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
		font-size: 18px;
		line-height: 20px;
	}
	
	.example-info-text {
		font-size: 18px;
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
