<template>
	<view class="content">
	<!-- 	<view style="background-color: #FFFFFF;">
			<qiun-title-bar title="眼压折线图" />
			<view class="charts-box">
				<qiun-data-charts type="area" :chartData="chartsDataLine1" />
			</view>
		</view> -->
		<view style="background-color: #FFFFFF;">
		<qiun-title-bar title="眼压折线图" />
		<view class="charts-box">
		  <qiun-data-charts
		    type="line"
		    :chartData="chartData"
		    background="none"
		  />
		</view>
		</view>
		<uni-section></uni-section>
		<view class="itme-box">
			<qiun-title-bar title="眼压数据表"/>
			<view class="h-table h-table-primary">
				<view class="h-tr h-tr-2 h-thead">
					<view class="h-td">时间</view>
					<view class="h-td">右眼</view>
					<view class="h-td">左眼</view>
					<view class="h-td">已用药物</view>
					<view class="h-td">备注</view>
				</view>
				<view class="h-tr h-tr-2" v-for="(item ,index) in remark" :index="index">
					<view class="h-td">{{chartData.categories[index]}}</view>
					<view class="h-td">{{chartData.series[0].data[index]}}</view>
					<view class="h-td">{{chartData.series[1].data[index]}}</view>
					<view class="h-td">{{medication[index]}}</view>
					<view class="h-td">{{remark[index]}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				chartsDataLine1: {},
				Line: {
					categories: ["", "", "", ""],
					series: [{
						"name": "右眼",
						"data": [0, 0, 0, 0]
					}, {
						"name": "左眼",
						"data": [0, 0, 0, 0]
					}]
				},
				chartData:{
				  categories:["1","2","3"],
				  series:[{"name":"xxx","data":[14,245,523,21]}],
				},
				medication:[],
				remark:[]
			}
		},
		onLoad(){
		},
		onShow() {
			this.loadData()
		},
		onReady() {
			// //模拟从服务器获取数据
			// this.getServerData()
		},
		methods: {
			loadData(){
				let userId = this.$queue.getData('UserInfo').userId
				this.$Request.get("/system/record/getInfoById/"+userId).then(res =>{
					console.log(JSON.stringify(res))
					let dataLength = res.data.length
					if(dataLength<1)
					return;
					let resDatas= res.data
					let categories=[]
					let leftSeries=[]
					let rightSeries=[]
					let medication=[]
					let remark=[]
					
					for(let i=0;i<dataLength;i++){
						let resData = resDatas[i]
						categories.push(resData.recordTime)
						leftSeries.push(resData.pressureLeft)
						rightSeries.push(resData.pressureRight)
						medication.push(resData.medication)
						let remarkStr =resData.motion+" "+resData.emotion
						remark.push(remarkStr)
					}
					
					
					this.chartData.categories=categories
					let series = []
					series.push({"name":"左眼","data":leftSeries})
					series.push({"name":"右眼","data":rightSeries})
					this.chartData.series=series
					this.medication=medication
					this.remark=remark
				})
			},
		}
	}
</script>


<style lang="scss">
	/* 引入表格样式表 */
	@import "../../static/css/helang-table.scss";


	/* 示例样式开始 */
	.content {
		font-size: 28rpx;
		background-color: #f3f3f3;
		padding: 20rpx;

		.red {
			background-color: #DD524D;
			color: #fff;
			text-align: center;
		}

		.green {
			background-color: #42b983;
			color: #fff;
			text-align: center;
		}

		.blue {
			background-color: #007AFF;
			color: #fff;
			text-align: center;
		}

		.yellow {
			background-color: #ffaa00;
			color: #fff;
			text-align: center;
		}


		.itme-box {
			padding: 20rpx;
			background-color: #fff;
			margin-bottom: 20rpx;

			.title {
				padding-bottom: 20rpx;
				margin-bottom: 20rpx;
				border-bottom: #e5e5e5 solid 1px;
				line-height: normal;
			}

			.width-fill {
				width: 100%;
			}

			.preview-box {
				height: 400rpx;
				box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
			}
		}

		.charts-box {
			width: 100%;
			height: 300px;
		}
	}
	
	.charts-box{
	  width: 100%;
	  height:300px;
	}
	/* 示例样式结束 */
</style>
