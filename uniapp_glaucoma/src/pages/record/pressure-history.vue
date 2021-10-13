<template>
	<view class="content">
		<view style="background-color: #FFFFFF;">
			<qiun-title-bar title="眼压折线图" />
			<view class="charts-box">
			  <qiun-data-charts
				type="line"
				:chartData="getChartData()"
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
					<view class="h-td">左眼</view>
					<view class="h-td">右眼</view>
					<view class="h-td">已用药物</view>
					<view class="h-td">备注</view>
				</view>
				<view class="h-tr h-tr-2" v-for="(item ,index) in history" :index="index">
					<view class="h-td">{{item.recordTime}}</view>
					<view class="h-td">{{item.pressureLeft}}</view>
					<view class="h-td">{{item.pressureRight}}</view>
					<view class="h-td">{{item.medication}}</view>
					<view class="h-td">{{item.motion}} {{item.emotion}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:["history"],
		data() {
			return {
			}
		},
		methods: {
			getChartData(){
				let chartData={};
				let categories=[];
				let leftSeries=[];
				let rightSeries=[];
				
				for(let i=0;i<this.history.length;i++){
					let item = this.history[i]
					categories.push(item.recordTime)
					leftSeries.push(item.pressureLeft)
					rightSeries.push(item.pressureRight)
				}
				
				let series = []
				series.push({"name":"左眼","data":leftSeries})
				series.push({"name":"右眼","data":rightSeries})
				chartData.categories=categories
				chartData.series=series
				return chartData
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
