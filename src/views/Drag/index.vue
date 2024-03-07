<template>
  <session>
    <el-button @click="onShowDialog">对话框拖拽</el-button>
    <el-divider></el-divider>
    <el-dialog
      :draggable="true"
      v-model="dialogVisible"
      title="拖拽"
      width="30%"
    >
      <span>可对其拖拽</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </session>
  <session>
    <div class="drag-list">
      <div class="item">
        <h3>操作</h3>
        <span>是否禁用：</span>
        <el-switch label="禁用拖拽" v-model="disableDrag" />
        <div style="margin-top: 20px">
          <el-button @click="addData">添加数据</el-button>
          <el-button @click="replaceData">重置数据</el-button>
        </div>
      </div>
      <div class="item">
        <h3>Draggable</h3>
        <draggable
          :disabled="disableDrag"
          class="list-box"
          v-model="list"
          :options="{ animation: 200 }"
        >
          <template #item="{ element }">
            <div class="list">{{ element.name }}</div>
          </template>
        </draggable>
      </div>
      <div class="item">
        <h3>List</h3>
        <div style="margin: 33px 0" v-for="item in list" :key="item.id">
          {{ item }}
        </div>
      </div>
    </div>
  </session>
</template>

<script lang="ts">
export default {
  name: 'Drag'
}
</script>
<script lang="ts" setup>
import { ref } from 'vue'
import draggable from 'vuedraggable'
const dialogVisible = ref<boolean>(false)
const disableDrag = ref<boolean>(false)
function onShowDialog() {
  dialogVisible.value = true
}

const list = ref([
  { name: 'Tom1', id: 1 },
  { name: 'John2', id: 2 },
  { name: 'Jerry3', id: 3 },
  { name: 'Clark4', id: 4 }
])
const listId = ref<number>(5)
function addData() {
  const dataIndex = listId.value++
  list.value.push({ name: `test${dataIndex}`, id: dataIndex })
}
function replaceData() {
  list.value = [
    { name: 'Tom1', id: 1 },
    { name: 'John2', id: 2 },
    { name: 'Jerry3', id: 3 },
    { name: 'Clark4', id: 4 }
  ]
  listId.value = 5
}
</script>

<style lang="less" scoped>
.list-box {
  display: flex;
  flex-direction: column;
  .list {
    width: 200px;
    height: 50px;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.drag-list {
  width: 100%;
  display: flex;
  // align-items: center;
  // justify-content: space-between;
  .item {
    width: 280px;
    margin-right: 10px;
    border: 1px solid #ccc;
    padding: 35px;
    h3 {
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>
