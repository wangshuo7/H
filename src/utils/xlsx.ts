/**
 * 使用：
 * 1. 使用模块 import { exportExcel } from '../../utils/xlsx'
 * 2. 支持两个参数, 第一个参数为表格数据(支持多个工作簿), 第二个参数为表格名称
 * 3. 表格数据为对象, 其内容为: data(表格数据), columns(替换表头), sheetName(工作簿名称)
 * 4. 示例：
 *  const columns = [
      { title: '日期', dataIndex: 'date', width:20, transform: (value: number) => Moment(value).format('YYYY-MM-DD HH:mm:ss') },
      { title: '姓名', dataIndex: 'name' },
      { title: '地址', dataIndex: 'address' }
    ]
    const dataSheet = {
      data: tableData.value,
      columns: columns,
      sheetName: 'Sheet1'
    }
    exportExcel([dataSheet], 'hahah')
 */
import * as XLSX from 'xlsx'

interface ColumnDefinition {
  title: string
  dataIndex: string
  width?: number
  transform?: (value: any) => any
}

interface SheetData {
  data: any[] // 要导出的实际数据
  columns: ColumnDefinition[] // 要导出的表头
  sheetName: string // 要导出的工作簿名称
}

/**
 * 导出表格
 * @param {SheetData} sheetData 表格数据
 * @param {string} sheetName 工作簿名称
 */
export const exportExcel = (
  sheets: SheetData[],
  fileName: string = 'exported_data'
): void => {
  // 创建一个工作簿
  const workbook: XLSX.WorkBook = XLSX.utils.book_new()
  sheets.forEach((sheet) => {
    const transformedData = sheet.data.map((row) => {
      const newRow: { [key: string]: any } = {}
      sheet.columns.forEach((column) => {
        if (column.transform && typeof row[column.dataIndex] !== 'undefined') {
          // 如果存在 transform 函数，且字段值不为 undefined，则使用 transform 函数转换
          newRow[column.title] = column.transform(row[column.dataIndex])
        } else {
          newRow[column.title] = row[column.dataIndex]
        }
      })
      return newRow
    })

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      transformedData,
      {
        header: sheet.columns.map((column) => column.title)
      }
    )
    // 设置列宽度
    sheet.columns.forEach((column, index) => {
      const width = column.width || 10 // 默认宽度为 10
      XLSX.utils.encode_col(index)
      worksheet['!cols'] = worksheet['!cols'] || []
      worksheet['!cols'].push({ wch: width })
    })

    XLSX.utils.book_append_sheet(workbook, worksheet, sheet.sheetName)
  })

  XLSX.writeFile(workbook, `${fileName}.xlsx`)
}
