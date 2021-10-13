<template>
	<view>
		<view class="person-head">
			<cmd-avatar
				src="http://pic4.zhimg.com/50/v2-3d259dde90d4f5dd09fb8b2a8589df1f_hd.jpg"
				size="lg" :make="{'background-color': '#fff'}"></cmd-avatar>
			<view class="person-head-box">
				<view class="person-head-nickname">{{userInfo.nickName}}</view>
				<view class="person-head-username">ID：{{userInfo.userName}}</view>
			</view>
		</view>
		<view class="person-list">
			<cmd-cell-item title="出生日期" :addon="userInfo.birthday?userInfo.birthday:''" slot-left arrow>
				<cmd-icon type="money" size="24" color="#368dff"></cmd-icon>
			</cmd-cell-item>
			<cmd-cell-item title="性别" :addon="userInfo.sex?userInfo.sex:''" slot-left arrow>
				<cmd-icon type="user" size="24" color="#368dff"></cmd-icon>
			</cmd-cell-item>
		<!-- 	<cmd-cell-item title="我的诊断" slot-left arrow>
				<cmd-icon type="image" size="24" color="#368dff"></cmd-icon>
			</cmd-cell-item> -->
			<cmd-cell-item title="确诊日期"  :addon="userInfo.diagnosis?userInfo.diagnosis:''" slot-left arrow>
				<cmd-icon type="message" size="24" color="#368dff"></cmd-icon>
			</cmd-cell-item>
			<cmd-cell-item title="我的视力(显示当前视力)" :addon="userInfo.visionLeft?('左眼:'+ userInfo.visionLeft +'右眼'+userInfo.visionRight):''" slot-left
				arrow>
				<cmd-icon type="eye" size="24" color="#368dff"></cmd-icon>
			</cmd-cell-item>
			<cmd-cell-item title="我的眼压(显示当前眼压)" :addon="userInfo.pressureLeft?('左眼:'+ userInfo.pressureLeft+'右眼'+userInfo.pressureRight):''"
				slot-left arrow>
				<cmd-icon type="tag" size="24" color="#368dff"></cmd-icon>
			</cmd-cell-item>
			<cmd-cell-item title="家族史" :addon="userInfo.history" slot-left arrow>
				<cmd-icon type="alert-circle" size="24" color="#368dff"></cmd-icon>
			</cmd-cell-item>
			<cmd-cell-item @click="toArchives()" title="我的青光眼档案" slot-left arrow>
				<cmd-icon type="clock" size="24" color="#368dff"></cmd-icon>
			</cmd-cell-item>
			<cmd-cell-item @click="fnInfoWin" title="个人设置" slot-left arrow>
				<cmd-icon type="settings" size="24" color="#368dff"></cmd-icon>
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
				this.userInfo = {
				}
				this.userInfo = this.$queue.getData('UserInfo')
				if (this.userInfo.avatar) {
					this.avatar = 'http://localhost:8080' + this.userInfo.avatar
				}

			},
			getUserInfo() {
				this.$Request.get('/getInfo').then(f => {
					if (f.code == 200) {
						// let userInfo = f.userInfo
						let userInfo={}
						userInfo.userId = f.user.userId
						userInfo.userName = f.user.userName
						this.$Request.get("/system/record/getInfoById/" + userInfo.userId).then(res => {
							if (res.code == 200) {
								if (res.data.length!=0) {
									console.log(res)
									userInfo.pressureLeft = res.data[res.data.length - 1].pressureLeft
									userInfo.pressureRight = res.data[res.data.length - 1].pressureRight
								}else{
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
			toArchives(){
				uni.navigateTo({
					url:'../archives/archives'
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
