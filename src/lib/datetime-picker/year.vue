<template>
	<div>
		<div v-for="index in 9" :key="index" @click="onSelect(index)">{{ monthList[index - 1] }}</div>
	</div>
</template>
<script>
export default {
	
}
</script>
