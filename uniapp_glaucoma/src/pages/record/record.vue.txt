<template>
	<view class="view">
		<view v-for="item in recordButtons">
			<button class="btn" type="primary" @click="onRecordButtonClick(item)"> 
			<view style="font-size: 48upx;">{{item.name}}</view>
			<view style="font-size: 30upx;">
				{{item.desc}}
			</view>
			</button>
		</view>
		
		<button class="btn" type="primary" @click="handleTap('picker1')">
			<view style="font-size: 48upx;">添加记录</view>
		</button>
		
		<view v-if="selectRecordButton!=null">
			<neil-modal :show="showNeilModalGlobal" @close="closeModal()" @cancel="cancelModal()"
				@confirm="confirmModal()" :title="selectRecordButton.modalName">
				<view v-if="selectRecordButton.name==='视力'">
					<view>
						<u-subsection :list="visionType" :current="currentVisionType"></u-subsection>
					</view>
					<view class="input-view">
						<view class="input-name">
							<view style="font-size: 32upx;">左眼视力</view>
							<input type="number" v-model="selectRecordButton.data.visionLeft" placeholder="请输入左眼视力" />
						</view>
						<view class="input-password">
							<view style="font-size: 32upx;">右眼视力</view>
							<input type="number" v-model="selectRecordButton.data.visionRight" placeholder="请输入右眼视力" />
						</view>
					</view>
				</view>
				<view v-else-if="selectRecordButton.name==='眼压'">
					<view style="display: flex; justify-content: center;">
						<u-button @click="OnEyePressure" size="medium"> {{eyePressureTime}} </u-button>
					</view>
					<view class="input-view">
						<view class="input-name">
							<view style="font-size: 32upx;">左眼眼压</view>
							<input type="number" v-model="selectRecordButton.data.pressureLeft" placeholder="请输入15~18mmHg" />
						</view>
						<view class="input-name">
							<view style="font-size: 32upx;">右眼眼压</view>
							<input type="number" v-model="selectRecordButton.data.pressureRight" placeholder="请输入15~18mmHg" />
						</view>
					</view>
				</view>
				<view v-else-if="selectRecordButton.name==='运动'" style="height: 360rpx;">
					<u-button @click="motionSettings.show=true">{{selectRecordButton.data.motion}}</u-button>
					<u-select @confirm="onSelectMotionConfirm" v-model="motionSettings.show" :list="motionSettings.list"></u-select>
					<view class="input-view">
						<view class="input-name">
							<view style="font-size: 32upx;">运动时长</view>
							<input v-model="selectRecordButton.data.duration" placeholder="请输入运动时长" />
						</view>
					</view>
					<view class="input-view">
						<view class="input-name">
							<view style="font-size: 32upx;">运动日期</view>
							<input v-model="selectRecordButton.data.dateTime" placeholder="请选择运动日期" />
						</view>
					</view>
					<view class="input-view">
						<view class="input-name">
							<view style="font-size: 32upx;">备注</view>
							<input v-model="selectRecordButton.data.remark" placeholder="请输入备注" />
						</view>
					</view>
				</view>
				<view v-else-if="selectRecordButton.name==='用药'">
					<view class="input-view">
						<view class="input-name">
							<view style="font-size: 32upx;">用药</view>
							<input v-model="selectRecordButton.data.medication" placeholder="请输入用药情况" />
						</view>
					</view>
					<view class="input-view">
						<view class="input-name">
							<view style="font-size: 32upx;">用药时间</view>
							<input v-model="selectRecordButton.data.duration" placeholder="请输入用药时间" />
						</view>
					</view>
				</view>
				<view v-else-if="selectRecordButton.name==='情绪'">
					<view class="input-view">
						<view class="input-name">
							<view style="font-size: 32upx;">情绪</view>
							<input v-model="selectRecordButton.data.emotion" placeholder="请记录情绪" />
						</view>
					</view>
					<view class="input-view">
						<view class="input-name">
							<view style="font-size: 32upx;">记录时间</view>
							<input v-model="selectRecordButton.data.dateTime" placeholder="请选择记录日期" />
						</view>
					</view>
				</view>
				
				<u-section :title="getHistoryTitle()" color="#2979ff" sub-title="查看更多" @click="onSelectEyePressureHistory"></u-section>
			</neil-modal>
		</view>
		
		<lb-picker ref="picker1" :default-time-limit="1" v-model="recordTime" mode="dateSelector" :end-date="today" @change="handleChange"
			@confirm="handleConfirm" @cancel="handleCancel">
		</lb-picker>
		<view>
				<u-picker mode="time" v-model="eyePressurePickerShow" :params="params" @confirm="OnEyePressureDateConfirm"></u-picker>
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
				recordButtons:[
					{name:'视力',desc:'暂无历史记录',modalName:'请输入视力',data:{visionLeft:0,visionRight:0}},
					{name:'眼压',desc:'暂无历史记录',modalName:'请输入眼压',data:{pressureLeft:0,pressureRight:0,dateTime:"1997-01-01"}},
					{name:'运动',desc:'暂无历史记录',modalName:'请记录运动',data:{motion:"散步",duration:0,dateTime:"1997-01-01",remark:""}},
					{name:'用药',desc:'暂无历史记录',modalName:'请记录用药',data:{medication:"",time:[],adr:"",remark:""}},
					{name:'情绪',desc:'暂无历史记录',modalName:'请记录情绪',data:{emotion:"",dateTime:"1997-01-01"}}],
				selectRecordButton: null,
				showNeilModal: {
					modalVision:false,
					modalEyePressure:false,
					modalExercise:false,
					modalPharmacy:false,
					modalEmotion:false,
				},
				showNeilModalGlobal:false,
				recordTime: '',
				extraIcon: {
					color: '#4cd964',
					size: '22',
					type: 'gear-filled'
				},
				motionSettings:{
					show:false,
					list:[
						{value:0,label:'散步'},
						{value:1,label:'快走'},
						{value:2,label:'慢跑'},
						{value:3,label:'骑自行车'},
						{value:4,label:'游泳'},
						{value:4,label:'其他'},]
				},
				today: "",
				visionType:[{name:'矫正'},{name:'裸眼'}],
				currentVisionType: 1,
				params: {
					year: true,
					month: true,
					day: true,
					hour: true,
					minute: true,
				},
				eyePressurePickerShow: false,
				history:{},
				eyePressureTime:'选择日期'
			};
		},
		onShow() {
			this.today = this.getTodayDate()
			this.onGetHistory()
		},
		methods: {
			closeModal() {
				this.showNeilModalGlobal=false
			},
			cancelModal(e) {
				let recordButton=this.selectRecordButton
				if(recordButton.name=="视力"){
					recordButton.data.visionLeft=0
					recordButton.data.visionRight=0
				}
				else if(recordButton.name=="眼压"){
					recordButton.data.pressureLeft=0
					recordButton.data.pressureRight=0
				}
			},
			confirmModal(e) {
				let record = this.selectRecordButton
				this.updateDataDesc(record,record.data)
				console.log(JSON.stringify(record))
			},
			handleTap(name) {
				this.$refs[name].show()
			},
			handleChange(e) {
				console.log('change::', e)
			},
			handleConfirm(e) {
				this.recordTime = e.value
				var that = this
				this.$queue.showLoading("正在修改...")
				let param = {
					userId:this.$queue.getData('UserInfo').userId,
					visionLeft: this.recordButtons[0].data.visionLeft,
					visionRight: this.recordButtons[0].data.visionRight,
					pressureLeft: this.recordButtons[1].data.pressureLeft,
					pressureRight: this.recordButtons[1].data.pressureRight,
					motion: this.recordButtons[2].data.motion,
					medication: this.recordButtons[3].data.medication,
					emotion: this.recordButtons[4].data.emotion,
					recordTime: this.recordTime,
				}
				console.log(param)
				if(param.visionLeft==0||param.visionRight==0||param.pressureLeft==0||param.pressureRight==0)
					return;
				this.$Request.post("/system/record",
					param
				).then(res => {
					console.log(res)
					uni.hideLoading()
					if (res.code == 200) {
						this.$queue.showToast("记录成功")
					} else {
						this.$queue.showToast(res.msg)
					}
				})

			},
			handleCancel(e) {
				console.log('cancel::', e)
			},
			getTodayDate(){
				let date = new Date()
				var today = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
				return today
			},
			OnEyePressure(){
				console.log(this.eyePressurePickerShow)
				this.eyePressurePickerShow=!this.eyePressurePickerShow;
			},
			onGetHistory(){
				let lastHistory=null
				let userInfo= this.$queue.getData("UserInfo")
				if(userInfo)
				{
					console.log(userInfo.userId)
					this.$Request.get("/system/record/getInfoById/"+userInfo.userId).then(res=>{
						if(res.code  == 200)
						{
							// console.log(JSON.stringify(res))
							this.history=res.data
							if(this.history.length>0)
							{
								lastHistory=this.history[this.history.length-1]
							}
							
							for(let i=0;i<this.recordButtons.length;i++)
							{
								let recordBtn = this.recordButtons[i]
								recordBtn.desc="暂无数据"
								if(lastHistory!=null){
									this.updateDataDesc(recordBtn,lastHistory)
								}
								
							}
						}
					}).catch(res=>{console.log("onGetHistory error")})
				}
				// getData
			},
			getHistoryTitle(){
				let length = this.history.length
				return "历史记录 ("+length+")"
			},
			//选择眼压日期
			OnEyePressureDateConfirm(e){
				this.eyePressureTime=e.year+"-"+e.month+"-"+e.day+" "+e.hour+":"+e.minute
				console.log("眼压日期:"+JSON.stringify(e))
			},
			//选择历史记录
			onSelectEyePressureHistory(e){
				if(this.selectRecordButton.name=="眼压")
				{
					uni.navigateTo({
						url:"../Intraocular-pressure/Intraocular-pressure"
					})
				}
				else if(this.selectRecordButton.name=="视力"){
					uni.navigateTo({
						url:"./vision-history"
					})
				}
				else if(this.selectRecordButton.name=="运动"){
					uni.navigateTo({
						url:"./motion-history"
					})
				}
				else if(this.selectRecordButton.name=="用药"){
					uni.navigateTo({
						url:"./medication-history"
					})
				}
				else if(this.selectRecordButton.name=="情绪"){
					uni.navigateTo({
						url:"./emotion-history"
					})
				}
			},
			//点击显示按钮
			onRecordButtonClick(itemButton){
				this.selectRecordButton=itemButton
				this.showNeilModalGlobal=true
			},
			//更新
			updateDataDesc(recordButton,data){
				if(recordButton.name=="视力"){
					recordButton.desc="左眼视力:"+data.visionLeft+ " 右眼视力:"+data.visionRight
				}
				else if(recordButton.name=="眼压"){
					recordButton.desc="左眼眼压:"+data.pressureLeft+ " 右眼眼压:"+data.pressureRight	
				}
				else if(recordButton.name=="运动"){
					if(data.motion!=""){
						recordButton.desc=data.motion
					}
				}
				else if(recordButton.name=="用药"){
					if(data.medication!=""){
						recordButton.desc=data.medication
					}
				}
				else if(recordButton.name=="情绪"){
					if(data.emotion!=""){
						recordButton.desc=data.emotion
					}
				}
			},
			onMotionShowClick(){
				this.motionSettings.show=true
			},
			//选择运动
			onSelectMotionConfirm(e) {
				if(this.selectRecordButton!=null && e.length>0){
					this.selectRecordButton.data.motion=e[0].label
				}
			}
		}
	};
</script>

<style>
	page {
		width: 100%;
		height: 100%;
	}

	.view {
		width: 100%;
		height: 100%;
	}

	.btn {
		width: 80%;
		padding: 2px;
		margin-top: 20px;
		margin-bottom: 20px;
		box-shadow: 0rpx 0rpx 30rpx 0rpx #007AFF;
		background-image: linear-gradient(to right, #007AFF, #007ABB);
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
	
	.open-motion {
		margin-top: 50rpx; 
	}
	
</style>
