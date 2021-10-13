<template>
	<view>
		<cmd-page-body type="top" style="margin-top: -10%;">
			<cmd-transition name="fade-up">
				<view>
					<cmd-cel-item title="姓名" slot-right arrow>
						<input disabled="true" style="text-align: right;
text-align: end;" v-model="userInfo.nickName" />
					</cmd-cel-item>
					<cmd-cell-item title="药品" slot-right arrow>
						<input style="text-align: right;
					text-align: end;" v-model="form.drugs" placeholder="请输入药品名称" />
					</cmd-cell-item>
					<cmd-cell-item title="开始使用时间" slot-right arrow>
						<input @click="handleTap('picker1')" disabled="true" style="text-align: right;
text-align: end;" v-model="form.drugsStartTime" placeholder="请输入开始使用时间" />
						<lb-picker ref="picker1" :default-time-limit="50" v-model="form.drugsStartTime" mode="dateSelector"
							@change="handleChange" @confirm="handleConfirm" @cancel="handleCancel">
						</lb-picker>
					</cmd-cell-item>
					<cmd-cell-item title="结束使用时间" slot-right arrow>
						<input @click="handleTap('picker2')" disabled="true" style="text-align: right;
					text-align: end;" v-model="form.drugsEndTime" placeholder="请输入结束使用时间" />
						<lb-picker ref="picker2" :default-time-limit="50" v-model="form.drugsEndTime" mode="dateSelector"
							@change="handleChange" @confirm="handleConfirm" @cancel="handleCancel">
						</lb-picker>
					</cmd-cell-item>
					<cmd-cell-item title="使用方式" slot-right arrow>
						<input style="text-align: right;
										text-align: end;" v-model="form.drugsMode" placeholder="例如:早8点,晚8点" />
					</cmd-cell-item>
					<button class="btn-logout" @click="submit()">提交</button>
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
				form: {},
			};
		},

		mounted() {},

		methods: {
			loadData() {
				this.userInfo = this.$queue.getData('UserInfo')
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
				this.form.userId = this.userInfo.userId
				this.form.remindType = 1
				var that = this
				this.$queue.showLoading("正在修改...")
				console.log(this.form)
				this.$Request.post("/system/remind",
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
