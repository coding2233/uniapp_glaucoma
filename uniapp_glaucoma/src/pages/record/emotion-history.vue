<template>
	<view>
		<u-table>
				<u-tr>
					<u-th>日期</u-th>
					<u-th>情绪类型</u-th>
				</u-tr>
				<view v-for="item in history">
					<u-tr>
						<u-td>{{item.recordTime}}</u-td>
						<u-td>{{getEmotion(item.emotion)}}</u-td>
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
				name: 'emotion-history',
			}
		},
		onShow() {
		},
		methods: {
			getEmotion(emotion){
				if(emotion){}else{
					emotion="-";
				}
				return emotion;
			}
		}
	}
</script>

<style>

</style>
