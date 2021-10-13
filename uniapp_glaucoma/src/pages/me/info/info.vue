<template>
	<view>
		<cmd-page-body type="top" style="margin-top: -10%;">
			<cmd-transition name="fade-up">
				<view>
					<cmd-cel-item title="头像" slot-right arrow>
						<cmd-avatar src="http://pic4.zhimg.com/50/v2-3d259dde90d4f5dd09fb8b2a8589df1f_hd.jpg">
						</cmd-avatar>
					</cmd-cel-item>
					<cmd-cel-item title="姓名" slot-right arrow>
						<input style="text-align: right;
text-align: end;" v-model="userInfo.nickName" />
					</cmd-cel-item>
					<cmd-cell-item title="出生日期" slot-right arrow>
						<input @click="handleTap('picker1')" disabled="true" style="text-align: right;
text-align: end;" v-model="userInfo.birthday" />
						<lb-picker ref="picker1" :default-time-limit="50" v-model="userInfo.birthday"
							mode="dateSelector" @change="handleChange" @confirm="handleConfirm" @cancel="handleCancel">
						</lb-picker>
					</cmd-cell-item>
					<cmd-cell-item title="确诊日期" slot-right arrow>
						<input @click="handleTap('picker2')" disabled="true" style="text-align: right;
					text-align: end;" v-model="userInfo.diagnosis" />
						<lb-picker ref="picker2" :default-time-limit="50" v-model="userInfo.diagnosis"
							mode="dateSelector" @change="handleChange" @confirm="handleConfirm" @cancel="handleCancel">
						</lb-picker>
					</cmd-cell-item>
					<cmd-cell-item title="性别" slot-right arrow>
						<input style="text-align: right;
text-align: end;" v-model="userInfo.sex" />
					</cmd-cell-item>
					<cmd-cell-item title="家族史" slot-right arrow>
						<input style="text-align: right;
text-align: end;" v-model="userInfo.history" />
					</cmd-cell-item>
					<button class="btn-logout" @click="submit()">保存设置</button>
					<button class="btn-logout" style="margin-top: 5%;" @click="logout">退出登录</button>
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
			LbPicker
		},
		onLoad() {
			this.loadData()
		},

		data() {
			return {
				value1: '',
				userInfo: {},
				avatar: '',
			};
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
				var that = this
				this.$queue.showLoading("正在修改...")

				this.$Request.put("/system/info",
					this.userInfo
				).then(res => {
					console.log(this.userInfo,res)
					uni.hideLoading()
					if (res.code == 200) {
						this.$queue.setData("UserInfo", this.userInfo)
						this.getUserInfo()
						uni.reLaunch({
							url: '../me'
						})
					} else {
						this.$queue.showToast(res.msg)

					}
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
			logout() {
				let that = this
				uni.showModal({
					title: '提示',
					content: '是否退出登录',
					success: function(res) {
						if (res.confirm) {
							that.$queue.logout()
							uni.reLaunch({
								url: '../../login/login'
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
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
