# ESC/POS 打印小助手

轻松通过浏览器连接ESC/POS打印机，需要搭配[后端程序](https://github.com/ymnns/escpos-helper-backend)使用

## 为什么需要后端程序？

要想向打印机中写入数据，就需要建立TCP Socket连接，而浏览器并没有这种API。

## 功能

当前版本支持以下的功能，未被勾选的功能将在后续版本实现

- [x] 打印文本（包括汉字）
- [x] 调整字符大小和对齐方式
- [x] 连接打印机（暂时只支持以太网）
- [x] 查阅历史记录
- [x] 通过链接快速设置
- [x] 测试设置有效性
- [x] 将设置导出为**印有二维码的纸条**:sparkles:
- [ ] 调整文本列表的顺序
- [ ] 标签模板
- [ ] 支持USB、串口和并口
- [ ] 打印二维码和图片

## 前端技术栈

+ React
+ React Router
+ Redux
+ Axios
+ Ant Design Mobile

## 快速入门

### 安装

```shell
$ npm install
```

### 编译

```shell
$ npm run build
```

### 运行

```shell
$ serve build
```

### 部署后端

请参阅[后端程序](https://github.com/ymnns/escpos-helper-backend)

### 注意事项

设置中的`服务器URL`需以`http`开头，`打印机URL`应设置为服务器可访问的地址。

> 一般情况下，通过以太网连接的ESC/POS打印机开启9100端口。
