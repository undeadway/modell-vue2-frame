<template>
    <div :style="style" class="mv2-dialog-foot-box">
        <mv2-button ref="cancelBtn" class="cancel-btn" @click="cancelEvent">{{ cancelText }}</mv2-button>
        <mv2-button ref="okBtn" class="ok-btn" @click="okEvent">{{ okText }}</mv2-button>
    </div>
</template>
<script>
import Mv2Button from "./../../lib/button";

export default {
    name: "Mv2OkCancelButtons",
    components: {
        Mv2Button
    },
    props: {
        cancelText: {
            type: String,
            default: "放弃"
        },
        okText: {
            type: String,
            default: "确定"
        },
        okEvent: {
            type: Function,
            default: null
        },
        cancelEvent: {
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
.ok-btn, .cancel-btn {
    max-width: 30%;
    min-width: 50px;
    margin: auto 5px;
}

.cancel-btn {
    color: #003D74 !important;
    background: #CCCCCC !important;
    border: 1px solid #666666 !important;
}
</style>