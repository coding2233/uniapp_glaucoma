<template>
	<view class="formContainer">
		<u-form :model="form" :rules="rules" ref="uForm" :errorType="errorType">
				<u-form-item label="视力类别" label-width="150" prop="visionType" :required='true'>
					<u-input v-model="form.visionType" type="select" placeholder="请选择视力类别" :select-open="visiontypeListShow" @click="visiontypeListShow = true"/>
				</u-form-item>
				<u-form-item label="左眼视力" label-width="150" prop="visionLeft" :required='true'>
					<u-input v-model="form.visionLeft" type="float" placeholder="请输入视力" />
				</u-form-item>
				<u-form-item label="右眼视力" label-width="150" prop="visionRight" :required='true'>
					<u-input v-model="form.visionRight" type="float" placeholder="请输入视力" />
				</u-form-item>
				<u-form-item label="左眼眼压" label-width="150" prop="pressureLeft" :required='true'>
					<u-input v-model="form.pressureLeft" type="number" placeholder="请输入眼压" />
				</u-form-item>
				<u-form-item label="右眼眼压" label-width="150" prop="pressureRight" :required='true'>
					<u-input v-model="form.pressureRight" type="number" placeholder="请输入眼压" />
				</u-form-item>
				<u-form-item label="眼压测量时间" label-width="180" :required='true' prop="pressureTime">
					<u-input v-model="form.pressureTime" type="select" placeholder="请选择测量时间" @click="eyePressurePickerShow=true" />
				</u-form-item>
				<u-form-item label="运动类型" label-width="150" :required='true' prop="motion">
					<u-input v-model="form.motion" type="select" placeholder="请选择运动类型" @click="motionTypeListShow=true" />
				</u-form-item>
				<u-form-item label="运动时长" label-width="150" prop="motionDuration" :required='true'>
					<u-input v-model="form.motionDuration" placeholder="请输入运动时长" />
				</u-form-item>
				<u-form-item label="运动备注" label-width="150">
					<u-input v-model="form.motionRemark" placeholder="请填写运动备注" />
				</u-form-item>
				<u-form-item label="用药名称" label-width="150" :required='true' prop="medication">
					<u-input v-model="form.medication" placeholder="请输入用药名称" />
				</u-form-item>
				<u-form-item label="用药时刻" label-width="150" :required='true' prop="medicationMoment">
					<u-input v-model="form.medicationMoment" placeholder="请选择用药时刻" type="select" @click="medicationMomentPickerShow=true" />
					<view v-if="form.medicationMoment">
						<u-icon name="backspace" size="36" @click="clearMedicationMoment"></u-icon>
					</view>
				</u-form-item>
				<u-form-item label="不良反应" label-width="150">
					<u-input v-model="form.medicationAdr" placeholder="请输入不良反应" />
				</u-form-item>
				<u-form-item label="停药时刻" label-width="150">
					<u-input v-model="form.medicationSuspend" placeholder="请选择停药时刻" type="select" @click="medicationSuspendPickerShow=true" />
				</u-form-item>
				<u-form-item label="用药备注" label-width="150">
					<u-input v-model="form.medicationRemark" placeholder="请输入用药备注" />
				</u-form-item>
				<u-form-item label="情绪类型" label-width="150" :required='true' prop="emotion">
					<u-input v-model="form.emotion" placeholder="请输入情绪类型" />
				</u-form-item>
				<u-form-item label="记录日期" label-width="150" :required='true' prop="recordTime">
					<u-input v-model="form.recordTime" placeholder="请选择记录日期" type="select" @click="recordTimePickerShow=true" />
				</u-form-item>
			</u-form>
			<u-gap height="20"></u-gap>
			<u-section :title="getHistoryTitle()" color="#2979ff" sub-title="查看更多" @click="selectHistory"></u-section>
			<u-gap height="20"></u-gap>
			<u-button @click="submit">提交</u-button>

			<u-select @confirm="selectVisionTypeConfirm" v-model="visiontypeListShow" :list="visiontypeList"></u-select>
			<u-select @confirm="selectMotionTypeConfirm" v-model="motionTypeListShow" :list="motionTypeList"></u-select>
			<u-picker mode="time" v-model="eyePressurePickerShow" :params="timePickerParams" @confirm="eyePressureDateConfirm"></u-picker>
			<u-picker mode="time" v-model="recordTimePickerShow" :params="timePickerParams" @confirm="recordTimeDateConfirm"></u-picker>
			<u-picker mode="time" v-model="medicationMomentPickerShow" :params="medicationMomentTimePickerParams" @confirm="selectMedicationMomentConfirm"></u-picker>
			<u-picker mode="time" v-model="medicationSuspendPickerShow" :params="medicationMomentTimePickerParams" @confirm="medicationSuspendConfirm"></u-picker>
	</view>
</template>

<script>
export default {
	data() {
		return {
			form: {
				visionType: '',
				visionLeft: '',
				visionRight: '',
				pressureLeft: '',
				pressureRight: '',
				pressureTime: '',
				motion:'',
				motionDuration:'',
				motionRemark:'',
				medication:'',
				medicationMoment:'',
				medicationAdr:'',
				medicationSuspend:'',
				medicationRemark:'',
				emotion:'',
				recordTime:'',
			},
			
			visiontypeList: [
				{label:'矫正',value:0},
				{label:'裸眼',value:1},
				],
				
			visiontypeListShow: false,
			
			motionTypeList: [
				{label:'散步',value:0},
				{label:'快走',value:1},
				{label:'慢跑',value:2},
				{label:'骑自行车',value:3},
				{label:'游泳',value:4},
				{label:'其他',value:5},
			],
			motionTypeListShow:false,
			
			timePickerParams: {
				year: true,
				month: true,
				day: true,
				hour: true,
				minute: true,
			},
			eyePressurePickerShow: false,
			
			recordTimePickerShow: false,
			
			medicationMomentPickerShow: false,
			medicationMomentTimePickerParams:{
				hour: true,
				minute: true,
			},
			
			medicationSuspendPickerShow: false,
			
			rules: {
				visionType: [
					{
						required: true,
						message: '此为必填字段',
						// blur和change事件触发检验
						trigger: ['blur', 'change'],
					}
				],
				visionLeft: [
					// 必填规则
					{
						required: true,
						message: '此为必填字段',
						trigger: ['blur', 'change'],
					},
					{
						type: 'float',
						message: '只能输入数字',
						trigger: ['change','blur'],
					}
				],
				visionRight: [
					{
						required: true,
						message: '此为必填字段',
						trigger: ['blur', 'change'],
					},
					{
						type: 'float',
						message: '只能输入数字',
						trigger: ['change','blur'],
					}
				],
				pressureLeft: [
					{
						required: true,
						message: '此为必填字段',
						trigger: ['blur', 'change'],
					},
					{
						type: 'number',
						message: '只能输入数字',
						trigger: ['change','blur'],
					}
				],
				pressureRight: [
					{
						required: true,
						message: '此为必填字段',
						trigger: ['blur', 'change'],
					},
					{
						type: 'number',
						message: '只能输入数字',
						trigger: ['change','blur'],
					}
				],
				pressureTime: [
					{
						required: true,
						message: '此为必填字段',
						trigger: ['blur', 'change'],
					},
				],
				motion: [
					{
						required: true,
						message: '此为必填字段',
						trigger: ['blur', 'change'],
					},
				],
				motionDuration: [
					{
						required: true,
						message: '此为必填字段',
						trigger: ['blur', 'change'],
					},
					{
						type: 'number',
						message: '只能输入数字',
						trigger: ['change','blur'],
					}
				],
				medication: [
					{
						required: true,
						message: '此为必填字段',
						trigger: ['blur', 'change'],
					},
				],
				medicationMoment: [
					{
						required: true,
						message: '此为必填字段',
						trigger: ['blur', 'change'],
					},
				],
				emotion:[
					{
						required: true,
						message: '此为必填字段',
						trigger: ['blur', 'change'],
					},
				],
				recordTime: [
					{
						required: true,
						message: '此为必填字段',
						trigger: ['blur', 'change'],
					},
				],
			},
			errorType: ['message'],
			
			history: {},
		};
	},
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	},
	onLoad() {
		this.getHistory()
	},
	methods: {
		selectVisionTypeConfirm(e) {
			if(e){
				if(e.length>0){
					this.form.visionType=e[0].label
				}
			}
		},
		
		selectMotionTypeConfirm(e){
			if(e){
				if(e.length>0){
					this.form.motion=e[0].label
				}
			}
		},
		
		submit() {
			this.$refs.uForm.validate(valid => {
				if (valid) {
					
					console.log('验证通过');
					this.$queue.showLoading("正在修改...")
					let param = this.form
					param.userId=this.$queue.getData('UserInfo').userId;
					console.log(param)
					this.$Request.post("/system/record",
						param
					).then(res => {
						console.log(res)
						uni.hideLoading()
						if (res.code == 200) {
							this.$queue.showToast("记录成功")
							this.history.add(param)
						} else {
							this.$queue.showToast(res.msg)
						}
					})
					console.log("提交记录")
					
				} else {
					console.log('验证失败');
					uni.showToast({
						title:'请完善记录信息',
						icon:"none"
					})
				}
			});
		},
		selectHistory() {
			console.log("选择历史记录")
			if(this.history && this.history.length>0){
				uni.navigateTo({
					url:'history',
				})
			}else{
				uni.showToast({
					title:'暂时没有历史记录',
					icon:"none"
				})
			}
		},
		eyePressureDateConfirm(e){
			let date = new Date();
			if(e.year<=date.getFullYear()
				&& e.month<=(date.getMonth()+1)
				&& e.day <= date.getDate()){
					this.form.pressureTime=e.year+"-"+e.month+"-"+e.day+" "+e.hour+":"+e.minute
				}else{
					uni.showToast({
						title:'时间不可超前选择',
						icon:"none"
					})
				}
		},
		recordTimeDateConfirm(e){
			let date = new Date();
			if(e.year<=date.getFullYear()
				&& e.month<=(date.getMonth()+1)
				&& e.day <= date.getDate()){
					this.form.recordTime=e.year+"-"+e.month+"-"+e.day+" "+e.hour+":"+e.minute
				}else{
					uni.showToast({
						title:'时间不可超前选择',
						icon:"none"
					})
				}
		},
		
		selectMedicationMomentConfirm(e){
			this.form.medicationMoment=this.form.medicationMoment+e.hour+":"+e.minute+";";
			console.log(e)
		},
		
		clearMedicationMoment(){
			this.form.medicationMoment='';
		},
		
		medicationSuspendConfirm(e){
			this.form.medicationSuspend=e.hour+":"+e.minute+";";
		},
		
		getHistory(){
					let userInfo= this.$queue.getData("UserInfo")
					if(userInfo)
					{
						this.$Request.get("/system/record/getInfoById/"+userInfo.userId).then(res=>{
							if(res.code  == 200)
							{
								this.history=res.data
								console.log(JSON.stringify(this.history))
							}
						}).catch(res=>{console.log("getHistory error")})
			}
		},
				
		getHistoryTitle(){
			let title="历史记录";
			if(this.history && this.history.length>0){
				title+=" ("+this.history.length+")"
			}
			return title
		},
		
	},
};
</script>

<style>
.formContainer {
	margin-left: 20rpx;
	margin-right: 20rpx;
}
.formLabel {
	width: 200rpx;
}
</style>
