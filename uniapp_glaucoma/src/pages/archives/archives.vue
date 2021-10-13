<template>
	<view>
		<view class="person-head">
			<cmd-avatar src="http://pic4.zhimg.com/50/v2-3d259dde90d4f5dd09fb8b2a8589df1f_hd.jpg" size="lg"
				:make="{'background-color': '#fff'}"></cmd-avatar>
			<view class="person-head-box">
				<view class="person-head-nickname">{{userInfo.nickName}}</view>
				<view class="person-head-username">ID：{{userInfo.userName}}</view>
			</view>
		</view>
		<view class="person-list">
			<cmd-cell-item title="药物依从性" :addon="userInfo.compliance?userInfo.compliance:''" slot-left arrow>
				<cmd-icon type="tag" size="24" color="#368dff"></cmd-icon>
			</cmd-cell-item>
			<cmd-cell-item title="感知压力" :addon="userInfo.stress?userInfo.stress:''" slot-left arrow>
				<cmd-icon type="tag" size="24" color="#368dff"></cmd-icon>
			</cmd-cell-item>


		</view>
	</view>
</template>

<script>
	import cmdAvatar from "@/components/cmd-avatar/cmd-avatar.vue"
	import cmdIcon from "@/components/cmd-icon/cmd-icon.vue"
	import cmdCellItem from "@/components/cmd-cell-item/cmd-cell-item.vue"

	export default {
		components: {
			cmdAvatar,
			cmdCellItem,
			cmdIcon
		},
		onLoad() {
			this.loadData()
		},
		onShow() {
			this.getUserInfo()
		},
		data() {
			return {
				userInfo: {},
				avatar: ''
			};
		},
		methods: {
			loadData() {	
				this.userInfo = {}
				this.userInfo = this.$queue.getData('UserInfo')
				if (this.userInfo.avatar) {
					this.avatar = 'http://localhost:8080' + this.userInfo.avatar
				}

			},
			getUserInfo() {
				this.$Request.get('/getInfo').then(f => {
					if (f.code == 200) {
						let userInfo = {}
						userInfo.userId = f.user.userId
						userInfo.userName = f.user.userName
						this.$Request.get("/system/record/getInfoById/" + userInfo.userId).then(res => {
							if (res.code == 200) {
								if (res.data.length != 0) {
									console.log(res)
									userInfo.pressureLeft = res.data[res.data.length - 1].pressureLeft
									userInfo.pressureRight = res.data[res.data.length - 1].pressureRight
								} else {
									userInfo.pressureLeft = ''
									userInfo.pressureRight = ''
								}
								this.$queue.setData("UserInfo", userInfo)
								this.loadData()
							}

						})
					}
				})
			},
			/**
			 * 打开用户信息页
			 */
			fnInfoWin() {
				uni.navigateTo({
					url: '/pages/me/info/info'
				})
			}
		}
	}
</script>

<style>
	.person-head {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 150px;
		padding-left: 20px;
		background: linear-gradient(to right, #007AFF, #365fff);
	}

	.person-head-box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		margin-left: 10px;
	}

	.person-head-nickname {
		font-size: 18px;
		font-weight: 500;
		color: #fff;
	}

	.person-head-username {
		font-size: 14px;
		font-weight: 500;
		color: #fff;
	}

	.person-list {
		line-height: 0;
	}
</style>
