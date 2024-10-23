<!-- 这里的两个按钮是平等关系，没有 确认、取消的区分 -->
<template>
    <div :style="style" class="mv2-dialog-foot-box">
        <mv2-button ref="leftBtn" class="left-btn" @click="lefeEvent">{{ leftText }}</mv2-button>
        <mv2-button ref="rightBtn" class="right-btn" @click="rightEvent">{{ rightText }}</mv2-button>
    </div>
</template>
<script>
import Mv2Button from "./../../lib/button";

export default {
    name: "Mv2TwoButtons",
    components: {
        Mv2Button
    },
    props: {
        leftText: {
            type: String,
            default: "左按钮"
        },
        rightText: {
            type: String,
            default: "右按钮"
        },
        leftEvent: {
            type: Function,
            default: null
        },
        rightEvent: {
            type: Function,
            default: null
        },
        style: {
            type: String,
            default: ""
        }
    }
}
</script>
<style lang="scss" scoped>
.left-btn, .right-btn {
    max-width: 30%;
    min-width: 50px;
    margin: auto 5px;
}
</style>