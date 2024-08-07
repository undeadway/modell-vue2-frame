<template>
	<div class="mdl-table">
		<table>
			<thead>
				<tr>
					<td v-for="(column, index) in _columns" :key="index"
						:style="column.style + headStyleStr"
						>
						{{ column.text }}
					</td>
				</tr>
			</thead>
			<tbody class="mdl-table-body" :style="'overflow:auto;' + (height ? `height: ${height}px;` : '')">
				<tr v-for="(row, index) in _data" :key="index">
					<td v-for="(column, ji) in _columns" :key="ji"
						:style="column.style + styleStr"
					>
						<span :id="`${column.name}_${index}`" v-html="getVal(row, column)"></span>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
export default {
	props: {
		columns: {
			type: Array,
			default: []
		},
		data: {
			type: Array,
			default: []
		},
		headStyles: {
			type: Object,
			default: {}
		},
		styles: {
			type: Object,
			default: {}
		},
		height: undefined
	},
	data () {
		return {
			_columns: [],
			_data: [],
			headStyleStr: "",
			styleStr: ""
		}
	},
	watch: {
		"data": function(v1, v2) {
			this._data = v1;

			this.updateStyle();
			this.$nextTick(() => {
				this.bindEvent();
			});
		}
	},
	created () {
		const newCols = [];
		for (const column of this.columns) {
			const newCol = JSON.parse(JSON.stringify(column));
			newCol.format = column.format;
			newCol.event = column.event;
			newCols.push(newCol);
		}
		this._columns = newCols;
		this._data = JSON.parse(JSON.stringify(this.data));

		let paddingSize = 0;
		let paddingUnit = "";
		let count = 0;
		let calced = null;

		for (const column of this._columns) {
			if (column.style && column.style.width) {
				paddingSize += column.style.width;
			} else {
				count++;
			}
		}

		if (this.headStyles.padding) {
			const matched = this.headStyles.padding.match(/^(\d+)(\S+)$/);
			paddingSize += Number(matched[1]) * 2 * this.columns.length;
			paddingUnit = matched[2] || "";
			calced = `width: calc((100% - ${paddingSize}${paddingUnit}) / ${count})`; 
		} else {
			calced = "width: 100%";
		}

		for (const column of this._columns) {
			const style = [];
			if (column.style) {
				for (let key in column.style) {
					let value = column.style[key];
					switch (key) {
					case "align":
						key = "text-align";
						break;
					case "width":
						value += "px";
						break;
				}
					style.push(`${key}: ${value}`);
				}
				if (!column.style.width) {
					style.push(calced);
				}
			} else {
				style.push(calced);
			}
			column.style = style.join(";") + ";";
		}

		this.updateStyle();
	},
	methods: {
		bindEvent () {
			for (let i = 0, len = this._data.length; i < len; i++) {
			const data = this._data[i];
			for (const column of this._columns) {
				const node = document.getElementById(`${column.name}_${i}`);
				if (column.event) {
					for (const event of column.event) {
						node[`on${event.name}`] = () => {
							event.method(this.$parent, data);
						}
					}
				}
			}
		}
		},
		updateStyle () {
			const headStyle = [];
			for (const key in this.headStyles) {
				let name = key;
				let value = this.headStyles[key];
				switch (key) {
					case "align":
						name = "text-align";
						break;
				}
				headStyle.push(`${name}: ${value}`);
			}
			this.headStyleStr = headStyle.join(";") + ";";

			const style = [];
			for (const key in this.styles) {
				let name = key;
				let value = this.styles[key];
				switch (key) {
					case "align":
						name = "text-align";
						break;
				}
				style.push(`${name}: ${value}`);
			}
			this.styleStr = style.join(";") + ";";

			this.$forceUpdate();
		},
		getVal (row, column) {
			let html = null;
			if (column.format) {
				html = column.format(row);
			} else {
				html = row[column.class];
			}

			return html;
		}
	}
}
</script>
<style lang="scss" scoped>
.mdl-table {
	overflow: hidden;
	width: 100%;

	table {
		width: 100%;
		border-spacing: 0;
		border-collapse: 0;
	}

	table tbody {
		display: block;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
	}

	table thead tr, table tbody tr, table tfoot tr {
		box-sizing: border-box;
		table-layout: fixed;
		vertical-align: middle;
		display: table;
		width: 100%;
	}
}

.mdl-table-body {
	tr:nth-child(even) {
		background: $c_list_even;
	}
	tr:nth-child(odd) {
		background: $c_list_odd;
	}
	tr:hover {
		background: $c_list_hover;
	}
}
</style>