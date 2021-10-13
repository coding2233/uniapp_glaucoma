<template>
	<view>
		<u-tabs name="cate_name" count="cate_count" :list="tyepList" :is-scroll="false" :current="currentType" @change="onTypeChanged"></u-tabs>
		<view v-if="currentType===0">
			<visionHistory :history="history"></visionHistory>
		</view>
		<view v-else-if="currentType===1">
			<pressureHistory :history="history"></pressureHistory>
		</view>
		<view v-else-if="currentType===2">
			<motionHistory :history="history"></motionHistory>
		</view>
		<view v-else-if="currentType===3">
			<medicationHistory :history="history"></medicationHistory>
		</view>
		<view v-else-if="currentType===4">
			<emotionHistory :history="history"></emotionHistory>
		</view>
		
		
	</view>
</template>

<script>
	
	import visionHistory from './vision-history'
	import pressureHistory from './pressure-history'
	import motionHistory  from './motion-history'
	import medicationHistory from './medication-history'
	import emotionHistory from './emotion-history'
	
	export default {
		components:{
			visionHistory,pressureHistory,motionHistory,medicationHistory,emotionHistory,
		},
		data() {
			return {
				tyepList: [{cate_name: '视力'}, {cate_name: '眼压'}, {cate_name: '运动'}, {cate_name: '用药'}, {cate_name: '情绪'}],
				currentType: 0,
				history:[],
				tableInfo:[
					{tr:['时间','左眼','右眼','裸眼/矫正']}
				],
				selectTable: {}
			}
		},
		onLoad(options) {
			// if(options && options.history){
			// 	this.history=options.history
			// 	console.log(JSON.stringify(this.history))
			// }
			this.getHistory()
			this.selectTable=this.tableInfo[0]
		},
		methods: {
			onTypeChanged(index) {
				this.currentType = index;
				this.selectTable=this.tableInfo[index]
			},
			getHistory(){
				let userInfo= this.$queue.getData("UserInfo")
				if(userInfo)
				{
					this.$Request.get("/system/record/getInfoById/"+userInfo.userId).then(res=>{
						if(res.code  == 200)
						{
							this.history=res.data
							uni.setStorageSync("history",this.history)
							console.log(JSON.stringify(this.history))
							this.$forceUpdate()
						}
					}).catch(res=>{console.log("getHistory error")})
				}
			},
		}
	}
</script>

<style>
	.container{
		width: 1000rpx;
	}
</style>
