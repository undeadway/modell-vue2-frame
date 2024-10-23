let zIndex = 1000;
let layerCount = 0;

export default {
    data () {
        return {
            zIndex: zIndex + layerCount
        }
        
    },
    created () {
        layerCount += 10;
    },
    destroyed () {
        layerCount -= 10;
    },
    methods: {
        getLayer () {
            return zIndex + layerCount + 2;
        }
    }
}