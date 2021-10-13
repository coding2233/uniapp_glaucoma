<template>
	<view>
		<cmd-page-body type="top" style="margin-top: -10%;">
			<cmd-transition name="fade-up">
				<view>
					<cmd-cel-item title="姓名" slot-right arrow>
						<input disabled="true" style="text-align: right;
text-align: end;" v-model="userInfo.nickName" />
					</cmd-cel-item>
					<cmd-cell-item title="就诊日期" slot-right arrow>
						<input @click="handleTap('picker1')" disabled="true" style="text-align: right;
text-align: end;" v-model="form.medicalTime" placeholder="请输入"/>
						<lb-picker ref="picker1" :default-time-limit="50" v-model="form.medicalTime"
							mode="dateSelector" :end-date="today" @change="handleChange" @confirm="handleConfirm" @cancel="handleCancel">
						</lb-picker>
					</cmd-cell-item>
					<cmd-cell-item title="MD值" slot-right arrow>
						<input type="number" style="text-align: right;
text-align: end;" v-model="form.md" placeholder="请输入"/>
					</cmd-cell-item>
					<cmd-cell-item title="PSD值" slot-right arrow>
											<input type="number" style="text-align: right;
					text-align: end;" v-model="form.psd" placeholder="请输入"/>
										</cmd-cell-item>
					<cmd-cell-item title="杯盘比值" slot-right arrow>
						<input type="number" style="text-align: right;
					text-align: end;" v-model="form.bh" placeholder="请输入"/>
					</cmd-cell-item>
					<cmd-cell-item title="角膜厚度(um)" slot-right arrow>
						<input  type="number"style="text-align: right;
										text-align: end;" v-model="form.um" placeholder="请输入" />
					</cmd-cell-item>
					<cmd-cell-item title="RNFL值(um)" slot-right arrow>
						<input  type="number" style="text-align: right;
															text-align: end;" v-model="form.rnfl" placeholder="请输入"/>
					</cmd-cell-item>
					<cmd-cell-item title="就诊医院" slot-right arrow>
						<input style="text-align: right;
text-align: end;" v-model="form.hospital" placeholder="请输入" />
					</cmd-cell-item>
					<cmd-cell-item title="备注" slot-right arrow>
						<input style="text-align: right;
text-align: end;" v-model="form.remark" placeholder="请输入"/>
					</cmd-cell-item>
					<button class="btn-logout" @click="submit()">上传就诊记录</button>
				</view>
			</cmd-transition>
		</cmd-page-body>
	</view>
</template>

<script>
	import cmdNavBar from "@/components/cmd-nav-bar/cmd-nav-bar.vue"
	import cmdPageBody from "@/components/cmd-page-body/cmd-page-body.vue"
	import cmdTransition from "@/components/cmd-transition/cmd-transition.vue"
	import cmdCelItem from "@/components/cmd-cell-item/cmd-cell-item.vue"
	import cmdAvatar from "@/components/cmd-avatar/cmd-avatar.vue"
	import LbPicker from '@/components/lb-picker'
	export default {
		components: {
			cmdNavBar,
			cmdPageBody,
			cmdTransition,
			cmdCelItem,
			cmdAvatar,
			LbPicker,
			today: ""
		},
		onLoad() {
			this.loadData()
		},

		data() {
			return {
				value1: '',
				userInfo: {},
				avatar: '',
				form:{},
			};
		},
		onShow() {
			this.today = this.getTodayDate()
		},
		mounted() {},

		methods: {
			loadData() {
				this.userInfo = this.$queue.getData('UserInfo')
				this.avatar = 'http://localhost:8080' + this.userInfo.avatar
				console.log(this.avatar)
				console.log(this.userInfo)
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
			submit() {
				uni.showModal({
					title:'提示',
					content:'请确认是否提交记录?',
					success: (res) => {
						if (res.confirm){
							console.log("用户点击确认提交")
							this.form.userId = this.userInfo.userId
							var that = this
							this.$queue.showLoading("正在修改...")
							console.log(this.form)
							this.$Request.post("/system/medicalRecord",
								this.form
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
						else if(res.cancel)
						{
							console.log("用户点击的取消")
						}
					},
				})
				

			},
			getUserInfo() {
				this.$Request.get('/getInfo').then(f => {
					console.log(f)
					if (f.code == 200) {
						console.log(f)
						let userInfo = f.userInfo
						userInfo.userId = f.user.userId
						userInfo.userName = f.user.userName
						console.log(userInfo)
						this.$queue.setData("UserInfo", userInfo)

					}

				})
			},
			getTodayDate(){
				let date = new Date()
				var today = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
				return today
			},
		}
	}
</script>

<style>
	.btn-logout {
		margin-top: 100upx;
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
