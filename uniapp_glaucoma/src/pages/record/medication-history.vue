<template>
	<view>
		<scroll-view scroll-x='true' show-scrollbar='true' class="container">
			<u-table>
					<u-tr>
						<u-th >用药时间</u-th>
						<u-th>药品名</u-th>
						<u-th>频次</u-th>
						<u-th>不良反应</u-th>
						<u-th>停药时间</u-th>
						<u-th>备注</u-th>
					</u-tr>
					<view v-for="item in history">
						<u-tr>
							<u-td>{{item.recordTime}}</u-td>
							<u-td>{{getMedication(item.medication)}}</u-td>
							<u-td>{{getFrequency(item.medicationMoment)}}</u-td>
							<u-td>{{getMedicationAdr(item.medicationAdr)}}</u-td>
							<u-td>{{getMedicationSuspend(item.medicationSuspend)}}</u-td>
							<u-td>{{getMedicationRemark(item.medicationRemark)}}</u-td>
						</u-tr>
					</view>
				</u-table>
		</scroll-view>
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
			getMedication(medication){
				if(medication){}else{
					medication="-"
				}
				return medication;
			},
			getFrequency(medicationMoment){
				let frequency=0
				if(medicationMoment){
					let args = medicationMoment.split(';')
					frequency=args.length
				}
				return frequency
			},
			getMedicationAdr(medicationAdr){
				if(medicationAdr){}else{
					medicationAdr="-"
				}
				return medicationAdr;
			},
			getMedicationSuspend(medicationSuspend){
				if(medicationSuspend){}else{
					medicationSuspend='-'
				}
				return medicationSuspend
			},
			getMedicationRemark(medicationRemark){
				if(medicationRemark){}else{
					medicationRemark="-"
				}
				return medicationRemark;
			},
		}
	}
</script>

<style>
	.container{
		/* width: 1200rpx; */
		white-space: nowrap;
	}
</style>
