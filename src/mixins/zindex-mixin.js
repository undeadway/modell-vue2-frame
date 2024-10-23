let zIndex = 1000;
let layerCount = 0;

export default {
    data () {
        return {
            zIndex: 0
        }
        
    },
    created () {
        this.zIndex = zIndex + layerCount;
        layerCount += 10;
    },
    destroyed () {
        layerCount -= 10;
    },
    methods: {
        getLayer () {
            return this.zIndex + 2;
        }
    }
}