# mendix 前端组件开发模板库

## 使用指南

-   克隆代码（注意摘取子模块）

```cmd
git clone --recurse-submodules https://gitee.com/engalar/mendix-pluggable-widget-template.git
git submodule update // 如果你不是通过上面这边命令克隆，并且子模块`src/piw-utils-internal`目录为空，则执行本条语句
```

-   用`Vscode`打开

```cmd
code mendix-pluggable-widget-template
```

-   全局安装一些必须要的 npm 包（一台机器只须执行一次，之后无需再次执行）

```cmd
npm run m
```

-   安装项目本地依赖 npm 包

```cmd
npm run x
```

-   初始化测试项目（用来测试本前端组件的 mendix 应用项目）

```cmd
npm run testProject
```

-   修改 package.json 文件的`name`和`widgetName`字段，然后再执行

```cmd
npm run r
npm run u
```

# 测试项目的版本管理

## 备份
```cmd
npm run backupTestProject
```

## 还原

```cmd
npm run restoreTestProject
```