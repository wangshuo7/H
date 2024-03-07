<template>
  <session>
    <HModel>
      <template #head>
        <div class="head">
          <span>导出excel</span>
          <span style="display: flex; align-items: center">
            <span style="margin-right: 10px">文件名: </span
            ><span
              ><el-input
                placeholder="请输入文件名，默认为当天日期"
                v-model.trim="file_name"
                type="text"
                clearable
                style="margin-right: 20px"
              ></el-input
            ></span>
            <el-button type="primary" @click="exportTable"
              >导出</el-button
            ></span
          >
        </div>
      </template>
      <template #body>
        <div style="margin-bottom: 10px">
          <el-button @click="addDate" type="primary">添加数据</el-button>
          <el-button @click="delDate" type="danger">删除数据</el-button>
        </div>
        <el-table
          :data="tableData"
          style="width: 100%"
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="日期" width="180">
            <template #default="{ row }">
              {{ formatTime(row.date) }}
            </template>
          </el-table-column>
          <el-table-column label="姓名" width="180">
            <template #default="{ row }">
              {{ row.name }}
            </template>
          </el-table-column>
          <el-table-column label="地址">
            <template #default="{ row }">
              {{ row.address }}
            </template>
          </el-table-column>
        </el-table>
      </template>
    </HModel>
  </session>
</template>

<script lang="ts">
export default {
  name: 'Excel'
}
</script>
<script lang="ts" setup>
import { ref } from 'vue'
import HModel from '../../components/HModel/index.vue'
import moment from 'moment'
import { exportExcel } from '../../utils/xlsx'
const file_name = ref<string>()
const number = ref<number>(193)
const tableData = ref<any>([
  {
    date: 1704816000000,
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: 1704902400000,
    name: 'Tom',
    address: 'No. 190, Grove St, Los Angeles'
  },
  {
    date: 1704988800000,
    name: 'Tom',
    address: 'No. 191, Grove St, Los Angeles'
  },
  {
    date: 1705075200000,
    name: 'Tom',
    address: 'No. 192, Grove St, Los Angeles'
  }
])

function exportTable() {
  const columns = [
    {
      title: '日期',
      dataIndex: 'date',
      width: 15,
      transform: (value: any) => formatTime(value)
    },
    { title: '姓名', dataIndex: 'name' },
    { title: '地址', dataIndex: 'address', width: 40 }
  ]

  const dataSheet = {
    data: multipleSelection.value.length
      ? multipleSelection.value
      : tableData.value, // 不选时全部导出
    columns: columns,
    sheetName: 'Sheet1'
  }
  exportExcel(
    [dataSheet],
    file_name.value ? file_name.value : moment().format('YYYY-MM-DD')
  )
}
function addDate() {
  tableData.value.push({
    date: moment().valueOf(),
    name: 'John',
    address: `No. ${number.value++}, Grove St, Los Angeles`
  })
}
function delDate() {
  tableData.value.pop()
}

// 多选
const multipleSelection = ref<any>([])
function handleSelectionChange(val: any) {
  multipleSelection.value = val
  console.log(multipleSelection.value)
}
function formatTime(time: any) {
  return moment(time).format('YYYY-MM-DD')
}
</script>

<style lang="less" scoped>
.head {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
.el-input {
  width: 250px;
}
</style>
