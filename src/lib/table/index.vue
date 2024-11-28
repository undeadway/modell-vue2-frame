<template>
	<div class="mv2-table">
		<table>
			<thead v-if="showHead">
				<tr>
					<th v-for="(column, index) in _columns" :key="index" :style="column.style + headStyle">
						{{ column.text }}
					</th>
				</tr>
			</thead>
			<tbody class="mv2-table-body" :style="'overflow:auto;' + (height ? `height: ${height}px;` : '')">
				<tr v-for="(row, index) in _data" :key="index">
					<td v-for="(column, ji) in _columns" :key="ji" :style="column.style + style">
						<span :id="`${column.name}_${index}`" v-html="getVal(row, column)"></span>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
import { initStyles } from "./../../utils/utils";

export default {
	name: "Mv2Table",
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
		height: undefined,
		showHead: {
			type: Boolean,
			default: true
		}
	},
	data () {
		return {
			_columns: [],
			_data: [],
			headStyle: "",
			style: ""
		}
	},
	watch: {
		"data": function(v1, v2) {
			this._data = v1;
			this.init();
		}
	},
	created () {
		console.log("table");
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
				paddingSize += parseInt(column.style.width);
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
			if (column.style) {
				column.style = initStyles(column.style);
			} else {
				column.style = calced;
			}
		}

		this.init();
	},
	methods: {
		init () {
			this.updateStyle();
			this.$nextTick(() => {
				this.bindEvent();
			});
		},
		bindEvent () {
			for (let i = 0, len = this._data.length; i < len; i++) {
				const data = this._data[i];
				for (const column of this._columns) {
					const node = document.getElementById(`${column.name}_${i}`);
					if (column.event) {
						for (const event of column.event) {
							node[`on${event.name}`] = () => {
								event.method.call(this.$parent, data);
							}
						}
					}
				}
			}
		},
		updateStyle () {
			this.headStyle = initStyles(this.headStyles);
			this.style = initStyles(this.styles);

			this.$forceUpdate();
		},
		getVal (row, column) {
			let html = null;
			if (column.format) {
				html = column.format(row);
			} else {
				html = row[column.name];
			}

			return html;
		}
	}
}
</script>
<style lang="scss" scoped>
.mv2-table {
	overflow: hidden;
	width: 100%;
	table {
		width: 100%;
		border-spacing: 0;
		border-collapse: 0;
		tbody {
			display: block;
			overflow-y: auto;
			-webkit-overflow-scrolling: touch;
		}
		thead tr, tbody tr, tfoot tr {
			box-sizing: border-box;
			table-layout: fixed;
			vertical-align: middle;
			display: table;
			width: 100%;
		}
	}
}
.mv2-table-body {
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
