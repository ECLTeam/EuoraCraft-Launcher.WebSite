// Vite 的 ?raw 后缀导入：将文件内容作为字符串引入，用于内嵌 markdown 源文本
declare module '*?raw' {
  const content: string
  export default content
}
