export default {
    methods: {
        async formItemValidte  () {
            const mv2FormItem = this.mv2FormItem;
            if (this.mv2FormItem) {
                mv2FormItem.setValue(v1);
                const rule = mv2FormItem.getRule();
                if (rule) {
                    if (rule.trigger === "blur") {
                        await mv2FormItem.validate();
                    }
                }
            }
        }
    }
}