export default {
	inject: [ "mv2Form", "mv2FormItem" ],
    computed: {
        hasForm () {
            return !!this.mv2Form;
        },
        hasFormItem () {
            return !!this.mv2FormItem;
        }
    },
    created () {
        this.formItemSetField();
    },
    methods: {
        async formItemValidte  () {
            const mv2FormItem = this.mv2FormItem;
            if (this.hasFormItem) {
                const rule = mv2FormItem.getRule();
                if (rule) {
                    if (rule.trigger === "blur") {
                        await mv2FormItem.validate();
                    }
                }
            }
        },
        formItemsetValue (value) {
            if (this.hasFormItem) {
                this.mv2FormItem.setValue(value);
            }
        },
        formItemSetField () {
            if (this.hasFormItem) {
                this.mv2FormItem.setField(this);
            }
        }
    }
}
