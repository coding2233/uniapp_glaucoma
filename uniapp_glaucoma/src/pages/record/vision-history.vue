<template>
	<view>
		<u-table>
				<u-tr>
					<u-th>时间</u-th>
					<u-th>左眼</u-th>
					<u-th>右眼</u-th>
					<u-th>裸眼/矫正</u-th>
				</u-tr>
				<view v-for="item in history">
					<u-tr>
						<u-td>{{item.recordTime}}</u-td>
						<u-td>{{item.visionLeft}}</u-td>
						<u-td>{{item.visionRight}}</u-td>
						<u-td>{{getVisionType(item.visionType)}}</u-td>
					</u-tr>
				</view>
			</u-table>
	</view>
</template>

<script>
	export default {
		props:["history"],
		data() {
			return {
			}
		},
		onShow() {
		},

		methods: {
			getVisionType(visionType){
				if(visionType){
				} else{
					visionType='裸眼'
				}
				return visionType
			},
		},
	}
</script>

<style>

</style>
