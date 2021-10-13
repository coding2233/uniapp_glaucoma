<template>
	<view>
		<u-table>
				<u-tr>
					<u-th>时间</u-th>
					<u-th>类型</u-th>
					<u-th>时长</u-th>
					<u-th>备注</u-th>
				</u-tr>
				<view v-for="item in history">
					<u-tr>
						<u-td>{{item.recordTime}}</u-td>
						<u-td>{{getMotion(item.motion)}}</u-td>
						<u-td>{{getDuration(item.motionDuration)}}</u-td>
						<u-td>{{getMark(item.motionRemark)}}</u-td>
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
			getMotion(motion){
				if(motion){}else{
					motion="-";
				}
				return motion;
			},
			getDuration(duration){
				if(duration && duration>0){}else{
					duration=0;
				}
				return duration;
			},
			getMark(mark){
				if(mark){}else{
					mark="-";
				}
				return mark;
			},
		}
	}
</script>

<style>

</style>
